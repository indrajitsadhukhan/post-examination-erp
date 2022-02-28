-- +goose Up
-- +goose StatementBegin
ALTER table document_templates RENAME COLUMN name to instance;

CREATE table documents (
    id SERIAL PRIMARY KEY,
    user_id INT references users(id),
    document_template_id INT references document_templates(id),
    name varchar(255) NOT NULL,
    url varchar(255)
);


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP table documents;
ALTER table document_templates RENAME COLUMN instance to name;

-- +goose StatementEnd
