package main

import (
	. "server/handler"
)

func main() {

	server := StartServer()

	server.Router.POST("user/register", server.RegisterUserHandler)

	server.Router.Run()
}
