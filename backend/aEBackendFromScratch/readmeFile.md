GPT links:
https://chat.openai.com/share/ab8f5aca-07dd-4a27-96b3-e5aa7c3742a9
https://chat.openai.com/share/3d0a4a00-672c-42ba-9d6e-dc8f2a112c94


does anyone know oauth flow here, I yes then please tell me how do I achieve this

User Clicks "Login with Google" button at react front end and the button fires the oauth flow as the button has the authUrl in it's href, assigned from the url created at createAuthUrl() function at the php bakcend

1. I'm handling all oauth logic at php backend
2. But I want to log in the user at react frontend by saving the data of the user who clicked the button "Login with Google" in the localstorage of the browser

Now the logical handicap that I'm facing is how do I achieve both from the backend script as I can do only one thing at a time:
    a) either I can redirect to the frontend url http://localhost:3000/user/dashboard(REACT FRONTEND) but then how do I communicate to the user/dashboard page which user is to be logged in there as at no time up until now any userData JSON has been sent to frontend
    
    OR
    
    b) I sent/echo json to frontend, but at this point I'm handling oauth logic at backend, so there is no frontend page to recieve the JSON object

    SINCE

    there is no mechanism to send JSON to a redirected page simultaneously, is there, if such a thing is possible then this issue will be solved

    I know there is another way to solve this problem if you know how please let me know, I hope you "got the exact problem that I'm talking about"