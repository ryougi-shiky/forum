package repository

import (
	"context"
	"server/model"

	"gorm.io/gorm"
)

type PostRepository struct {
	Db *gorm.DB
}

func NewPostRepository(db *gorm.DB) *PostRepository {
	return &PostRepository{Db: db}
}

// Create a post
func (repo *PostRepository) CreatePost(post *model.Post) error {
	return repo.Db.Create(post).Error
}

// Update a post
func (repo *PostRepository) UpdatePost(postID string, updatedData map[string]interface{}) error {
	return repo.Db.Model(&model.Post{}).Where("post_id = ?", postID).Updates(updatedData).Error
}

// Delete a post
func (repo *PostRepository) DeletePost(postID string) error {
	return repo.Db.Delete(&model.Post{}, "post_id = ?", postID).Error
}

// Get a post
func (repo *PostRepository) GetPost(postID string) (*model.Post, error) {
	var post model.Post
	err := repo.Db.Where("post_id = ?", postID).First(&post).Error
	return &post, err
}

// Get a user's all posts
func (repo *PostRepository) GetUserPosts(userID string) ([]model.Post, error) {
	var posts []model.Post
	err := repo.Db.Where("uid = ?", userID).Find(&posts).Error
	return posts, err
}

// Like or dislike a post
func (repo *PostRepository) ToggleLike(postID, userID string) error {
	var like model.PostLike
	tx := repo.Db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	err := tx.Where("post_id = ? AND user_id = ?", postID, userID).First(&like).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// if not found, create a like
			like = model.PostLike{PostID: postID, UserID: userID}
			err = tx.Create(&like).Error
			if err != nil {
				tx.Rollback()
				return err
			}
		} else {
			tx.Rollback()
			return err
		}
	} else {
		// if found, delete the like
		err = tx.Delete(&like).Error
		if err != nil {
			tx.Logger.Error(context.Background(), "Error deleting like", err)
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

// create a comment
func (repo *PostRepository) AddComment(comment *model.Comment) error {
	return repo.Db.Create(comment).Error
}

// get a post's all comments
func (repo *PostRepository) GetPostComments(postID string) ([]model.Comment, error) {
	var comments []model.Comment
	err := repo.Db.Where("post_id = ?", postID).Find(&comments).Error
	return comments, err
}
