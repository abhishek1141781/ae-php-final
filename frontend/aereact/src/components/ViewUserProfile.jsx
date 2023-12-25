import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth/authIndex'


const ViewUserProfile = ({ user }) => {


    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)
    useEffect(() => {
        setCurrentUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])

    // console.log("incoming 'user' passed via props in ProfileInfo.jsx: ",user)
    // console.log("'currentUser' set in useEffect via getCurrentUserDetail in ViewUserProfile.jsx: ",currentUser)


    return (
        <Card className='mt-2 border-0 shadow-sm'>
            <CardBody>
                <h3 className='text-uppercase'>This is user Profile</h3>
                <div className="divider" style={{
                    width: '75%',
                    height: '1px',
                    background: '#e2e2e2'
                }}></div>


                <Container className='text-center'>
                    <img style={{ maxWidth: '250px' }} src={user?.user_data?.picture ? user?.user_data?.picture : getCurrentUserDetail()?.picture ? getCurrentUserDetail()?.picture : 'https://miro.medium.com/v2/resize:fit:1014/0*fbpKz1BwJUCBnqkQ'} alt="profile-pic" className='img-fluid rounded-circle mt-3' />
                </Container>

                <Table bordered hover responsive striped className='mt-5 text-center' >
                    <tbody>
                        <tr>
                            <td>UserId</td>
                            <td>{user.user_data.user_id}</td>
                            {/* <td>{currentUser?.user_id}</td> */}
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{user.user_data.name}</td>
                            {/* <td>{currentUser?.email}</td> */}
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{user.user_data.email}</td>
                            {/* <td>{currentUser?.email}</td> */}
                        </tr>

                        {
                            user.user_data.google_id &&
                            <tr>
                                <td>Google ID</td>
                                <td>{user.user_data.google_id}</td>
                                {/* <td>{currentUser?.email}</td> */}
                            </tr>
                        }

                    </tbody>
                </Table>
                {currentUser ? (currentUser.user_id === user.user_data.user_id) ? (
                    <CardFooter className='text-center'>
                        <Button color='warning' >Update Profile</Button>
                    </CardFooter>
                ) : '' : ''}

            </CardBody>
        </Card>
    )
}

export default ViewUserProfile