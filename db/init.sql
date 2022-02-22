SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE course (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


CREATE TABLE course_examiners (
    id integer NOT NULL,
    semester_course_id integer,
    user_id integer
);

CREATE SEQUENCE course_examiners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE course_examiners_id_seq OWNED BY course_examiners.id;


CREATE SEQUENCE course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE course_id_seq OWNED BY course.id;

CREATE TABLE course_regulations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    data jsonb
);

CREATE SEQUENCE course_regulations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE course_regulations_id_seq OWNED BY course_regulations.id;

CREATE TABLE course_versions (
    id integer NOT NULL,
    course_id integer,
    details text
);

CREATE SEQUENCE course_versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE course_versions_id_seq OWNED BY course_versions.id;

CREATE TABLE exam (
    id integer NOT NULL,
    semester_courses_id integer,
    name character varying(255) NOT NULL,
    full_marks numeric NOT NULL
);

CREATE SEQUENCE exam_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE exam_id_seq OWNED BY exam.id;

CREATE TABLE grade_data (
    gid integer NOT NULL,
    low double precision,
    high double precision,
    numeric_grade double precision DEFAULT '-1'::integer NOT NULL,
    letter_grade character varying(5) DEFAULT '-'::character varying NOT NULL,
    performance character varying(100)
);

CREATE TABLE grades (
    id integer NOT NULL,
    name character varying(100),
    grade_data_id integer
);

CREATE SEQUENCE grades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grades_id_seq OWNED BY grades.id;

CREATE TABLE marks (
    id integer NOT NULL,
    exam_id integer,
    user_id integer,
    obtained_marks numeric
);

CREATE SEQUENCE marks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE marks_id_seq OWNED BY marks.id;

CREATE TABLE permissions (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);

CREATE SEQUENCE permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE permissions_id_seq OWNED BY permissions.id;

CREATE TABLE programme (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL
);

CREATE SEQUENCE programme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE programme_id_seq OWNED BY programme.id;

CREATE TABLE programme_regulations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    data jsonb
);

CREATE SEQUENCE programme_regulations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE programme_regulations_id_seq OWNED BY programme_regulations.id;

CREATE TABLE programme_users (
    id integer NOT NULL,
    programme_id integer,
    user_id integer,
    start_date date,
    end_date date
);

CREATE SEQUENCE programme_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE programme_users_id_seq OWNED BY programme_users.id;

CREATE TABLE programme_versions (
    id integer NOT NULL,
    programme_id integer,
    programme_regulations_id integer,
    start_date date
);

CREATE SEQUENCE programme_versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE programme_versions_id_seq OWNED BY programme_versions.id;

CREATE TABLE role_permissions (
    rid integer NOT NULL,
    pid integer NOT NULL
);

CREATE TABLE roles (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);

CREATE SEQUENCE roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE roles_id_seq OWNED BY roles.id;

CREATE TABLE semester (
    id integer NOT NULL,
    programme_version_id integer,
    num smallint NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone
);

CREATE TABLE semester_courses (
    id integer NOT NULL,
    course_version_id integer,
    course_regulations_id integer,
    semester_id integer,
    grade_id integer
);


CREATE SEQUENCE semester_courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE semester_courses_id_seq OWNED BY semester_courses.id;

CREATE SEQUENCE semester_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE semester_id_seq OWNED BY semester.id;

CREATE TABLE user_data (
    uid integer,
    data jsonb
);

CREATE TABLE user_roles (
    uid integer NOT NULL,
    rid integer NOT NULL
);

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255),
    password_hash character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100)
);

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE users_id_seq OWNED BY users.id;

ALTER TABLE ONLY course ALTER COLUMN id SET DEFAULT nextval('course_id_seq'::regclass);

ALTER TABLE ONLY course_examiners ALTER COLUMN id SET DEFAULT nextval('course_examiners_id_seq'::regclass);

ALTER TABLE ONLY course_regulations ALTER COLUMN id SET DEFAULT nextval('course_regulations_id_seq'::regclass);

ALTER TABLE ONLY course_versions ALTER COLUMN id SET DEFAULT nextval('course_versions_id_seq'::regclass);

ALTER TABLE ONLY exam ALTER COLUMN id SET DEFAULT nextval('exam_id_seq'::regclass);

ALTER TABLE ONLY grades ALTER COLUMN id SET DEFAULT nextval('grades_id_seq'::regclass);

ALTER TABLE ONLY marks ALTER COLUMN id SET DEFAULT nextval('marks_id_seq'::regclass);

ALTER TABLE ONLY permissions ALTER COLUMN id SET DEFAULT nextval('permissions_id_seq'::regclass);

ALTER TABLE ONLY programme ALTER COLUMN id SET DEFAULT nextval('programme_id_seq'::regclass);

ALTER TABLE ONLY programme_regulations ALTER COLUMN id SET DEFAULT nextval('programme_regulations_id_seq'::regclass);

ALTER TABLE ONLY programme_users ALTER COLUMN id SET DEFAULT nextval('programme_users_id_seq'::regclass);

