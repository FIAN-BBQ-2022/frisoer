DROP DATABASE IF EXISTS barbershop;
CREATE DATABASE barbershop;
USE barbershop;
CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       role ENUM('admin', 'customer', 'barber') NOT NULL,
                       name VARCHAR(45) NOT NULL UNIQUE,
                       firstName VARCHAR(45) NOT NULL,
                       lastName VARCHAR(45) NOT NULL,
                       telephone VARCHAR(45) NOT NULL,
                       workStart VARCHAR(45),
                       workEnd VARCHAR(45),
                       password VARCHAR(255) NOT NULL
);
CREATE TABLE appointments (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              slotStart DATETIME NOT NULL,
                              slotEnd DATETIME NOT NULL,
                              barber_id INT NOT NULL,
                              user_id INT NOT NULL,
                              FOREIGN KEY(barber_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                              FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'admin', 'admin1', 'Hans-Werner', 'Kahlbohm', '08141453315', NULL, NULL, 'admin1');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer1', 'Thies', 'Schönwälder', '06838283528', NULL, NULL, 'customer1');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer2', 'Anita', 'Epple', '0281807502', NULL, NULL, 'customer2');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer3', 'Sonja', 'Cassirer', '07221310501', NULL, NULL, 'customer3');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer4', 'Erwin', 'Hollmann', '02747137730', NULL, NULL, 'customer4');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer5', 'Elena', 'Mezger', '06831602754', NULL, NULL, 'customer5');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer6', 'Irma', 'Berentelg', '06333270066', NULL, NULL, 'customer6');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer7', 'Florian', 'Hertz', '02655265108', NULL, NULL, 'customer7');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer8', 'Karla', 'Nicolaus', '08452138953', NULL, NULL, 'customer8');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'customer', 'customer9', 'Leonard', 'Pakuscher', '06241283449', NULL, NULL, 'customer9');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'barber', 'barber1', 'Alpha', 'Andy', '0541117929', '08:00', '16:00', 'barber1');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'barber', 'barber2', 'Beta', 'Bea', '07729658764', '08:00', '16:00', 'barber2');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'barber', 'barber3', 'Cindy', 'Crawford', '06394919723', '09:00', '17:00', 'barber3');
INSERT INTO users (id, role, name, firstName, lastName, telephone, workStart, workEnd, password) VALUES (NULL, 'barber', 'barber4', 'Dicke', 'Donna', '02351753407', '09:00', '17:00', 'barber4');

INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-21 11:00:00', '2023-02-21 11:30:00', 14, 12);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-21 12:00:00', '2023-02-21 12:30:00', 12, 13);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-21 15:00:00', '2023-02-21 15:30:00', 11, 14);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-21 09:00:00', '2023-02-21 09:30:00', 11, 2);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-21 11:00:00', '2023-02-21 12:00:00', 12, 3);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-22 14:30:00', '2023-02-22 15:00:00', 13, 4);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-22 15:30:00', '2023-02-22 16:00:00', 14, 5);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-23 10:30:00', '2023-02-23 11:30:00', 13, 6);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-23 12:00:00', '2023-02-23 12:30:00', 12, 7);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-24 15:00:00', '2023-02-24 16:00:00', 11, 8);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-24 15:00:00', '2023-02-24 16:00:00', 13, 9);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-25 15:00:00', '2023-02-25 16:00:00', 12, 10);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-25 09:00:00', '2023-02-25 09:30:00', 14, 11);

INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-28 11:00:00', '2023-02-28 11:30:00', 14, 12);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-02-28 12:00:00', '2023-02-28 12:30:00', 12, 13);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-01 15:00:00', '2023-03-01 15:30:00', 11, 14);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-01 09:00:00', '2023-03-01 09:30:00', 11, 2);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-02 11:00:00', '2023-03-02 11:30:00', 12, 3);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-02 14:30:00', '2023-03-02 15:30:00', 13, 4);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-03 15:30:00', '2023-03-03 16:30:00', 14, 5);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-03 10:30:00', '2023-03-03 11:00:00', 13, 6);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-03 12:00:00', '2023-03-03 12:30:00', 12, 7);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-03 15:00:00', '2023-03-03 15:30:00', 11, 8);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-04 15:00:00', '2023-03-04 15:30:00', 13, 9);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-04 15:00:00', '2023-03-04 15:30:00', 12, 10);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-04 09:00:00', '2023-03-04 09:30:00', 14, 11);

INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-07 11:30:00', '2023-03-07 12:30:00', 14, 12);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-07 13:00:00', '2023-03-07 13:30:00', 12, 13);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-08 15:30:00', '2023-03-08 16:00:00', 11, 14);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-08 09:00:00', '2023-03-08 09:30:00', 11, 2);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-09 12:00:00', '2023-03-09 12:30:00', 12, 3);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-09 15:30:00', '2023-03-09 16:00:00', 13, 4);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-10 15:30:00', '2023-03-10 16:30:00', 14, 5);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-10 10:00:00', '2023-03-10 10:30:00', 13, 6);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-10 12:00:00', '2023-03-10 12:30:00', 12, 7);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-10 14:00:00', '2023-03-10 14:30:00', 11, 8);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-11 12:00:00', '2023-03-11 12:30:00', 13, 9);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-11 13:00:00', '2023-03-11 14:30:00', 12, 10);
INSERT INTO appointments (id, slotStart, slotEnd, barber_id, user_id) VALUES (NULL, '2023-03-11 09:00:00', '2023-03-11 09:30:00', 14, 11);

SELECT * FROM users;
SELECT * FROM appointments;
use barbershop;