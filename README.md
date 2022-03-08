# Mong-net

## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Link](#link)

---

## Description

MongoDB / Mongoose based API for a social network using Express.js for routing.

[Video Demo](./mong-net_demo.mp4)

### User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

-   `git clone` this repository locally.
-   Run `npm i` to install all dependencies.

---

## Usage

When the application is installed, In the terminal input `npm run start` to initiate application. You can then make fetch requests to the routes below. <br/>
Alternatively, a demo has been deployed to [Heroku](https://spottr-projecttwo.herokuapp.com/)

---

### Models

#### **User**

-   `username`

    -   String
    -   Unique
    -   Required
    -   Trimmed
    -   RegEx Validated: `/^([\w\.-]){6,16}$/i`

-   `email`

    -   String
    -   Required
    -   Unique
    -   Must match a valid email address
    -   RegEx Validated: `/^([\w\.-]){6,16}$/i`

-   `thoughts`

    -   Array of `_id` values referencing the `Thought` model

-   `friends`

    -   Array of `_id` values referencing the `User` model (self-reference)

-   `friendCount`
    -   Virtual: retrieves the length of the user's `friends` array field

#### **Thought**

-   `thoughtText`

    -   String
    -   Required
    -   Must be between 1 and 280 characters

-   `createdAt`

    -   Date
    -   Set default value to the current timestamp
    -   Uses a getter method to format the timestamp on query as [MM/DD/YYYY]

-   `username` - Which user created this thought

    -   String
    -   Required

-   `reactions` _Defined below_

    -   Array of nested documents created with the `reactionSchema`

-   `reactionCount`
    -   Virtual: retrieves the length of the thought's `reactions` array field

##### **Reaction** _Schema_

-   `reactionId`

    -   ObjectId
    -   Default value is set to a new ObjectId

-   `reactionBody`

    -   String
    -   Required
    -   280 character maximum

-   `username`

    -   String
    -   Required

-   `createdAt`
    -   Date
    -   Set default value to the current timestamp
    -   Uses a getter method to format the timestamp on query as [MM/DD/YYYY]

### API Routes

#### User routes

##### **`/api/users`**

-   `GET`

    -   returns all users

-   `POST`
    -   creates a new user

```json
// example data
{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}
```

##### **`/api/users/:userId`**

-   `GET`

    -   returns a single user by its `_id` and populated thought and friend data

-   `PUT`

    -   updates a user by its `_id`

-   `DELETE`
    -   removes user by its `_id`

##### Friend routes

###### **`/api/users/:userId/friends/:friendId`**

-   `POST`

    -   adds a new friend to a user's friend list
    -   also adds the user to the friend's friend list

-   `DELETE`
    -   removes a friend from a user's friend list
    -   also removes the user from the friend's friend list

#### Thought routes

##### **`/api/thoughts`**

-   `GET`

    -   returns all thoughts

-   `POST`
    -   creates a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
    "thoughtText": "Another thought about things I had",
    "username": "tokidoki",
    "userId": "621152048bf711c0605e0e25"
}
```

##### **`/api/thoughts/:id`**

-   `GET`

    -   returns a single thought by its `_id`

-   `PUT`

    -   updates a thought by its `_id`

-   `DELETE`
    -   removes a thought by its `_id`

##### Reaction routes

###### **`/api/thoughts/:id/reactions`**

-   `POST`
    -   creates a reaction stored in a single thought's `reactions` array field

###### **`/api/thoughts/:id/reactions/:reactionId`**

-   `DELETE`
    -   removes a reaction by the reaction's `reactionId` value

---

## Link

[GitHub Repo](https://github.com/Rush0218/spottr)

---
