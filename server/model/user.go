// db/user.go

package model

import (
	"time"
)

type User struct {
	ID                    string `gorm:"type:uuid;primary_key"`
	Username              string
	Email                 string `gorm:"unique"`
	Password              string
	ProfilePicture        []byte
	IsAdmin               bool
	CreatedAt             time.Time
	UpdatedAt             time.Time
}

// UserFollower represents a follower of a user
type UserFollower struct {
    FollowerID     uint   `gorm:"column:follower_id"`
    FollowerName   string `gorm:"column:follower_name"`
    ProfilePicture []byte `gorm:"column:profile_picture"`
}

// UserProfile represents a user's profile
type UserProfile struct {
	ID       uint `gorm:"primary_key"`
	Age      int
	Location string
}
