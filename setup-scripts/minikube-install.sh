# Install minikube
if [[ $OSTYPE == 'darwin'* ]]; then
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
  sudo install minikube-darwin-amd64 /usr/local/bin/minikube
else
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
fi

# Start the cluster
minikube start
