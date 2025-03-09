package service

import (
	"testing"
	"server/repository"
	"server/model"
	
)

func TestRegisterUser(t *testing.T) {
    userRepo := repository.NewMockUserRepository()
    userService := service.NewUserService(userRepo)

    username := "testuser"
    email := "test@example.com"
    password := "testpassword"

    user, err := userService.RegisterUser(username, email, password)

    // Check if there's no error
    if err != nil {
        t.Errorf("Expected no error, got %v", err)
    }

    // Check if the user is not nil
    if user == nil {
        t.Error("Expected user, got nil")
    }

    // Additional assertions based on your logic
}
