-- +goose Up
-- +goose StatementBegin
ALTER TABLE users ALTER COLUMN first_name TYPE varchar(100);
ALTER TABLE users ADD univ_id varchar(20);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users ALTER COLUMN first_name TYPE varchar(100) NOT NULL;
ALTER TABLE users DROP COLUMN univ_id;
-- +goose StatementEnd
