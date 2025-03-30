# Inpogram

## Overview

This project is a modern blogging platform developed with React for the frontend and Spring Boot for the backend. It provides users with a platform to write, publish, and engage with articles.
![Home page](https://github.com/Inpogram/inpogram-fe/blob/main/public/images/home-page.png)
![Post details page](https://github.com/Inpogram/inpogram-fe/blob/main/public/images/post-details-page.png)

## Features

- **User Authentication:** Secure user registration and login using OAuth2 for seamless integration with popular providers like Google.
- **Rich Text Editing:** An intuitive editor for writing and formatting articles with support for text, images, and code blocks.
- **Responsive Design:** A modern and responsive UI ensuring a seamless experience across devices.
- **Social Interactions:** Users can like, comment, and share articles, fostering a vibrant community.
- **Content Storage:** Integration with AWS S3 for efficient and scalable storage of article images and media.

## Tech Stack

- **Frontend:** React, Redux
- **Backend:** Spring Boot
- **Database:** MySQL
- **Authentication:** OAuth2
- **Storage:** AWS S3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) for the frontend
- [Java](https://www.java.com/) and [Maven](https://maven.apache.org/) for the backend
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/haibt1112/inpogram
   cd inpogram
   ```

2. Set up the frontend:

   ```bash
   cd frontend
   npm install
   ```

3. Set up the backend:

   ```bash
   cd backend
   mvn install
   ```

4. Set up the database:
   ```bash
   cd database
   docker compose up
   ```

### Usage

1. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

2. Start the frontend:

   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. Access the application at [http://localhost:5173](http://localhost:5173)

## Development Status

This project is currently in development, and new features and improvements are actively being worked on.
