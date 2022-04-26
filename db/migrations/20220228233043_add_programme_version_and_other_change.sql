-- +goose Up
-- +goose StatementBegin

ALTER TABLE programme_users ADD start_date date;
ALTER TABLE programme_users ADD end_date date;
ALTER TABLE programme_users ADD CONSTRAINT date_check CHECK ((end_date > start_date));

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE programme_users DROP start_date;
ALTER TABLE programme_users DROP end_date;
ALTER TABLE programme_users DROP CONSTRAINT date_check;


-- +goose StatementEnd

