insert into grade_data
values
(1, 90, 100, 10, 'A+', 'Excellent'),
(1, 80, 89, 9, 'A', 'Very Good'),
(1, 70, 79, 8, 'B', 'Good'),
(1, 60, 69, 7, 'C', 'Fair'),
(1, 50, 59, 6, 'D', 'Average'),
(1, 40, 49, 5, 'P', 'Pass'),
(1, 0, 39, 0, 'F', 'Fail'),
(1, NULL, NULL, -1, 'I', 'Incomplete'),
(1, NULL, NULL, -1, 'DR', 'Deregistered');

insert into grades
values
(1, '2018_theory', 1);

insert into grade_data
values
(2, 45, 50, 10, 'A+', 'Excellent'),
(2, 40, 44, 9, 'A', 'Very Good'),
(2, 35, 39, 8, 'B', 'Good'),
(2, 30, 34, 7, 'C', 'Fair'),
(2, 25, 29, 6, 'P', 'Pass'),
(2, 0, 24, 0, 'F', 'Fail'),
(2, NULL, NULL, -1, 'I', 'Incomplete'),
(2, NULL, NULL, -1, 'DR', 'Deregistered');

insert into grades
values
(2, '2018_practical', 1);

insert into course_regulations (name, data)
values
(
	'critera_ug_2018',
'
 {
    "min_cgpa": "8.0"
 }
');

insert into programme_regulations (name, data)
values
(
	'programme_critera_ug_2018',
'
 {
	"cgpa_requirement": "5",
	"max_backlogs_in_a_year": "5",
	"theory_pass_per": "40",
	"practical_pass_per": "50",
	"attendance_per": "75"
 }
'),
(
	'programme_critera_ug_2019',
'
 {
	"cgpa_requirement": "6",
	"max_backlogs_in_a_year": "6",
	"theory_pass_per": "40",
	"practical_pass_per": "50",
	"attendance_per": "75"
 }
');