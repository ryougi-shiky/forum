# Create cluster and load all yaml
CLUSTER_NAME=forum
init:
	sudo kind delete cluster --name $(CLUSTER_NAME)
	sudo kind create cluster --name $(CLUSTER_NAME)
	# helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
	# helm repo update
	# helm install ingress-nginx ingress-nginx/ingress-nginx
	sudo kubectl apply -f mongodb.yaml
	sudo kubectl apply -f server.yaml
	sudo kubectl apply -f client.yaml
	# sudo kubectl apply -f ingress.yaml
	sudo kubectl create configmap nginx-config --from-file=../nginx/nginx.conf
	sudo kubectl apply -f nginx.yaml

deploy:
	sudo kubectl apply -f mongodb.yaml
	sudo kubectl apply -f server.yaml
	sudo kubectl apply -f client.yaml
	# sudo kubectl apply -f ingress.yaml
	kubectl delete configmap nginx-config
	kubectl create configmap nginx-config --from-file=../nginx/nginx.conf
	kubectl rollout restart deployment/nginx
	sudo kubectl apply -f nginx.yaml
