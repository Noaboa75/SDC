

DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Characteristics;
DROP TABLE IF EXISTS Characteristic_reviews;
DROP TABLE IF EXISTS Reviews_Photos;

CREATE TABLE Reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT '0',
  date_made BIGINT NULL DEFAULT '0',
  summary VARCHAR(255) NOT NULL DEFAULT '',
  body VARCHAR(1000) NOT NULL DEFAULT '',
  recommend BOOLEAN NULL DEFAULT false,
  reported BOOLEAN NULL DEFAULT false,
  reviewer_name VARCHAR(255) NOT NULL DEFAULT '',
  reviewer_email VARCHAR(255) NOT NULL DEFAULT '',
  response VARCHAR(1000) DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT '0'
);

CREATE TABLE Reviews_Photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL DEFAULT NULL,
  url VARCHAR(1000) DEFAULT NULL
);

CREATE TABLE Characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL,
  characteristic_name VARCHAR(20) NOT NULL DEFAULT ''
);

CREATE TABLE Characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL DEFAULT NULL,
  review_id INTEGER NOT NULL DEFAULT NULL,
  value INTEGER NOT NULL DEFAULT NULL
);


COPY Reviews FROM '/Users/noahclouthier/downloads/reviews.csv' CSV HEADER DELIMITER ',';
COPY Characteristics FROM '/Users/noahclouthier/downloads/characteristics.csv' CSV HEADER DELIMITER ',';
COPY Characteristic_reviews FROM '/Users/noahclouthier/downloads/characteristic_reviews.csv' CSV HEADER DELIMITER ',';
COPY Reviews_photos FROM '/Users/noahclouthier/downloads/reviews_photos.csv' CSV HEADER DELIMITER ',';

CREATE INDEX idx_reviews_product_id ON Reviews(product_id);
CREATE INDEX idx_reviews_photos_review_id ON Reviews_photos(review_id);
CREATE INDEX idx_characteristics_product_id ON Characteristics(product_id);
CREATE INDEX idx_characteristic_reviews_characteristic_id ON Characteristic_reviews(characteristic_id);
CREATE INDEX idx_characteristic_reviews_review_id ON Characteristic_reviews(review_id);
