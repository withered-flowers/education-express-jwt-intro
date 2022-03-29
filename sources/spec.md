# Models

## Smartphone
name: String
price: Integer
qty: String
UserId: Integer (ref) User (UserId)

## User
username: String
password: String (hash bcrypt)