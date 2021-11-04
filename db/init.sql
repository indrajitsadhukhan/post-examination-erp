create table users (
	id SERIAL PRIMARY KEY,
	email varchar(255),
	first_name varchar(100),
	last_name varchar(100)
);

create index user_email_index on users(email);

create table user_data (
	uid int references users(id),
	data jsonb
);

create table roles (
	id SERIAL PRIMARY KEY,
	name varchar(100)
);

create table user_roles (
	uid INT references users(id),
	rid INT references roles(id)
);

ALTER TABLE user_roles ADD CONSTRAINT user_roles_pk PRIMARY KEY (uid, rid);

create table permissions (
	id SERIAL PRIMARY KEY,
	name varchar(100)
);

create table role_permissions (
	rid INT references roles(id),
	pid INT references permissions(id)
);

ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_pk PRIMARY KEY (rid, pid);

create table programme (
	id SERIAL PRIMARY KEY,
	name varchar(255),
	code varchar(255) UNIQUE
);

create table programme_versions (
	id SERIAL PRIMARY KEY,
	programme_id INT references programme(id),
	start_date timestamp,
	end_date timestamp
);

create table semester (
	id SERIAL PRIMARY KEY,
	programme_version_id INT references programme_versions(id),
	num smallint,
	start_date timestamp,
	end_date timestamp
);

create table course (
	id SERIAL PRIMARY KEY,
	code varchar(255),
	name varchar(255)
);

create table course_versions (
	id SERIAL PRIMARY KEY,
	course_id INT references course(id),
	details text
);

create table semester_courses (
	id SERIAL PRIMARY KEY,
	course_version_id INT references course_versions(id),
	semester_id INT references semester(id)
);

create table course_examiners (
	id SERIAL PRIMARY KEY,
	semester_course_id INT references semester_courses(id),
	user_id INT references users(id)
);

create table exam (
	id SERIAL PRIMARY KEY,
	semester_courses_id INT references semester_courses(id),
	name varchar(255),
	full_marks numeric
);

create table marks (
	id SERIAL PRIMARY KEY,
	exam_id INT references exam(id),
	user_id INT references users(id),
	obtained_marks numeric
);
