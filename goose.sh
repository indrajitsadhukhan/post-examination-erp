source .env
goose -dir ./db/migrations $GOOSE_DRIVER $GOOSE_DBSTRING $1
