// repository/userRepository.go

package repository

import (
	"server/model"

	"gorm.io/gorm"
)

type UserRepository struct {
	Db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{Db: db}
}

func (r *UserRepository) FindByUsername(username string) (*model.User, error) {
	var user model.User
	if err := r.Db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	if err := r.Db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Create(user *model.User) error {
	return r.Db.Create(user).Error
}

func (r *UserRepository) DeleteUser(userID string) error {
	// Create an instance of the User model with the ID set to the userID
	userToDelete := model.User{ID: userID}

	// Use the entire userToDelete object in the Delete method
	err := r.Db.Delete(&userToDelete).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) GetFollowers(userID string) ([]*model.UserFollower, error) {
	var followers []*model.UserFollower

	err := r.Db.Table("user_followers").
		Select("user_followers.follower_id, users.username as follower_name, users.profile_picture").
		Joins("join users on users.id = user_followers.follower_id").
		Where("user_followers.user_id = ?", userID).
		Scan(&followers).
		Error

	if err != nil {
		return nil, err
	}

	return followers, nil
}

func (r *UserRepository) Follow(userID, followerID string) error {
	// create a new follower record
	err := r.Db.Exec("INSERT INTO user_followers (user_id, follower_id) VALUES (?, ?)", userID, followerID).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) Unfollow(userID, followerID string) error {
	// delete the follower record
	err := r.Db.Exec("DELETE FROM user_followers WHERE user_id = ? AND follower_id = ?", userID, followerID).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) UpdateProfilePicture(userID string, profilePicture []byte) error {
	// Begin a new transaction
	tx := r.Db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// Perform the update operation within the transaction
	if err := tx.Model(&model.User{}).Where("id = ?", userID).Update("profile_picture", profilePicture).Error; err != nil {
		tx.Rollback() // Rollback the transaction in case of an error
		return err
	}

	// Commit the transaction if everything is fine
	return tx.Commit().Error
}

func (r *UserRepository) UpdateUserProfile(userProfile *model.UserProfile) error {
	// Begin a transaction
	tx := r.Db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// Perform the update operation within the transaction
	if err := tx.Model(userProfile).Where("user_id = ?", userProfile.UserID).Updates(userProfile).Error; err != nil {
		tx.Rollback() // Rollback if there is an error
		return err
	}

	// Commit the transaction if everything is okay
	return tx.Commit().Error
}
