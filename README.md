# Photography Portfolio
This app using MEN stack, MySQL as database, Express.js as web application framework, and Node.js as runtime environment

## Prepare to Battle
Make sure you already have Node.js and MySQL in your local machine and then clone the repo.

### Install Depedency in package.json
```sh
npm install
```

### Setup the database
- Create new database
```sh
CREATE DATABASE fpwp;
use fpwp
```

- Create admin table
```sh
CREATE TABLE `admin` (
`id` int NOT NULL AUTO_INCREMENT,
`username` varchar(25) NOT NULL,
`password` varchar(30) NOT NULL,
PRIMARY KEY (`id`)
);
```

- Add an admin
```sh
INSERT INTO admin (username, password)
VALUES
('admin', 'admin');
```

- Create portfolio table
```sh
CREATE TABLE `portfolio` (
`id` int NOT NULL AUTO_INCREMENT,
`title` varchar(50) NOT NULL,
`description` text NOT NULL,
`thetime` datetime DEFAULT NOW() NOT NULL,
`image1` varchar(100) DEFAULT NULL,
`image2` varchar(100) DEFAULT NULL,
`image3` varchar(100) DEFAULT NULL,
PRIMARY KEY (`id`)
);
```

## Using the app
Finally after setup all stuff above, you can run it in your localhost

### Run the app in the air
```sh
node app.js
```
It will automatically run in localhost with port 3000 (localhost:3000)

### Add a portfolio
You can access route ```/admin```, and it will redirect to ```/login```. Just login and you will be able to Add, Delete, Edit the portfolio

