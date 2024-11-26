# Home Service Application

Welcome to the **Home Service Application**, a comprehensive solution designed to connect customers with various home service providers. Built using **React Native with Expo**, **Hygraph**, **MongoDB**, and **Clerk Authentication**, the app provides a seamless experience for users to book and manage home services effortlessly.

---

## Features

- **User-friendly Interface**: Intuitive and easy-to-navigate UI for customers and service providers.
- **Customer and Provider Panels**: Separate panels for customers to book services and for providers to manage their profiles and receive notifications.
- **Secure Authentication**: Integrated with Clerk authentication for secure sign-in, sign-up, and Google OAuth.
- **Real-time Booking and Management**: Customers can select services, set preferences, and schedule appointments.
- **Responsive Design**: Adaptable to various screen sizes for a consistent experience across devices.
- **Hygraph Integration**: Data storage and real-time updates powered by GraphQL.
- **MongoDB**: A robust backend database to securely store user data, service details, and bookings.
- **Axios**: Used for efficient and reliable API communication between the app and the backend.

---

## Demonstration of Project

| **Screenshot**                                                                            | **Description**                                                                                       |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/15496770-84aa-446b-9c00-8363681225ff" style="width:100%; height: auto; max-height: 800px;"> | **Select User Type**: Allows users to choose between being a customer or an employee |
| <img src="https://github.com/user-attachments/assets/e95ad838-bb84-45cd-9e23-a73b8987a976" style="width:100%; height: auto; max-height: 800px;"> | **Customer Login**: Secure login screen for customers                                |
| <img src="https://github.com/user-attachments/assets/dbfbf901-feb8-472d-aba0-40bef1bfc5ea" style="width:100%; height: auto; max-height: 800px;"> | **Google OAuth Authentication**: Customers can log in using their Google accounts    |
| <img src="https://github.com/user-attachments/assets/326337f3-1c41-4925-a295-b5716f7346f6" style="width:100%; height: auto; max-height: 800px;"> | **Home Screen**: Features an offer slider, categories, and employee lists            |
| <img src="https://github.com/user-attachments/assets/73bf3b80-c5c3-45cf-972b-181dab79a3b4" style="width:100%; height: auto; max-height: 800px;"> | **Categories List**: View different service categories                               |
| <img src="https://github.com/user-attachments/assets/bff131da-506f-4b3d-b3b8-798427ba73e2" style="width:100%; height: auto; max-height: 800px;"> | **Service List**: Detailed service offerings in selected categories                  |
| <img src="https://github.com/user-attachments/assets/2fc6b32f-9daa-4530-aad5-1ae95f2fb5e7" style="width:100%; height: auto; max-height: 800px;"> | **Specific Service Details**: Comprehensive details about a chosen service           |
| <img src="https://github.com/user-attachments/assets/02c50f0f-304b-4005-86d5-c8c13082a4bd" style="width:100%; height: auto; max-height: 800px;"> | **Employee Details**: Information about the employee providing the service           |
| <img src="https://github.com/user-attachments/assets/1332ff01-22c0-40d8-ab88-42268b3fcfff" style="width:100%; height: auto; max-height: 800px;"> | **Date & Time Selection**: Users can select their preferred appointment time         |
| <img src="https://github.com/user-attachments/assets/efad58c4-131f-4a52-b7ac-ab4d64ea4ba5v" style="width:100%; height: auto; max-height: 800px;"> | **Booking Confirmation**: A toast message confirms successful bookings               |
| <img src="https://github.com/user-attachments/assets/dc66dc83-0359-444e-a249-94ed42fe1761" style="width:100%; height: auto; max-height: 800px;"> | **Booking Details**: Displays confirmed booking details for the user.                |
| <img src="https://github.com/user-attachments/assets/ae066c1b-f821-448d-9ccc-5d8ecb5c1578" style="width:100%; height: auto; max-height: 800px;"> | **Feedback Detail**: Users can leave feedback for completed services                 |
| <img src="https://github.com/user-attachments/assets/5ddf8be2-ea94-47b6-8f5e-4a6fdcbb6cec" style="width:100%; height: auto; max-height: 800px;"> | **Cancel Detail**: Users can review cancellation details before proceeding           |
| <img src="https://github.com/user-attachments/assets/67e8b6a6-b8f7-42d0-a9af-671ec0d0cbde" style="width:100%; height: auto; max-height: 800px;"> | **Add User Details**: Allows users to add or edit their profile information          |
| <img src="https://github.com/user-attachments/assets/59174307-13f2-44fc-a24c-381638fd5e53" style="width:100%; height: auto; max-height: 800px;"> | **Employee Login**: Secure login screen for employees                                |
| <img src="https://github.com/user-attachments/assets/49ea41a4-3583-439c-aa33-83ea2833ec12" style="width:100%; height: auto; max-height: 800px;"> | **Employee Register**: Registration form for new employees                           |
| <img src="https://github.com/user-attachments/assets/2bb0b058-3147-4670-917a-9f07eb2863b4" style="width:100%; height: auto; max-height: 800px;"> | **Logged-in Employee Home**: Employee dashboard showing relevant tasks               |
| <img src="https://github.com/user-attachments/assets/3ca55fa0-a652-459f-9f12-251de6d50d5f" style="width:100%; height: auto; max-height: 800px;"> | **Job Apply Screen**: Employees can apply for available jobs                         |
| <img src="https://github.com/user-attachments/assets/9d21e825-e662-443b-a7b7-25153c27a7a6" style="width:100%; height: auto; max-height: 800px;"> | **User Booking Details**: View all bookings associated with a user                   |
| <img src="https://github.com/user-attachments/assets/c7f6a4fd-a17e-4bf3-a39f-4724f96d68ed" style="width:100%; height: auto; max-height: 800px;"> | **Manage Bookings**: Employees can cancel or mark bookings as completed              |

---

## Database Structure

| **Screenshot**                                                                                                  | **Description**                              |
|-----------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| <img src="https://github.com/user-attachments/assets/084abaf8-dd4a-4326-a608-53948ddc7995" height="100%" width="100%">      | **Overview**: General structure of the app’s database. |
| <img src="https://github.com/user-attachments/assets/7dc2ebb5-f4d8-4056-8922-c6862df96f03" height="100%" width="100%">      | **Bookings Table**: Tracks customer bookings. |
| <img src="https://github.com/user-attachments/assets/d091751d-dca1-456b-bdd0-16ab05fef558" height="100%" width="100%">      | **Users Table**: Stores user profile data.    |
| <img src="https://github.com/user-attachments/assets/5d19fedf-2d14-489a-ac91-2d00b90aa79f" height="100%" width="100%">      | **Mongo DB**: Stores Employees profile data.    |

---


