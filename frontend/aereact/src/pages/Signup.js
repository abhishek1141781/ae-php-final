import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, FormFeedback, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import backgroundImage from '../img/tetris-multicolored-pattern-4u7ed6koskqhcez1.jpg'
import React, { useEffect, useState } from "react";
import { fetchAuthUrlFromPHPBackend, fetchUserDataFromBackend, manualSignUp } from "../servicesArea/user_service";
import { toast } from "react-toastify";

const Signup = () => {

    







    // store data entered in the form
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    // store errors
    const [error, setError] = useState({
        errors: {},
        isError: false
    })








    // //call console.log() once data changes : JUST FOR TESTING
    // useEffect(() => {
    //     console.log(data)
    // }, [data])










    // Handle change for all input fields
    const handleChange = (event, property) => {

        //dynamically setting values using property
        setData({ ...data, [property]: event.target.value })

        // Clear validation error for the specific field when it's being edited
        setError({ ...error, errors: { ...error.errors, [property]: null } });
    }











    //Reset the form
    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: ''
        });
        setError({ errors: {}, isError: false });
        // <FormFeedback>
        //     {error.errors?.response?.data?.name}
        // </FormFeedback>
    }














    //submitForm and call server api for sending data
    const submitForm = (event) => {
        event.preventDefault();

        // if (error.isError) {
        //     toast.error("Form details invalid")
                setError({...error, isError: false });

        //     return;
        // }
        console.log(data);

        //data validate

        //call server api for sending data
        manualSignUp(data).then((resp) => {

            console.log("JSON.parsed response.data.data.user_data from response in user_service: ",resp)
            console.log("success log")
            // setError({...error,isError:false,errors:''})
            // toast.success("user is registered successfully !! User email: " + resp.email);
            toast.success("user is registered successfully !! User ID: " + resp.user_id);
            // resetData();
            setData({
                name: '',
                email: '',
                password: ''
            })
            window.location.href = 'http://localhost:3000/login';
            
        }).catch((error) => {
            console.log(error)
            console.log("Error log")
            //handle errors in proper way of backend
            setError({
                errors: error,
                isError: true
            })
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

        const code = urlParams.get('code');

        console.log("redireccted to login, with code: ", code);


        if (code) {
                // Send a request to your backend to handle the code and get user data
                fetchUserDataFromBackend(code)
                    .then(userData => {
                            // Save user data to local storage
                            localStorage.setItem('data', JSON.stringify(userData));
                        // }
                        // Redirect to the frontend URL
                          window.location.href = 'http://localhost:3000/user/dashboard';
                    })
                    .catch(error => {
                        console.error('Error fetching user data from backend:', error);
                    });
        }
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts






    // Formatting the website logo
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
            <Container>
                <Row className="mt-4 mb-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card className="custom-card" style={cardStyle} inverse>
                            <CardHeader style={{ border: "2px", background: "teal" }}>
                                Fill information to register
                            </CardHeader>
                            <CardBody >
                                {/* creating form */}
                                <Form onSubmit={submitForm}>




                                    {/* Name Field */}
                                    <FormGroup>
                                        <Label for='name'>Enter Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter here"
                                            id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            // using null safe, as in if a property doesn't have any value and if we still try to find something in it it'll break the code
                                            invalid={error.errors?.response?.data?.name ? true : false}
                                        // invalid={true}
                                        />
                                        <FormFeedback invalid>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>

                                    </FormGroup>






                                    {/* Email Field */}
                                    <FormGroup>
                                        <Label for='email'>Enter Email ID</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter email here"
                                            id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}
                                            invalid={error.errors?.response?.data?.email ? true : false}
                                        />
                                        <FormFeedback invalid>{error.errors?.response?.data?.email}</FormFeedback>
                                    </FormGroup>


                                    {/* Password Field */}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter password here"
                                            id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid={error.errors?.response?.data?.password ? true : false}
                                        // invalid={true}
                                        />
                                        <FormFeedback invalid>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>


                                    <Container className="text-center">
                                        <Button onClick={resetData} color="danger" className="me-2" type="reset" outline>Reset</Button>
                                        <Button color="light" outline>Register</Button>
                                    </Container>

                                    <Container className="text-center">
                                            {/* Login with Google Button */}
                                            {authUrl && (
                                                    <Button color="warning" className="mt-2" outline onClick={handleGoogleLogin}>
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
        </Base>
    )
}

export default Signup;