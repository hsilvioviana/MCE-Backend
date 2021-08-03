CREATE TABLE MC_Users (
id VARCHAR(64) PRIMARY KEY,
nickname VARCHAR(64) UNIQUE NOT NULL,
avatar VARCHAR(64),
email VARCHAR(64) UNIQUE NOT NULL,
phone VARCHAR(64) UNIQUE NOT NULL,
password VARCHAR(64) NOT NULL,
role ENUM("USER", "PERSONAL") DEFAULT "USER",
createdAt DATE NOT NULL,
updatedAt DATE NOT NULL
);

CREATE TABLE MC_ResetPasswordCodes (
id VARCHAR(64) PRIMARY KEY,
code VARCHAR(64) NOT NULL,
email VARCHAR(64),
createdAt DATE NOT NULL,
FOREIGN KEY (email) REFERENCES MC_Users(email)
);

CREATE TABLE MC_Appointments (
id VARCHAR(64) PRIMARY KEY,
date VARCHAR(64) NOT NULL,
canceledDate VARCHAR(64),
userId VARCHAR(64),
providerId VARCHAR(64),
FOREIGN KEY (userId) REFERENCES MC_Users(id),
FOREIGN KEY (providerId) REFERENCES MC_Users(id)
);

CREATE TABLE MC_Notifications (
id VARCHAR(64) PRIMARY KEY,
viewed BOOLEAN NOT NULL,
content VARCHAR(255),
receiverId VARCHAR(64),
createdAt VARCHAR(64),
FOREIGN KEY (receiverId) REFERENCES MC_Users(id)
);

CREATE TABLE MC_Schedules (
providerId VARCHAR(64) PRIMARY KEY,
sunday VARCHAR(64),
monday VARCHAR(64),
tuesday VARCHAR(64),
wednesday VARCHAR(64),
thursday VARCHAR(64),
friday VARCHAR(64),
saturday VARCHAR(64),
updatedAt DATE NOT NULL,
FOREIGN KEY (providerId) REFERENCES MC_Users(id)
);
