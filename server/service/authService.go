// service/authService.go

package service

import (
	"errors"
	"server/repository"
	"server/model"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(userRepo *repository.Userdb, username, email, password string) (*model.User, error) {
	existingUser, _ := userRepo.FindByEmail(email)
	if existingUser != nil {
		return nil, errors.New("email already in use")
	}

	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Username: username,
		Email:    email,
		Password: string(hashedPwd),
	}

	if err := userRepo.Create(user); err != nil {
		return nil, err
	}

	return user, nil
}

func AuthenticateUser(userRepo *repository.Userdb, email, password string) (*model.User, error) {
	user, err := userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid credentials")
	}

	return user, nil
}
