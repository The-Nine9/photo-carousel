CREATE DATABASE trulia;
\connect trulia;

DROP TABLE IF EXISTS listings;
-- DROP TABLE locations;
-- DROP TABLE images;
-- DROP TABLE users;
-- DROP TABLE favorites;

CREATE TABLE listings (
  id BIGSERIAL PRIMARY KEY,
  price BIGINT NOT NULL,
  roomCount INT NOT NULL,
  bathCount DECIMAL NOT NULL,
  sqft INT NOT NULL,
  userId BIGSERIAL,
  street VARCHAR(100) NOT NULL,
  neighborhood VARCHAR(50),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(50) NOT NULL,
  url VARCHAR(1000) NOT NULL
);

-- CREATE TABLE similarHomes (
--   home_id INT,
--   similar_id INT
-- );

-- CREATE TABLE locations (
--   id BIGSERIAL PRIMARY KEY,
--   street VARCHAR(100) NOT NULL,
--   unit VARCHAR(20),
--   neighborhood VARCHAR(50),
--   city VARCHAR(50) NOT NULL,
--   state VARCHAR(50) NOT NULL,
--   zip INT NOT NULL,
--   listingId BIGINT NOT NULL,
--   FOREIGN KEY(listingId)
--     REFERENCES listings(id
-- );

-- CREATE TABLE images (
--   id BIGSERIAL PRIMARY KEY,
--   url VARCHAR(1000) NOT NULL,
--   description VARCHAR(1000) NOT NULL,
--   listingId BIGINT NOT NULL,
--   FOREIGN KEY(listingId)
--     REFERENCES listings(id)
-- );

-- CREATE TABLE users (
--   id BIGSERIAL PRIMARY KEY,
--   username VARCHAR(100) NOT NULL,
--   password VARCHAR(255) NOT NULL,
-- );

-- CREATE TABLE FAVORITES (
--   id BIGSERIAL PRIMARY KEY,
--   userId BIGINT NOT NULL,
--   listingId BIGINT NOT NULL,
--   FOREIGN KEY(userId, listingId)
--     REFERENCES user(id) listings(id)
-- );

--change absolute path as necessary
COPY listings FROM '/home/twills/coding/HackReactor/sdc/photo-carousel/seeding/postgres/csvFiles/listings.csv'
  DELIMITER ','
  CSV HEADER;