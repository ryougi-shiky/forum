package main

import (
	"log"

	// "net/http"

	"server/handler"
	"server/repository"
	"server/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)





func main() {
	server := startServer()

	server.Router.POST("user/register", handler.RegisterUserHandler)

	server.Router.Run()
}
