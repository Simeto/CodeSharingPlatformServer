## Code Sharing Platform Server
```
  CSP uses the following technologies:
    1. Front-End
      - VueJS
      - Vuex
      - Bootstrap
      - SCSS
      - axios
    2. Back-End
      - NodeJS
      - Express
      - MongoDB
      - Mongoose
```
# The Project
```
A simple code-sharing platform that has two types of users - members and admins
Include:
  1. Authentication and Authorization
    - registration and login forms
    - Authentication on the Client and the Server which ensures that a user has logged in
      before being able to perform actions requiring authentication
    - Authorization on the Server which can protect the certain API endpoints
      # front-end - https://github.com/Simeto/CodeSharingPlatformUI
  2. Users (Members and Admins)
    2.1 Members
      - Can browse all shared snippets.
      - Can post code snippets.
      - Can like a snippet.
      - Can browse their personal snippets.
    2.2 Admins
      - Can browse all snippets.
      - Delete inappropriate ones if needed.
  3. Snippets
    - A single snippet consists of its code, the number of likes it has and a set of tags that categorize it.
    - Tags can be added or reused by users.
    - There cannot be two tags with the same name.
  4. Admin reports
    - The number of snippets per tag (e.g. AI(56), NodeJS(34))
    - The number of likes per tag

```

> An express.js project

## Build Setup

```bash
# install dependencies
npm install

# serve at localhost
npm start

# verification email setup
add provider, email and pass into config.mail.json5
```

#
