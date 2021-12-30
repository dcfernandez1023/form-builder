# Form Builder
Create and host forms without writing any code. Form submissions can be configured to be sent to:
- Email
- Google Sheets
- REST API

## Usage
- To install packages for both the frontend and backend, navigate to /server and run `npm run install-all`
- To build both the frontend and backend, navigate to /server and run `npm run build-all`
- To build and run both the frontend and backend simultaneously, navigate to /server and run `npm run build-and-run-all`

## API

### User

#### <u> GET </u>

#### `/api/user/getUser`

    Required Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Response Body: {
      "id": <string>,
      "email": <string>,
      "firstName": <string>,
      "lastName": <string>,
      "dateCreated": <number>
    }

#### <u> POST </u>

#### `/api/user/register`

    Request Body: {
      "email": <string>
      "password": <string>,
      "firstName": <string>,
      "lastName": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Response Body: {
      "id": <string>,
      "email": <string>,
      "firstName": <string>,
      "lastName": <string>,
      "dateCreated": <number>
    }

#### `/api/user/login`

    Request Body: {
      "email": <string>,
      "password": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

#### `/api/user/forgotPassword`

    Request Body: {
      "email": <string>
    }

#### `/api/user/refreshAccessToken`

    Required Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

#### `api/user/resetPassowrd`

    Request Body: {
      "email": <string>,
      "newPassword": <string>,
      "verificationToken": <string>
    }

#### `/api/user/updateFields`

<b> Note: </b> <i> Request body can contain some or all fields of the User object. The fields `id` and `dateCreated` are protected fields and cannot be updated, so they will not be updated if included. The response body will return only the fields that can be updated and if they included in the request body. </i>

    Required Request Headers: {
      "accessToken": <string>
    }

    Request Body: {
      "fields": {
        "id": <string>,
        "email"; <string>,
        "firstName": <string>,
        "lastName": <string>,
        "dateCreated": <number>
      }
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Response Body: {
      "email"; <string>,
      "firstName": <string>,
      "lastName": <string>
    }

#### `/api/user/delete`

    Required Request Headers: {
      "accessToken": <string>
    }

    Request Body: {
      "password": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Respone Body: {
      "id": <string>
    }

### Form

#### <u> GET </u>

#### `/api/form/getForms`

    Required Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Response Body: [
      {
        "id": <string>,
        "userId": <string>,
        "title": <string>,
        "dateCreated": <number>,
        "lastModified": <number>,
        "isPublished": <boolean>,
        "accessKey": <string>,
        "elements": [<json>],
        "submissions": [<json>],
        "submissionHandlers": <json>
      },
      ...
    ]

#### `/api/form/getForm/:formId`

    Required Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

    Response Body: {
        "id": <string>,
        "userId": <string>,
        "title": <string>,
        "dateCreated": <number>,
        "lastModified": <number>,
        "isPublished": <boolean>,
        "accessKey": <string>,
        "elements": [<json>],
        "submissions": [<json>],
        "submissionHandlers": <json>
      }

#### <u> POST </u>

#### `/api/form/createNew`

    Required Request Headers: {
      "accessToken": <string>
    }

    Request Body: {
      "title": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }    

    Response Body: {
        "id": <string>,
        "userId": <string>,
        "title": <string>,
        "dateCreated": <number>,
        "lastModified": <number>,
        "isPublished": <boolean>,
        "accessKey": <string>,
        "elements": [<json>],
        "submissions": [<json>],
        "submissionHandlers": <json>
      }

#### `/api/form/updateFields/:formId`

<b> Note: </b> <i> Request body can contain some or all fields of the Form object. The fields `id`, `userId`, `dateCreated`, and `lastModified` are protected fields and cannot be updated, so they will not be updated if included. The response body will return only the fields that can be updated and were included in the request body. </i>

    Required Request Headers: {
      "accessToken": <string>
    }

    Request Body: {
      "id": <string>,
      "userId": <string>,
      "title": <string>,
      "dateCreated": <number>,
      "lastModified": <number>,
      "isPublished": <boolean>,
      "accessKey": <string>,
      "elements": [<json>],
      "submissions": [<json>],
      "submissionHandlers": <json>
    }
    --    
    Response Header: {
      "accessToken": <string>
    }

    Response Body: {
      "title": <string>,
      "isPublished": <boolean>,
      "accessKey": <string>,
      "elements": [<json>],
      "submissions": [<json>],
      "submissionHandlers": <json>
    }

#### `/api/form/handleSubmit/:formId`

    Request Body: {
      "formSubmission": {
        {
          <id: string>: {"name": <string>, "value": <string>},
          ...
        }
      }
    }

#### <u> DELETE </u>

#### `/api/form/delete/:formId`

    Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }
