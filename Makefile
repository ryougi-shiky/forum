# Define variables
SERVER_IMAGE_NAME=ryougishiky/forum_server
MYSQL_IMAGE_NAME=ryougishiky/forum_mysql
LABEL=latest
# Create cluster and load all yaml
CLUSTER_NAME=forum
init:
	sudo kind delete cluster --name $(CLUSTER_NAME)
	sudo kind create cluster --name $(CLUSTER_NAME)

	sudo kubectl apply -f db/mysql/mysql.yaml
	sudo kubectl apply -f server/server.yaml
	
# to access database
# kubectl exec -it [POD_NAME] -- mysql -u root -p
run:
	sudo kubectl apply -f db/mysql/mysql.yaml
	sudo kubectl apply -f server/server.yaml
	
mysql: mysql_init mysql_push

mysql_init:
	sudo docker build -t $(MYSQL_IMAGE_NAME):$(LABEL) ./db/mysql

mysql_push:
	docker push $(MYSQL_IMAGE_NAME):$(LABEL)

# Default target
server: server_build server_push

# Build the Docker image
server_build:
	docker build -t $(SERVER_IMAGE_NAME):$(LABEL) ./server

# Push the Docker image to Docker Hub
server_push:
	docker push $(SERVER_IMAGE_NAME):$(LABEL)

server_run:
	docker run -p 5000:5000 make 

# Target for cleaning up
server_clean:
	docker rmi $(SERVER_IMAGE_NAME):$(LABEL)
	