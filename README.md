Instruction to start local development.

1. On a terminal tab run: `npm run emulators`
2. Open a window tab with : `http://localhost:4000/`

How create a new mock user?

1. From postman make POST to: `http://localhost:5000/users/new`
   The success response should return an object like this:
   `{ "status": 200, "payload": "qnfa2qjx7td5fg7ysk43n" }`
   The payload will contain anew random generated id.
   Note:Under functions/utils/\_data.js you will find a mock user data.
