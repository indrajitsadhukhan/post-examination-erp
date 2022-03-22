Detailed APIs by use case:

Exam section can view all available document types and their iterations.

GET - /doc/manage/types

Return:
	Array of document types with their iterations.

Exam section can add a new document type

	POST - /doc/manage/types/add

	Body:
		Type: String
	
	Return:
		Success/Failure

Exam section can add new iterations to document  types. Iterations are basically templates.
	
	POST - /doc/manage/types/:type

	Body:
		Template: String,
		Name: String

Additional processing:
	Validate the given template

Return:
	Success/Failure

Exam section can view templates of document types.

	GET - /doc/manage/types/:type/:version
	
	Return:
		Template String for the type and version.


Exam section can edit existing document types
PUT - /doc/manage/types/:type/:version

Body:
	Template: string

Return:
	Success/Failure

Exam section can get semester list who are using some document version.
GET - /doc/manage/types/:type/:version/list

Return:
	List of semesters using the particular document type and version

Exam section can generate documents for the selected semester lists.
	POST - /doc/manage/types/:type/:version/generate

	Return:
		Success/Failure