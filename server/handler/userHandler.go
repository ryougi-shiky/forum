package handler

import (
	"net/http"
	"server/model"
	"server/repository"
	"server/service"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterUserHandler(c *gin.Context) {
	var registerRequest model.RegisterRequest

	if err := c.ShouldBindJSON(&registerRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create UserRepository and UserService instances
	userRepo := repository.NewUserRepository(s.DB)
	userService := service.NewUserService(userRepo)
	// Register user
	user, err := userService.RegisterUser(registerRequest.Username, registerRequest.Email, registerRequest.Password)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}
