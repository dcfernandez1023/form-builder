# Form Builder
Create and host forms without writing any code. Form submissions can be configured to be sent to:
- Email
- Google Sheets
- REST API
<hr>

## Changelog

### 1/12/2022
<b> Labels: </b> `Release`

Initial release. Includes basic functionality of the application which allows users to:
- Build forms
- Publish & host forms
- Secure forms with access tokens
- Configure submission handlers to send data to an email address, REST API, or Google Sheet
<hr>

## Usage

### Local
- To run the React server and Express server simultaneously, open two
separate terminals and run `npm run dev` in the `/server` directory of one terminal, and run `npm run start` in the `/frontend` directory of the other terminal.
- To run only the Express server and have the React app served statically, ensure that the React code is built by navigating to `/frontend` and running `npm run build`, and then navigate to `/server` and run `npm run prod` to build and start the Express server in production mode.
- To build both the frontend and backend, navigate to `/server` and run `npm run build-all`
- To build and run both the frontend and backend simultaneously, navigate to `/server` and run `npm run build-and-run-all`

### Production
This project is deploys to Heroku. The Heroku CLI is used to deploy
changes made to production code. Use `npm run deploy` to automatically
build and push the production code to Heroku.
<hr>

## Noteworthy Packages/Dependencies
### Frontend:
- React (https://reactjs.org/)
- Create React App (https://reactjs.org/docs/create-a-new-react-app.html)
- React Bootstrap (https://react-bootstrap.github.io/)
- recharts (https://recharts.org/en-US/)
- axios (https://www.npmjs.com/package/axios)
- react-router-dom (https://www.npmjs.com/package/react-router-dom)

### Backend:
- TypeScript (https://www.typescriptlang.org/)
- ts-node (https://www.npmjs.com/package/ts-node)
- Express (https://expressjs.com/)
- firebase-admin (https://www.npmjs.com/package/firebase-admin)
- nodemailer (https://nodemailer.com/about/)
- google-spreadsheet (https://www.npmjs.com/package/google-spreadsheet)
- uuid (https://www.npmjs.com/package/uuid)
- jsonwebtoken https://www.npmjs.com/package/jsonwebtoken)
<hr>

## API

### User

#### <u> GET </u>

#### `/api/user/getUser`

    Required Request Headers: {
      "access-token": <string>
    }
    --
    Response Header: {
      "access-token": <string>
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
      "lastName": <string>,
      "verificationToken": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }

    Response Body: {
      "id": <string>,
      "email": <string>,
      "firstName": <string>,
      "lastName": <string>,
      "dateCreated": <number>
    }

#### `/api/user/registerVerify`

<b> Note: </b> <i> This sends a registration token to the email address provided. To complete
the registration process, pass the registration token from the email to the `/api/user/register` endpoint </i>

    Request Body: {
      "email": <string>
    }

#### `/api/user/login`

    Request Body: {
      "email": <string>,
      "password": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }

#### `/api/user/forgotPassword`

    Request Body: {
      "email": <string>
    }

#### `/api/user/refreshAccessToken`

    Required Request Headers: {
      "access-token": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }

#### `/api/user/resetPassword`

    Request Body: {
      "email": <string>,
      "newPassword": <string>,
      "verificationToken": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }

#### `/api/user/updateFields`

<b> Note: </b> <i> Request body can contain some or all fields of the User object. The fields `id` and `dateCreated` are protected fields and cannot be updated, so they will not be updated if included. The response body will return only the fields that can be updated and if they included in the request body. </i>

    Required Request Headers: {
      "access-token": <string>
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
      "access-token": <string>
    }

    Response Body: {
      "email"; <string>,
      "firstName": <string>,
      "lastName": <string>
    }

#### `/api/user/delete`

    Required Request Headers: {
      "access-token": <string>
    }

    Request Body: {
      "password": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }

    Response Body: {
      "id": <string>
    }

### Form

#### <u> GET </u>

#### `/api/form/getForms`

    Required Request Headers: {
      "access-token": <string>
    }
    --
    Response Header: {
      "access-token": <string>
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
      "access-token": <string>
    }
    --
    Response Header: {
      "access-token": <string>
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

#### `/api/form/getPublishedForm/:formId`

<b> Note: </b> <i> This will return the form if it exists and is published. No access
token is required to access a published form. </i>

    Response Body: {
        "id": <string>,
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
      "access-token": <string>
    }

    Request Body: {
      "title": <string>
    }
    --
    Response Header: {
      "access-token": <string>
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
      "access-token": <string>
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
      "access-token": <string>
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
      "access-token": <string>
    }
    --
    Response Header: {
      "access-token": <string>
    }
