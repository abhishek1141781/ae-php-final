# Previously used Redirect URIs in Google cloud consoles
    http://localhost:8000/auth/autoSignupLoginOauth.php
    http://localhost:8000/theCodeCity/login.php
    http://localhost:8000/welcome.php


#    Type of Redirect URI errors
1. 
```log
Access blocked: This app’s request is invalid
You can’t sign in because this app sent an invalid request. You can try again later, or contact the developer about this issue. Learn more about this error
If you are a developer of this app, see error details.
Error 400: redirect_uri_mismatch


You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy.

If you're the app developer, register the redirect URI in the Google Cloud Console.
Request details: access_type=online approval_prompt=auto response_type=code redirect_uri=http://localhost:8000/welcome.php client_id=727755570536-rp85pdutn7k05uh71jeg3mejo4v08h3g.apps.googleusercontent.com scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid
```

2. 
```log






```
