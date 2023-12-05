-- Active: 1701736461984@@dpg-cln6v7oapebc73f5mrqg-a.oregon-postgres.render.com@5432@test_uni

create table
    users (
        user_name varchar(30) PRIMARY key,
        name VARCHAR(50),
        email VARCHAR(70) UNIQUE,
        password VARCHAR(30),
        profile_picture bytea,
        is_active BOOLEAN DEFAULT true,
        created_date TIMESTAMP DEFAULT current_timestamp,
        update_date TIMESTAMP
    );

SELECT * FROM tweets;

create table
    tweets (
        id SERIAL PRIMARY key,
        titulo VARCHAR(50),
        description varchar(200),
        img bytea,
        create_date TIMESTAMP default current_timestamp,
        user_name varchar(30) REFERENCES users (user_name)
    );