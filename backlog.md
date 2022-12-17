## E3

- The current storage mechanism isn't scaling with our growth; replace it with a proper data store and access patterns. Please feel free to use whichever ORM or data mapper libraries you'd prefer. 
- Implement a database migration tool. Please feel free to use whichever library you'd prefer.
- Containerize the application using Docker.
- Add UUIDs as the primary key to the database tables and update the CRUD endpoints to use these instead of the integer primary keys.
- Add a small auth middleware in front of the endpoints that authorizes access using api keys. Return a 403 status if the api keys are incorrect or missing. Api keys don’t need to be stored anywhere. This can be a simple string comparison on static values.
- If a list budget items endpoint does not exist, create that endpoint. Add pagination and basic filtering support to that endpoint.
- _blocked by the above ticket_ – Add pagination and filtering support to the UI.
