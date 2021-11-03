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
