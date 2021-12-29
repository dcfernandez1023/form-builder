# Form Builder
Create and host forms without writing any code. Form submissions can be configured to be sent to:
- Email
- Google Sheets
- REST API

## API

### User

<u> GET </u>

`/api/user/getUser`

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

<u> POST </u>

`/api/user/register`

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

`/api/user/login`

    Request Body: {
      "email": <string>,
      "password": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

`/api/user/forgotPassword`

    Request Body: {
      "email": <string>
    }

`/api/user/refreshAccessToken`

    Required Request Headers: {
      "accessToken": <string>
    }
    --
    Response Header: {
      "accessToken": <string>
    }

`api/user/resetPassowrd`

    Request Body: {
      "email": <string>,
      "newPassword": <string>,
      "verificationToken": <string>
    }

`/api/user/updateFields`

<b> Note: </b> <i> Request body can contain some or all fields of the User object. The fields `id` and `dateCreated` are protected fields and cannot be updated, so they will not be updated if included. The response body will return only the fields that were updated, which will only be `email`, `firstName`, and `lastName` at most. </i>

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

`/api/user/delete`

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

<u> GET </u>

`/api/form/getForms`

`/api/form/getForm/:formId`

<u> POST </u>

`/api/form/createNew`

`/api/form/updateFields/:formId`

`/api/form/handleSubmit/:formId`

<u> DELETE </u>

`/api/form/delete/:formId`
