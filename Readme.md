# codewars

## overview

> A platform where you can solve interesting problems with support of most popular languages like **c++** ,  **java** and **python**.
> Dashboard to track number of problems solved by rating.
> Piechart to analyse how often you make mistakes.

## installation

step 1 : Clone the repository

```sh
git clone https://github.com/Developerganesh01/CodeWars
```

step 2 : Set up backend server

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

1. Create a `.env` file:

   ```sh
   touch .env
   vim   .env
   ```

1. Copy the following environment variables into the .env file. Replace **<Database_name>**,**<Database_username>**,
**<Database_password>**, and **<Secret_key>** with your actual values:

    * **<Database_password>** is password of **<Database_username>**, also make sure given user have **read and write access**
    * **<Secret_key>** this is secret key used in jsonweb token

   ```sh
   PORT=4000
   MONGODB_STRING=mongodb+srv://<Database_username>:<Database_password>@cluster0.yc1drxa.mongodb.net/<Database_name>?retryWrites=true
   w=majority&appName=Cluster0
   MONGODB_USER=<Database_username>
   MONGODB_PASSWORD=<Database_password>
   SECRET_KEY=<Secret_key>
   ORIGIN=http://localhost:3000
   ```

1. Start backend server:

   ```sh
   node server.js
   ```

step 3 : Set up frontend server

1. Navigate to the frontend folder:

   ```sh
   cd ../frontend
   ```

1. Install the dependencies:

   ```sh
   npm install
   ```

1. Start the frontend server:

   ```sh
   npm start
   ```

## Usage

1. **Login/Signup**: Create an account or log in to Codewars

   ![signup](https://github.com/Developerganesh01/CodeWars/assets/137500512/9ec552aa-e986-40df-99f0-9614ca099b8d)
   ![login](https://github.com/Developerganesh01/CodeWars/assets/137500512/b312da4d-f4a4-423d-a74b-dc30a777bfbe)

1. **Home**: Problems are displayed on this page

   ![home](https://github.com/Developerganesh01/CodeWars/assets/137500512/67d477e2-6132-4f85-b61e-e289baa7fffb)

1. **Submission**:You can see your subission list along with verdict

   ![submissionpage](https://github.com/Developerganesh01/CodeWars/assets/137500512/50ce1398-5b86-437e-967f-c84fb7aa2ecd)

1. **particularsubmission**:To see a particularsubmission

   ![particularsubmission](https://github.com/Developerganesh01/CodeWars/assets/137500512/e386cd7d-696e-48c8-83b6-77ae262e64a8)

1. **Dashboard**:Dashboard to see overall performance

   ![Dashboard1](https://github.com/Developerganesh01/CodeWars/assets/137500512/bcf8c056-b696-432b-ad8c-602276feef63)

1. **Run**:here is how you test your code
   * On home click on any problem and run testcase by coping inputs and paste in testcase section as shown below :⬇️
   * Result for inputs will be shown in TestResult, to see hit run button
   * Then click on submit to check whether your code is correct or not

   ![testcaseresult](https://github.com/Developerganesh01/CodeWars/assets/137500512/099bd83c-4d6d-45a3-96b0-787844c2e6d3)

1. **Submit**:Click on submit, then hidden testcases will run and verdicts of testcases are shown in testresult box as shown ⬇️

   ![testsubmit](https://github.com/Developerganesh01/CodeWars/assets/137500512/3b6bbd7e-d0ea-4e3a-932f-fb673ff7c550)

1. **Create**:If you are problemsetter then you will be able to see floating button on bottom left corner

   ![create](https://github.com/Developerganesh01/CodeWars/assets/137500512/6a0ad92f-4d21-4111-b99f-b6ff74fb628d)

1. **Add problem and Testcases**:Add all details about problem and testcases
   * Add detais about problem first
   * After adding problem successfully,there is fill problem id button click on it, you will get Pid,then add details about testcase
     then click on add testcase

   ![add problem](https://github.com/Developerganesh01/CodeWars/assets/137500512/76aae25e-bea6-47da-b08a-b74c7c13ea64)

## High-Level Design

 For deeply understanding the project architecture and design, refer to [High-level Design Document](https://drive.google.com/drive/folders/1wi134FmKUlJ1E_SgqT5Uq6GbI-Hs3NVR?usp=sharing)

## Video Overview

Check out our project overview video on Loom.ai to see how Codewars works in action:
[Watch Project Overview](https://www.loom.com/share/129235aa987b4196954d7ba723a5b890?sid=57b80bd7-a0bb-48b7-ba73-69d3a4651fee)

## Contact

For any questions or support regarding Codewars, please feel free to reach out to us via email at <ganeshsm466@gmail.com>

## Acknowledgments

Codewars acknowledges and thanks the following open-source projects that contribute to its functionality:

* [React](https://react.dev/)
* [Node.js](https://nodejs.org/en)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
