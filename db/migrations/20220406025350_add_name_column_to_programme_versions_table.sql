-- +goose Up
-- +goose StatementBegin
ALTER TABLE programme_versions ADD name VARCHAR(255) NOT NULL UNIQUE;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE programme_versions DROP COLUMN name;
-- +goose StatementEnd
