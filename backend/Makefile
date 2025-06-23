# Define variables
IMAGE_NAME=ryougishiky/forum_server
VERSION=latest

# Default target
docker: build push

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(VERSION) .

# Push the Docker image to Docker Hub
push:
	docker push $(IMAGE_NAME):$(VERSION)

# Target for cleaning up
clean:
	docker rmi $(IMAGE_NAME):$(VERSION)
