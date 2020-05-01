CREATE TABLE items (
id SERIAL PRIMARY KEY,
itemname VARCHAR(100) NOT NULL,
amount INT NOT NULL
);

INSERT INTO items (itemname, amount) VALUES ('bread', 10);
INSERT INTO items (itemname, amount) VALUES ('meat', 20);

SELECT * FROM items;

DROP TABLE items;