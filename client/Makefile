# Define variables
CLIENT_IMAGE_NAME=ryougishiky/forum_client
LABEL=latest

# Default target
client: client_build client_push

# Build the Docker image
client_build:
	docker build -t $(CLIENT_IMAGE_NAME):$(LABEL) .

# Push the Docker image to Docker Hub
client_push:
	docker push $(CLIENT_IMAGE_NAME):$(LABEL)

client_run:
	docker run -p 3000:3000 make 

# Target for cleaning up
client_clean:
	docker rmi $(CLIENT_IMAGE_NAME):$(LABEL)
