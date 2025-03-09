# Define variables
SERVER_IMAGE_NAME=ryougishiky/forum_server
VERSION=latest

# Default target
server: server_build server_push

# Build the Docker image
server_build:
	docker build -t $(SERVER_IMAGE_NAME):$(VERSION) .

# Push the Docker image to Docker Hub
server_push:
	docker push $(SERVER_IMAGE_NAME):$(VERSION)

server_run:
	docker run -p 5000:5000 make 

# Target for cleaning up
server_clean:
	docker rmi $(SERVER_IMAGE_NAME):$(VERSION)
