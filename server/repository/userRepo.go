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

func (r *UserRepository) DeleteUser(userID uint) error {
    err := r.Db.Delete(&model.User{}, userID).Error
    if err != nil {
        return err
    }

    return nil
}


func (r *UserRepository) GetFollowers(userID uint) ([]*model.UserFollower, error) {
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


func (r *UserRepository) Follow(userID, followerID uint) error {
    // create a new follower record
    err := r.Db.Exec("INSERT INTO user_followers (user_id, follower_id) VALUES (?, ?)", userID, followerID).Error
    if err != nil {
        return err
    }

    return nil
}

func (r *UserRepository) Unfollow(userID, followerID uint) error {
    // delete the follower record
    err := r.Db.Exec("DELETE FROM user_followers WHERE user_id = ? AND follower_id = ?", userID, followerID).Error
    if err != nil {
        return err
    }

    return nil
}

func (r *UserRepository) UpdateProfilePicture(userID uint, profilePicture []byte) error {
    err := r.Db.Model(&model.User{}).Where("id = ?", userID).Update("profile_picture", profilePicture).Error
    if err != nil {
        return err
    }

    return nil
}

func (r *UserRepository) UpdateUserProfile(userProfile *model.UserProfile) error {
    // UserProfile contains user_id
    err := r.Db.Model(userProfile).Where("user_id = ?", userProfile.ID).Updates(userProfile).Error
    if err != nil {
        return err
    }

    return nil
}
