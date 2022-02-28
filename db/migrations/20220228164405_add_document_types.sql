-- +goose Up
-- +goose StatementBegin
CREATE table document_types (
    id SERIAL PRIMARY KEY,
    type varchar(255)
);

CREATE table document_templates (
    id SERIAL PRIMARY KEY,
    type_id INT references document_types(id),
    name varchar(255),
    template text
);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP table document_templates CASCADE;
DROP table document_types CASCADE;
-- +goose StatementEnd
