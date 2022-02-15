--insert into users table
INSERT INTO users (email, password_hash, first_name, last_name)
VALUES ('dwairay1@gmail.com', '12345', 'Dwaipayan', 'Ray'),
('aditimili2000@gmail.com', '54321', 'Aditi', 'Nath');

-- insert into programme table
INSERT INTO programme (name, code)
VALUES ('Bachelors of Technology- CST', 'BTECH-CST');

-- insert into programme versions table
INSERT INTO programme_versions (programme_id, start_date, end_date)
VALUES (1, '2018-08-19', '2022-08-18');

-- insert into programme_users table
INSERT INTO programme_users (programme_id, user_id)
VALUES
(1, 1),
(1, 2);

-- insert into semester table
INSERT INTO semester (programme_version_id, num, start_date, end_date)
VALUES (1, 1, '2018-08-19', '2018-12-20');

--insert into course table
INSERT INTO course (code, name)
VALUES ('CS101', 'Introduction to C'),
('AE101', 'Mechanics'),
('PH101', 'Physics'),
('MA101', 'Mathematics');

-- insert into grade_data table
INSERT INTO grade_data (gid, low, high, numeric_grade, letter_grade, performance)
VALUES (1, 90, 100, 10, 'A+', 'Excellent'),
(1, 80, 89, 9, 'A', 'Very Good'),
(1, 70, 79, 8, 'B', 'Good'),
(1, 60, 69, 7, 'C', 'Fair'),
(1, 50, 59, 6, 'D', 'Average'),
(1, 40, 49, 5, 'P', 'Pass'),
(1, 0, 39, 0, 'F', 'Fail'),
(1, NULL, NULL, -1, 'I', 'Incomplete'),
(1, NULL, NULL, -1, 'DR', 'Deregistered');

-- insert into grades table
INSERT INTO grades
VALUES (1, '2018_theory', 1);

--insert into semester_courses table
INSERT INTO semester_courses (course_id, semester_id, grade_id)
VALUES (1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1);

--insert into exams
INSERT INTO exams (semester_course_id, name, weightage, full_marks)
VALUES
(1, 'Internal', 30, 100),
(1, 'End Sem', 70, 100),
(2, 'Internal', 30, 100),
(2, 'End Sem', 70, 100),
(3, 'Internal', 30, 100),
(3, 'End Sem', 70, 100),
(4, 'Internal', 30, 100),
(4, 'End Sem', 70, 100);

--insert into marks
INSERT INTO marks (exam_id, user_id, obtained_marks)
VALUES
(1, 1, 96),
(1, 2, 96),
(2, 1, 69),
(2, 2, 69),
(3, 1, 78),
(3, 2, 100),
(4, 1, 65),
(4, 2, 68),
(5, 1, 100),
(5, 2, 99),
(6, 1, 89),
(6, 2, 90),
(7, 1, 92),
(7, 2, 90),
(8, 1, 99),
(8, 2, 95);

 






