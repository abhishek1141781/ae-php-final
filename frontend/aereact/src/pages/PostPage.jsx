import { Link, useParams } from "react-router-dom"
import Base from "../components/Base"
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { loadPost } from "../servicesArea/PostService"
import { toast } from "react-toastify"
import { BASE_URL } from "../servicesArea/helper"
import { isLoggedIn } from "../auth/authIndex"

const PostPage = () => {

    //destructuring postId coming in useParams though data has id parameter, so using data we can do
    // data.id to get post id but to get post id directly we would've to use postId to access global
    // context variable
    const { postId } = useParams()
    // console.log("PostId by useParams:", postId);

    //store post data temporarily using stateManagement
    const [post, setPost] = useState(() => [])
    // const [comment, setComment] = useState({
    //     //use same property name as server side code
    //     content: ''
    // })

    // load post of given postId
    useEffect(() => {
        //check if postId is defined before making the GET request for the image
        if (postId) {

            loadPost(postId)
                .then(data => {
                    console.log("postId from useEffect of PostPage: ", postId)
                    console.log("response.data: events and author detils",data)
                    // console.log("post id from data: ",data.id)
                    // console.log("data.user.id from data: ",data.user.id)
                    // console.log("data.category.id from data: ",data.category.id)
                    // console.log("data.user.roles[0].id from data: ",data.user.roles[0].id)
                    setPost(data)
                }).catch(error => {
                    console.log("Error ", error);
                    toast.error("error in laoading post")
                })
        }
    }, [postId]); // Add postId as a dependency to re-run the effect when it changes

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleString()
    }

    const loadImage = () => {
        if (post?.event?.banner_image_url) {
            console.log("post ",post)
            // console.log("post.banner_image_url ",post.event.banner_image_url)
            return BASE_URL + "/private/uploads/" + post.event.banner_image_url;
        } else {
            // console.log("post.banner_image_url ",post.event.banner_image_url)
            console.log("post ",post)
            // Handle the case where post or imageName is not defined
            console.log("Post or imageName is not defined.");
            return ""; // or provide a default image URL
        }
    }

    const convertDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString('en-US', options);
    }

      

    return (
        <Base>
            <Container className="mt-4">
                <Link to='/'>Home</Link> / {post && (<Link to=''>{post?.event?.event_name}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        <Card className="mt-3">
                            <CardBody>
                                <CardText>
                                    {/* on reloading the page, Uncaught TypeError: Cannot read properties 
                                    of undefined (reading 'name'): Use type safe operator */}
                                    Posted by <b>{post?.event?.author_name}</b>
                                </CardText>


                                <CardText>
                                    {/* Uncaught TypeError: Cannot read properties of undefined (reading 'categoryTitle') 
                                    : thus making category null safe*/}
                                    <span className="text-muted">Category: {post?.event?.category}</span>
                                </CardText>



                                <div className="divider" style={{
                                    width: '100%',
                                    height: '1px',
                                    background: '#e2e2e2'
                                }}>
                                </div>



                                <CardText className="mt-3">
                                  <h3>{post?.event?.event_name}</h3>
                                </CardText>


                                <div className="image-container mt-3 container text-center shadow-lg" style={{ width: '50%' }}>
                                  <img className="image-fluid" src={loadImage()} alt="event_image" style={{ maxWidth: '100%' }} />
                                </div>


                                <div className="mt-5 p-3 border">

                                    <CardText className="mt-2">
                                      <strong>Start Date:</strong> {convertDateTime(post?.event?.start_time)}
                                    </CardText>

                                    <CardText className="mt-2">
                                      <strong>Finish Date:</strong> {convertDateTime(post?.event?.end_time)}
                                    </CardText>

                                    <CardText className="mt-2">
                                      <strong>Venue:</strong> {post?.event?.location}
                                    </CardText>

                                </div>




                                <div className="mt-4 p-3 border">
                                    <strong className="">Event Details:</strong>
                                    <CardText className="mt-2" dangerouslySetInnerHTML={{ __html: post?.event?.description }}>
                                </CardText>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>                
            </Container>
        </Base>
    )
}


export default PostPage