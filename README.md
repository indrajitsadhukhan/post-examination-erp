## Pre-requisites

- Docker
  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04
- kubectl 
  https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

## Installation

Run the setup script:

```bash
./setup.sh
```
## Tutorial on Node-JS PostgreSQL Web Framework
https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/#whatisnodepostgres

https://ishan02016.medium.com/creating-your-api-with-node-express-and-postgres-a50eb47451a2

https://node-postgres.com/features/connecting

https://www.rithmschool.com/courses/intermediate-node-express


## Goose: An application for coordinated migration and updation of database
### Installation
```
git clone https://github.com/pressly/goose
cd goose
go mod tidy
go build -o goose ./cmd/goose
```
Needless to say, the above step is **one time** only.

Now we have to compose a file named `.env`. It should have the following two lines:
```
GOOSE_DRIVER= postgres/mysql/sqlite3/mssql/redshift/tidb/clickhouse
GOOSE_DBSTRING="GOOSE_DRIVER://USERNAME:PASSWORD@ADDRESS:PORT/DBNAME?sslmode=disable"
```
**USERNAME**,**PASSWORD**,**ADDRESS**,**PORT**,**DBNAME** are placeholders.

The next we have to compose an executable, `goose.sh`. The lines to be included are:
```
source .env
/PATH_TO_GOOSE/goose -dir ./db/migrations $GOOSE_DRIVER $GOOSE_DBSTRING $@
```
The content must be copied **_verbatim_**, except for **PATH_TO_GOOSE** which must be appropriately substituted.

Now grab a updated copy of the github repository in a local folder. Go into that folder.

Bring in the previously composed `.env` and `goose.sh` file, overwriting the older version of the same.

Run `./goose.sh up` to make the local database up-to-date with the one at the github repository

Now run `./goose.sh create MY_UPDATE.sql`. A file `db/migrations/TIMESTAMP_MY_UPDATE.sql` shall be created. Note that **MY_UPDATE** and **TIMESTAMP** are placeholders. 

Now edit the file. The first time, it will show like this:
```
-- +goose Up
-- +goose StatementBegin
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd
```
So you have to keep the required changes between the first `-- +goose StatementBegin` and `-- +goose StatementEnd`. Moreover, between the second pair, keep appropiate `DROP TABLE` commands.

Finally do `./goose.sh up`.

In your local branch, add the file with the appropiate filename.
