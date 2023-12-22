package model

import (
	"time"
)

type Post struct {
	PostID      string `gorm:"type:char(36);primary_key"`
	UID         string `gorm:"type:varchar(255)"`
	Username    string `gorm:"type:varchar(255)"`
	Description string `gorm:"type:text"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type PostLike struct {
	PostID string `gorm:"type:char(36);primary_key"`
	UserID string `gorm:"type:char(36);primary_key"`
}

type Comment struct {
	CommentID   string `gorm:"type:char(36);primary_key"`
	PostID      string `gorm:"type:char(36)"`
	UserID      string `gorm:"type:char(36)"`
	CommentText string `gorm:"type:text"`
	CreatedAt   time.Time
}
