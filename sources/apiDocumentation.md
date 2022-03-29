## List of Available Endpoints

- GET /smartphones
- POST /smartphones
- GET /smarphones/:smartphoneId

### GET /smartphones

#### Response

200 - OK

Body

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": Integer,
      "name": String
    },
    ...
  ]
}

```

### POST /smarphones

#### Response

201 - Created

```json
{
  "statusCode": 201,
  "data": {
    "id": Integer,
    "name": String,
    "price": Integer,
    "qty": Integer,
    "UserId": Integer,
    "updatedAt": Date,
    "createdAt": Date
  }
}
```

### GET /smarphones/:smartphoneId

#### Response

200 - OK

Body

```json
{
  "statusCode": 200,
  "data": {
    "id": Integer,
    "name": String,
    "price": Integer,
    "qty": Integer,
    "UserId": Integer
  }
}
```