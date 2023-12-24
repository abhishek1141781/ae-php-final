import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth/authIndex'
// import userContext from '../context/userContext'

export const Event = ({ event = { id: -1, title: "default post tilte", content: "default post content" }, deleteEvent }) => {

    // const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])

    // if(getCurrentUserDetail().dataFromBackend)
    //     console.log("user is logged in via dataFromBackend")

    // console.log("getCurrentUserDetail.dataFromBackend: ",getCurrentUserDetail().dataFromBackend)
    // console.log("getCurrentUserDetail: ",getCurrentUserDetail())


    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                {/* <h1>{post.title}</h1> */}
                <h1>{"Event Name: " + event.event_name}</h1>
                <h3>{"Location: " + event.location}</h3>
                <h5>{"Category: " + event.category}</h5>
                {/* Uncaught TypeError: Cannot read properties of undefined (reading 'substring') */}
                {/* <CardText dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 30) + "...." }}> */}
                <CardText dangerouslySetInnerHTML={{ __html: event.description?.substring(0, 30) + "...." }}>
                    {/* {post.content.substring(0,30)}... */}
                </CardText>

                <h6>{"Start Date: " + event.start_time.substring(0,10) + " | Start Time: " + event.start_time.substring(11,)}</h6>
                <h6>{"End Date: " + event.end_time.substring(0,10) + " | End Time: " + event.end_time.substring(11,)}</h6>
                <div>
                    <Link to={"/posts/" + event?.id} className='btn btn-secondary'>Read More</Link>
                    {/* <Link to={"/posts/" + post?.event_id} className='btn btn-secondary'>Read More</Link> */}

                    {/* {isLoggedIn ? user.id == post.user.id ? <Button color='danger' className='ms-2'>Delete</Button> : '' : ''} */}
                    {/* {isLoggedIn && (user && user.id == post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')} */}
                    {/* {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.id}`} color='warning' className='ms-2'>Update</Button> : '')} */}

                    {/* {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.id}`} color='warning' className='ms-2'>Update</Button> : '')} */}


                    {isLoggedIn() && (user && user.user_id === event.user_id ? <Button onClick={() => deleteEvent(event)} color='danger' className='ms-2'>Delete</Button> : '')}
                    {isLoggedIn() && (user && user.user_id === event.user_id ? <Button tag={Link} to={`/user/update-blog/${event.event_id}`} color='warning' className='ms-2'>Update</Button> : '')}

                </div>
            </CardBody>
        </Card>
    )
}

export default Event