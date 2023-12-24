// import NewFeed from '../components/NewFeed'
import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { deletePostService, loadPostCategoryWise, loadPostLocationWise, loadPostsByDate } from '../servicesArea/PostService';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {

    const [posts, setPosts] = useState([])

    const { categoryName } = useParams()
    const { locationName } = useParams()
    const { selectedDate } = useParams();


    useEffect(() => {
        if (selectedDate) {
          console.log("inside selectedDate: ",selectedDate)
          // Load events for the selected date
          loadPostsByDate(selectedDate)
            .then((data) => {
              console.log("loadPostsByDate: ",data)
              // setPosts(data); // Assuming loadEventsByDate returns an array of events
              data.content && setPosts([...data.content]);
            })
            .catch((error) => {
              console.error('Error loading events by date:', error);
              toast.error('Error loading events by date');
            });
        } else {
          // Load events based on category or location if no date is selected
          if (categoryName) {
            // Load events by category
            loadPostCategoryWise(categoryName)
              .then((data) => {
                console.log("loadPostCategoryWise: ",data)
                data.content && setPosts([...data.content]);
              })
              .catch((error) => {
                console.error('Error loading events by category:', error);
                toast.error('Error loading events by category');
              });
          } else if (locationName) {
            // Load events by location
            loadPostLocationWise(locationName)
              .then((data) => {
                data.content && setPosts([...data.content]);
              })
              .catch((error) => {
                console.error('Error loading events by location:', error);
                toast.error('Error loading events by location');
              });
          }
        }
      }, [categoryName, locationName, selectedDate]);
    








    // useEffect(() => {
    //     console.log(categoryName)
    //     loadPostCategoryWise(categoryName).then(data => {
    //         // setPosts([...data])
    //         data.content && setPosts([...data.content])
    //         // const dataArr = Object.values(data)
    //         console.log("non array data: ", data)
    //         // setPosts([...dataArr])
    //         // setPosts([Object.values(...data)])
    //         // .catch(error => {
    //         //     console.log("error from inside setPosts: ", error)
    //         // })
    //     }).catch(error => {
    //         console.log("from line 23: ", error)
    //         toast.error("error in loading posts")
    //     })
    // }, [categoryName])


    // useEffect(() => {
    //     console.log(locationName)
    //     loadPostLocationWise(locationName).then(data => {
    //         // setPosts([...data])
    //         data.content && setPosts([...data.content])
    //         // const dataArr = Object.values(data)
    //         console.log("non array data: ", data)
    //         // setPosts([...dataArr])
    //         // setPosts([Object.values(...data)])
    //         // .catch(error => {
    //         //     console.log("error from inside setPosts: ", error)
    //         // })
    //     }).catch(error => {
    //         console.log("from line 23: ", error)
    //         toast.error("error in loading posts")
    //     })
    // }, [locationName])


    // function to delete post
    function deletePostUtility(post) {
        console.log("post from deletePost: ", post)
        //going to delete post
        deletePostService(post.id).then(data => {
            console.log(data)
            toast.success("post deleted")
            // loadPostData()
            let newPosts = posts.filter(p => p.id !== post.id)
            setPosts([...newPosts])

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }


    return (
        <Base>
            <Container className="mt-2" >{/* <NewFeed /> */}
                <Row>
                    <Col md={2} className="pt-5"><CategorySideMenu /></Col>
                    <Col md={10}>
                        <h1>{selectedDate ? `Posts on ${selectedDate}` : `Filtered Posts (${posts.length})`}</h1>
                        {/* <h1>Events Count ({posts.length})</h1> */}
                        {
                            Array.isArray(posts) && posts.map((post, index) => {
                                return (
                                    <Post post={post} key={index} deletePost={deletePostUtility} />
                                )
                            })
                        }
                    </Col>

                    {/* <Col md={10}>
                        {selectedDate && <h1>Events on {selectedDate}</h1>}
                        {!selectedDate && <h1>Filtered Events ({posts.length})</h1>}

                        {posts.map((event) => (
                          <EventCard key={posts.event_id} event={event} />
                        ))}
                    </Col> */}






                </Row>
            </Container>
        </Base>
    )
}

export default Categories