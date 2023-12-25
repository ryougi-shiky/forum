package service

import (
	"log"
	. "server/model"
	"server/repository"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func startServer() *Server {
	log.Println("Starting server...")
	server := &Server{
		Router:    gin.Default(),
	}
	db, err := repository.ConnectToMysql()
	if err != nil {
		log.Fatalf("Failed to connect to DB: %s", err.Error())
	}
	log.Println("Connected to DB:", db)
	server.DB = db
	server.UserService = service.NewUserService(repository.NewUserRepository(db))

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	server.Router.Use(cors.New(config))

	if server.Validator == nil {
		server.Validator = validator.New()
	}
	return server
}
