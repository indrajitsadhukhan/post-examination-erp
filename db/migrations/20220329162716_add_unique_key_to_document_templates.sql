-- +goose Up
-- +goose StatementBegin
ALTER TABLE document_templates
ADD CONSTRAINT unique_type_id_instance UNIQUE (type_id, instance);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE document_templates
DROP CONSTRAINT unique_type_id_instance;
-- +goose StatementEnd
