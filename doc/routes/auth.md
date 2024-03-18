# Register
url: `/users/auth/register`
method: POST

input:
```
username: string, unique,
email: string, unique,
password: string (hashedPassword),
```

output:
if success, return the registered user info object.

# Login
url: `/users/auth/login`
method: POST

input:
```
email: string, unique,
password: string,
```

output:
if success, return the user info object.
