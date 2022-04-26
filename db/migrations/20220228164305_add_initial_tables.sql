-- +goose Up
-- +goose StatementBegin
create table users (
                       id SERIAL PRIMARY KEY,
                       email varchar(255) UNIQUE,
                       password_hash varchar(255) NOT NULL,
                       first_name varchar(100) NOT NULL,
                       last_name varchar(100)
);

create index user_email_index on users(email);

create table user_data (
                           uid int references users(id),
                           data jsonb
);

create table roles (
                       id SERIAL PRIMARY KEY,
                       name varchar(100) UNIQUE NOT NULL
);

create table user_roles (
                            uid INT references users(id),
                            rid INT references roles(id)
);

ALTER TABLE user_roles ADD CONSTRAINT user_roles_pk PRIMARY KEY (uid, rid);

create table permissions (
                             id SERIAL PRIMARY KEY,
                             name varchar(100) UNIQUE NOT NULL
);

create table role_permissions (
                                  rid INT references roles(id),
                                  pid INT references permissions(id)
);

ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_pk PRIMARY KEY (rid, pid);

create table programme_regulations (
                                       id SERIAL PRIMARY KEY,
                                       name varchar(255) NOT NULL,
                                       data jsonb
);

create table course_regulations (
                                    id SERIAL PRIMARY KEY,
                                    name varchar(255) NOT NULL,
                                    data jsonb
);

create table programme (
                           id SERIAL PRIMARY KEY,
                           name varchar(255) NOT NULL,
                           code varchar(255) UNIQUE NOT NULL
);

create table programme_versions (
                                    id SERIAL PRIMARY KEY,
                                    programme_id INT references programme(id),
                                    programme_regulations_id INT references programme_regulations(id),
                                    start_date timestamp,
                                    end_date timestamp
);

create table programme_users(
                                id SERIAL PRIMARY KEY,
                                programme_id INT references programme_versions(id),
                                user_id INT references users(id)
);

create table semester (
                          id SERIAL PRIMARY KEY,
                          programme_version_id INT references programme_versions(id),
                          num smallint NOT NULL,
                          start_date timestamp,
                          end_date timestamp
);

create table course (
                        id SERIAL PRIMARY KEY,
                        code varchar(255) UNIQUE NOT NULL,
                        name varchar(255) NOT NULL
);

create table grade_data (
                            gid INT NOT NULL,
                            low float,
                            high float,
                            numeric_grade float NOT NULL DEFAULT -1,
                            letter_grade varchar(5) NOT NULL DEFAULT '-',
                            performance varchar(100),
                            constraint grades_pk PRIMARY KEY (gid, letter_grade, numeric_grade)
);

create table grades (
                        id SERIAL PRIMARY KEY,
                        name varchar(100),
                        grade_data_id INT
);

create table semester_courses (
                                  id SERIAL PRIMARY KEY,
                                  course_id INT references course(id),
                                  course_regulations_id INT references course_regulations(id),
                                  semester_id INT references semester(id),
                                  grade_id INT references grades(id),
                                  details text
);

create table course_examiners (
                                  id SERIAL PRIMARY KEY,
                                  semester_course_id INT references semester_courses(id),
                                  user_id INT references users(id)
);

create table exams (
                       id SERIAL PRIMARY KEY,
                       semester_course_id INT references semester_courses(id),
                       name varchar(255) NOT NULL,
                       weightage float NOT NULL,
                       full_marks numeric NOT NULL
);

create table marks (
                       id SERIAL PRIMARY KEY,
                       exam_id INT references exams(id),
                       user_id INT references users(id),
                       obtained_marks numeric
);


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table grades CASCADE;
drop table grade_data CASCADE;
drop table marks CASCADE;
drop table exams CASCADE;
drop table course_examiners CASCADE;
drop table semester_courses CASCADE;
drop table course CASCADE;
drop table semester CASCADE;
drop table programme_users CASCADE;
drop table programme_versions CASCADE;
drop table programme CASCADE;
drop table programme_regulations CASCADE;
drop table course_regulations CASCADE;
drop table role_permissions CASCADE;
drop table permissions CASCADE;
drop table user_roles CASCADE;
drop table roles CASCADE;
drop table user_data CASCADE;
drop table users CASCADE;
-- +goose StatementEnd