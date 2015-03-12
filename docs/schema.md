# Schema Information

## feeds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
url         | string    | not null
title       | string    | not null
user_id     | integer   | not null, foreign key
image       | string    |

## entries
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
feed_id     | integer   | not null, foreign key
title       | string    | not null
link        | string    | not null
published   | datetime  | not null
image       | string    |

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
entry_id    | integer   | not null, foreign key

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_name       | integer   | not null, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
