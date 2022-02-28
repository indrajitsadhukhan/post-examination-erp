CREATE TABLE programme (
    id integer SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    code character varying(255) UNIQUE NOT NULL
);
CREATE TABLE programme_regulations (
    id integer SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    data jsonb
);

CREATE TABLE programme_versions (
    id integer SERIAL PRIMARY KEY,
    programme_id integer,
    programme_regulations_id integer,
    start_date date
);

ALTER TABLE ONLY programme_versions
    ADD CONSTRAINT programme_versions_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES programme(id);

ALTER TABLE ONLY programme_versions
    ADD CONSTRAINT programme_versions_programme_regulations_id_fkey FOREIGN KEY
    (programme_regulations_id) REFERENCES programme_regulations(id);

CREATE TABLE programme_users (
    id integer SERIAL PRIMARY KEY,
    programme_id integer,
    user_id integer,
    start_date date,
    end_date date,
    CONSTRAINT aaa CHECK ((end_date > start_date))
);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_programme_id_user_id_key UNIQUE (programme_id, user_id);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES programme_versions(id);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

