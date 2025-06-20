## Taskso Server

This is simple task management system build with Express.js, Node.js, TypeScript, MongoDB with Mongoose and many more technology like JWT, Bcrypt for hashing and encrypting.

---



## 📑 Table of Contents

- [🧰 Tech Stack](#tech-stack)
- [⚙️ Installation](#installation)
- [🚀 API Endpoints](#api-endpoints)
  - [🔐 Auth](#auth)
  - [👤 User](#user)
  - [✅ Task](#task)
- [✅ Response and Error](#response-and-error)




## Tech Stack

| Technology      | Description                   |
|-----------------|-------------------------------|
| Node.js         | JavaScript runtime            |
| Express.js      | Web framework                 |
| TypeScript      | Ensuring advance type safety                 |
| MongoDB         | NoSQL Database                |
| Mongoose        | ODM for MongoDB               |
| JSON Web Token  | Authentication (JWT)          |
| Bcrypt  | Hashing and securing password          |
| Cors  | Resource sharing and origin manage          |
| Multer          | File Upload Middleware        |
| Cloudinary          | Host image and file        |
| Zod             | Validation Library            |
| Postman         | API Testing & Documentation   |

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/md-maruf-billa/taskso-server.git
   
   cd taskso-server
   ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Create .env file:**
    ```javaScript
    PORT="your value"
    DB_URL="your value"
    JWT_ACCESS_SECRET="your value"
    NODE_ENV="your value"
    SOLD_ROUND="your value"
    APP_PASSWORD="your value"
    SENDER_EMAIL="your value"
    FRONT_END_URL="your value"
    JWT_RESET_SECRET="your value"
    CLOUD_NAME="your value"
    CLOUD_API_KEY="your value"
    CLOUD_SECRET="your value"
    ```
4. **Run Server:**
    ```bash
    npm run dev
    ```

## API Endpoints
Base URL: http://localhost:5000/api

- Test Route response:

    ```json
    {
        "success":true,
        "message":"Server is working fine!!",
        "data":
            {
                "ip":"::ffff:127.0.0.1",
                "device":{
                    "browser":"Firefox",
                    "version":"139.0",
                    "os":"Windows 10.0",
                    "platform":"Microsoft Windows",
                    "geoIp":{},
                    "source":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0",
                    "isWechat":false
                }
            }
    }
    ```



### Auth
| Method | Endpoint                | Description       |Headers| Body Params                                          |
| ------ | ----------------------- | ----------------- |-------| ---------------------------------------------------- |
| POST   | `/auth/register`        | Register new user |❌| `name`, `email`, `password`                          |
| POST   | `/auth/login`           | Login user        |❌| `email`, `password`                                  |
| POST   | `/auth/forget-password` | Send reset email  |❌| `email`                                              |
| PATCH  | `/auth/change-password` | Change password   |✅ Authorization| `oldPassword`, `newPassword`  |



### User
| Method | Endpoint               | Description      | Headers  | Body                                 |
| ------ | ---------------------- | ---------------- | ------------------| -------------------------------------- |
| GET    | `/user/me`             | Get current user | ✅ Authorization  |                             |
| PATCH  | `/user/update-profile` | Update profile   | ✅ Authorization  | Form Data:`image` (file), `data` (JSON string) |


### Task

| Method | Endpoint                      | Description        | Required Data                                    |
| ------ | ----------------------------- | ------------------ | ------------------------------------------------ |
| POST   | `/task/create`                | Create new task    | `taskName`, `category`, `description`, `dueDate` |
| GET    | `/task/all`                   | Get all tasks      | Header: `Authorization`          |
| PATCH  | `/task/update/:taskId`        | Update task        | JSON: Partial task fields                        |
| PATCH  | `/task/change-status/:taskId` | Change task status | `status` (e.g., `Pending`, `Ongoing`, `Done`)    |
| DELETE | `/task/delete/:taskId`        | Delete task        | Header: `Authorization`          |



### Response and Error
- #### ✅ Success Response
    ```json
    {
        "success": boolean,
        "message": string,
        "data": any,
    }
    ```
- #### ❌ Error Response
    ```json
    {
        "success": boolean,
        "message": Exact Message,
        "errorSources": [
                {
                    "path": Error Path,
                    "message": Error Message
                }
            ],
        "err": {
            "statusCode": Error Status code
             },
        "stack": Error Stack
    }
    ```



If you have any queries, please email me at [dev.abumahid@gmail.com](mailto:dev.abumahid@gmail.com)
