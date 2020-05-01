CREATE TABLE items (
id SERIAL PRIMARY KEY,
itemnumber VARCHAR(1000) NOT NULL,
itemname VARCHAR(100) NOT NULL,
amount INT NOT NULL
);

INSERT INTO items (itemnumber, itemname, amount) VALUES (1, 'bread', 10);
INSERT INTO items (itemnumber, itemname, amount) VALUES (2, 'meat', 20);

SELECT * FROM items;

DROP TABLE items;