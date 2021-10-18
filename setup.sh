sh setup-scripts/minikube-install.sh
sh setup-scripts/kubegres-install.sh

# Apply postgres configs
kubectl apply -f config/postgres-secret.yaml
kubectl apply -f config/postgres.yaml

# Apply pgadmin configs
kubectl apply -f config/pgadmin-secret.yaml
kubectl apply -f config/pgadmin-configmap.yaml
kubectl apply -f config/pgadmin-service.yaml
kubectl apply -f config/pgadmin-statefulset.yaml
