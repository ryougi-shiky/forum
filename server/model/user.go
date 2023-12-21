// db/user.go

package model

import (
	"time"
)

type User struct {
	UserID             string `gorm:"type:uuid;primary_key"`
	Username       string
	Email          string `gorm:"unique"`
	Password       string
	ProfilePicture []byte `gorm:"column:profile_picture"`
	IsAdmin        bool
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

// UserFollower represents a follower of a user
type UserFollower struct {
	FollowerID     string `gorm:"type:uuid;column:follower_id"`
	FollowerName   string `gorm:"column:follower_name"`
	ProfilePicture []byte `gorm:"column:profile_picture"`
}

// UserProfile represents a user's profile
type UserProfile struct {
	UserID   string `gorm:"type:uuid;primary_key;column:user_id"`
	Age      int
	Location string
}
