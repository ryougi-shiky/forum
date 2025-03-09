package model

import (
	"server/service"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Server struct {
	Router      *gin.Engine
	DB          *gorm.DB
	Validator   *validator.Validate
	UserService *service.UserService
	// UserService *service.UserService
}