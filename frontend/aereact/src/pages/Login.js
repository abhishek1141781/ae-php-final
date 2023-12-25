import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import backgroundImage from '../img/exploring-the-depths-of-the-ocean-tzywgdcfc3c17gha.jpg'
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAuthUrlFromPHPBackend, fetchUserDataFromBackend, manualLoginUser } from "../servicesArea/user_service";
import { doLogin } from "../auth/authIndex";
import { useNavigate } from "react-router-dom";
// import userContext from "../context/userContext";

const Login = () => {

    // const userContextData = useContext(userContext)

    const navigate = useNavigate()

    let counter = 1;

    //destructuring
    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event, field) => {

        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    }

    const handleReset = () => {
        setLoginDetail({
            username: '',
            password: ''
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log(loginDetail)
        //validation
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("Recheck credentials")
            return;
        }

        //submit the data to the server
        manualLoginUser(loginDetail).then((respData) => {
            console.log("response.data from backend: ",respData)
            // console.log("pure response from backend: ",respData)
            // console.log("response.config.data from backend",respData)


        if (respData.dataFromBackend) {
                
                //save data to localStorage
            doLogin(respData, () => {
                console.log("full backend server response is saved to localStorage: ",respData)
                // console.log("login detail is saved to localStorage: ",respData)


                //redirect to user dashboard
                // userContextData.setUser({
                //     // data: data, // causes some editing bug
                //     data: data.user,
                //     login: true
                // })
                navigate("/user/dashboard")
                console.log("from UserDashboard: navigating to this page: /user/profile-info/"+respData.user_id);
                // navigate(`/user/profile-info/${respData.user_id}`)
                toast.success("login success")
            })
        }else{
            toast.error("Invalid credentials")
        }
            }).catch(error => {
                console.log(error)
                if (error.response.status === 400 || error.response.status === 404)
                    toast.error(error.response.data.message)
                else
                    toast.error("Something went wrong on server !!")
        })
    }

    const [authUrl, setAuthUrl] = useState('');

    useEffect(() => {
        // Fetch the authentication URL from the backend when the component mounts
        fetchAuthUrlFromPHPBackend()
            .then(data => {
                setAuthUrl(data.authUrl);
                // console.log("authUrl: ", authUrl.toString());
                // console.log("data: ", data);
            })
            .catch(error => {
                console.error('Error fetching authentication URL:', error);
            });
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    const handleGoogleLogin = () => {
        // Redirect the user to the fetched authentication URL
        window.location.href = authUrl;
    }


    // save user data to localStorage useEffect
    // When redirected back after Google OAuth, handle the response
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        // // Get all query parameters and create the final code string
        // const codeParams = Array.from(urlParams).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
        const code = urlParams.get('code');
        code && toast.warning("logging user... | Please Wait...")
        // const code1 = urlParams.get('code');
        // const scope2 = urlParams.get('scopte');
        // const authuser3 = urlParams.get('authuser');
        // const prompt4 = urlParams.get('prompt');

        // const code = "code="+code1+"&scope="+scope2+"&authuser="+authuser3+"&prompt="+prompt4

        console.log("redireccted to login, with code: ", code);
        // console.log("redireccted to login, with codeParams: ", codeParams);
        // console.log(code.charAt(5))


        // if (code.charAt(5)!=='n') {
        if (code) {
            // Check if the 'data' key exists in localStorage and is not empty
            // const existingData = localStorage.getItem('data');
            // if (!existingData) {

                // Send a request to your backend to handle the code and get user data
                fetchUserDataFromBackend(code)
                    .then(userData => {
                        console.log(`data: ${counter++} time: `,userData)
                        // if (!existingData) {
                            // Save user data to local storage
                            localStorage.setItem('data', JSON.stringify(userData));
                        // }
                        // Redirect to the frontend URL
                          window.location.href = 'http://localhost:3000/user/dashboard';
                    })
                    .catch(error => {
                        console.error('Error fetching user data from backend:', error);
                    });


        //     } else {
        //     console.log("'data' key in localStorage is not empty. Skipping user data save.");
        // }
        }
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    // console.log("after useEffect: counter: ",counter)








        // fetchAuthUrlFromPHPBackend()
        // .then(response => response.json())
        // .then(userdata => {
        //     // Save user data to local storage
        //     // localStorage.setItem('userdata', JSON.stringify(userdata));
            
        //     localStorage.setItem('data', JSON.stringify(userdata));

        //     // Redirect to the frontend URL
        //     window.location.href = 'http://localhost:3000/user/dashboard';
        // })
        // .catch(error => {
        //     console.error('Error fetching authentication URL:', error);
        // });








    // // write a useEffect which loads up every time this components loads, it should be doing the following functions
    // // fetch createAuthUrl from backend index.php code and set it so that when user clicks on "Login with Google" button it fires up the google oauth flow, whose logic is already written in the backend, just set the url to href of the "Login with Google" button
    // const handleGoogleLogin=()=>{
    //     fetchAuthUrlFromPHPBackend()
    //         .then(data => {
    //             setLoginDetail([

    //             ])
    //         })
    // }

    const cardStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'white',
        // filter: 'blur(0.5px)', // Apply a blur effect to the background image
        // opacity: '0.6', // Adjust the opacity for the glazed effect (0.8 for 80% opacity)
    };

    return (
        <Base>
            <div>
                <Container>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card className="custom-card mt-2" style={cardStyle}>
                                <CardHeader style={{ background: "grey" }}>
                                    <h3>Login Form!!!</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleFormSubmit}>
                                        {/* Email Field */}
                                        <FormGroup>
                                            <Label for="email">
                                                Enter Email
                                            </Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                placeholder="enter email here"
                                                value={loginDetail.username}
                                                onChange={(e) => handleChange(e, "username")}
                                            />
                                        </FormGroup>
                                        {/* Password Field */}
                                        <FormGroup>
                                            <Label for="password">
                                                Enter Password
                                            </Label>
                                            <Input
                                                type="password"
                                                placeholder="enter password here"
                                                id="password"
                                                value={loginDetail.password}
                                                onChange={(e) => handleChange(e, "password")}
                                            />
                                        </FormGroup>
                                        <Container className="text-center">
                                            <Button color="danger" outline onClick={handleReset}>Reset</Button>
                                            <Button color="dark" outline className="ms-2">Login</Button>

                                        </Container>

                                        <Container className="text-center">
                                            {/* Login with Google Button */}
                                            {authUrl && (
                                                    <Button color="warning" className="mt-2" onClick={handleGoogleLogin}>
                                                        Login with Google
                                                    </Button>
                                            )}
                                        </Container>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Base>
    )
}

export default Login;