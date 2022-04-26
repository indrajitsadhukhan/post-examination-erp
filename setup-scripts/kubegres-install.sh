kubectl apply -f https://raw.githubusercontent.com/reactive-tech/kubegres/v1.12/kubegres.yaml
kubectl get all -n kubegres-system
# Set defaut storage class
kubectl patch storageclass standard -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'

