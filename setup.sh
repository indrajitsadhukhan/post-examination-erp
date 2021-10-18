sh setup-scripts/minikube-install.sh
sh setup-scripts/kubegres-install.sh

# Apply configs
kubectl apply -f config/postgres-secret.yaml
kubectl apply -f config/postgres.yaml
