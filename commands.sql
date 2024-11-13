CREATE TABLE blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT null,
  title text NOT null,
  likes int DEFAULT 0
);

insert into blogs (author, url, title) values
                  ('Dan Abramov', 'www.da.com', 'On let vs const');

insert into blogs (author, url, title) values
                  ('Laurenz Albe', 'www.la.com', 'Gaps in sequences in PostgreSQL');