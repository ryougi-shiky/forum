# Create cluster and load all yaml
CLUSTER_NAME=forum
init:
	sudo kind delete cluster --name $(CLUSTER_NAME)
	sudo kind create cluster --name $(CLUSTER_NAME)
	sudo kubectl apply -f mongodb.yaml
	sudo kubectl apply -f server.yaml
	sudo kubectl apply -f client.yaml
	sudo kubectl apply -f ingress.yaml

deploy:
	sudo kubectl apply -f mongodb.yaml
	sudo kubectl apply -f server.yaml
	sudo kubectl apply -f client.yaml
	sudo kubectl apply -f ingress.yaml
