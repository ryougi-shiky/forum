# Update
url: `/users/update/:id`
method: PUT

input:
```
username: string, unique,
email: string, unique,
password: string (hashedPassword),
```

output:
if success, return the registered user info object.
