CREATE DATABASE nibbles;
CONNECT nibbles;
CREATE TABLE scores (
	id int NOT NULL auto_increment,
	record int NOT NULL ,
	PRIMARY KEY (id)
);