ALTER TABLE ONLY programme_versions ALTER COLUMN id SET DEFAULT nextval('programme_versions_id_seq'::regclass);

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);

ALTER TABLE ONLY semester ALTER COLUMN id SET DEFAULT nextval('semester_id_seq'::regclass);

ALTER TABLE ONLY semester_courses ALTER COLUMN id SET DEFAULT nextval('semester_courses_id_seq'::regclass);

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

ALTER TABLE ONLY course
    ADD CONSTRAINT course_code_key UNIQUE (code);

ALTER TABLE ONLY course_examiners
    ADD CONSTRAINT course_examiners_pkey PRIMARY KEY (id);

ALTER TABLE ONLY course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);

ALTER TABLE ONLY course_regulations
    ADD CONSTRAINT course_regulations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY course_versions
    ADD CONSTRAINT course_versions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY exam
    ADD CONSTRAINT exam_pkey PRIMARY KEY (id);

ALTER TABLE ONLY grade_data
    ADD CONSTRAINT grades_pk PRIMARY KEY (gid, letter_grade, numeric_grade);

ALTER TABLE ONLY grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id);

ALTER TABLE ONLY marks
    ADD CONSTRAINT marks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);

ALTER TABLE ONLY permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY programme
    ADD CONSTRAINT programme_code_key UNIQUE (code);

ALTER TABLE ONLY programme
    ADD CONSTRAINT programme_pkey PRIMARY KEY (id);

ALTER TABLE ONLY programme_regulations
    ADD CONSTRAINT programme_regulations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY programme_versions
    ADD CONSTRAINT programme_versions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY role_permissions
    ADD CONSTRAINT role_permissions_pk PRIMARY KEY (rid, pid);

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY semester_courses
    ADD CONSTRAINT semester_courses_pkey PRIMARY KEY (id);

ALTER TABLE ONLY semester
    ADD CONSTRAINT semester_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_pk PRIMARY KEY (uid, rid);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

CREATE INDEX user_email_index ON users USING btree (email);

ALTER TABLE ONLY course_examiners
    ADD CONSTRAINT course_examiners_semester_course_id_fkey FOREIGN KEY (semester_course_id) REFERENCES semester_courses(id);

ALTER TABLE ONLY course_examiners
    ADD CONSTRAINT course_examiners_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY course_versions
    ADD CONSTRAINT course_versions_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id);

ALTER TABLE ONLY exam
    ADD CONSTRAINT exam_semester_courses_id_fkey FOREIGN KEY (semester_courses_id) REFERENCES semester_courses(id);

ALTER TABLE ONLY marks
    ADD CONSTRAINT marks_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exam(id);

ALTER TABLE ONLY marks
    ADD CONSTRAINT marks_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES programme_versions(id);

ALTER TABLE ONLY programme_users
    ADD CONSTRAINT programme_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY programme_versions
    ADD CONSTRAINT programme_versions_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES programme(id);

ALTER TABLE ONLY programme_versions
    ADD CONSTRAINT programme_versions_programme_regulations_id_fkey FOREIGN KEY (programme_regulations_id) REFERENCES programme_regulations(id);

ALTER TABLE ONLY role_permissions
    ADD CONSTRAINT role_permissions_pid_fkey FOREIGN KEY (pid) REFERENCES permissions(id);

ALTER TABLE ONLY role_permissions
    ADD CONSTRAINT role_permissions_rid_fkey FOREIGN KEY (rid) REFERENCES public.roles(id);

ALTER TABLE ONLY semester_courses
    ADD CONSTRAINT semester_courses_course_regulations_id_fkey FOREIGN KEY (course_regulations_id) REFERENCES course_regulations(id);

ALTER TABLE ONLY semester_courses
    ADD CONSTRAINT semester_courses_course_version_id_fkey FOREIGN KEY (course_version_id) REFERENCES course_versions(id);

ALTER TABLE ONLY semester_courses
    ADD CONSTRAINT semester_courses_grade_id_fkey FOREIGN KEY (grade_id) REFERENCES grades(id);

ALTER TABLE ONLY semester_courses
    ADD CONSTRAINT semester_courses_semester_id_fkey FOREIGN KEY (semester_id) REFERENCES semester(id);

ALTER TABLE ONLY semester
    ADD CONSTRAINT semester_programme_version_id_fkey FOREIGN KEY (programme_version_id) REFERENCES programme_versions(id);

ALTER TABLE ONLY user_data
    ADD CONSTRAINT user_data_uid_fkey FOREIGN KEY (uid) REFERENCES users(id);

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_rid_fkey FOREIGN KEY (rid) REFERENCES roles(id);

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_uid_fkey FOREIGN KEY (uid) REFERENCES users(id);

ALTER TABLE programme_users ADD UNIQUE(programme_id,user_id);
ALTER TABLE programme_users ADD CONSTRAINT valid_range CHECK (end_date > start_date) ;
