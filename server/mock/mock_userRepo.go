package mock

import (
	"server/model"
	"errors"
)

type MockUserRepository struct {
	users map[string]*model.User
}

func NewMockUserRepository() *MockUserRepository {
	return &MockUserRepository{users: make(map[string]*model.User)}
}

func (m *MockUserRepository) FindByEmail(email string) (*model.User, error) {
	if user, exists := m.users[email]; exists {
		return user, nil
	}
	return nil, nil
}

func (m *MockUserRepository) Create(user *model.User) error {
	if _, exists := m.users[user.Email]; exists {
		return errors.New("user already exists")
	}
	m.users[user.Email] = user
	return nil
}
