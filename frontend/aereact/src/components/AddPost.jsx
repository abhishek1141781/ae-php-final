import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../servicesArea/CategoryService"
import JoditEditor from "jodit-react"
import { toast } from "react-toastify"
import { uploadPostImage, writePost } from '../servicesArea/PostService'
import { getCurrentUserDetail } from "../auth/authIndex"

const AddPost = () => {

    const editor = useRef(null)
    // const [content, setContent] = useState('')
    // const [categories, setCategories] = useState([])
    // const customConfig = {
    //     placeholder: "start typing.///.."
    // }
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        user_id: '',
        event_name: '',
        start_time: '',
        end_time: '',
        location: '',
        description: '',
        category: '',
        banner_image_url: '',
    })

    const [image,setImage] = useState(null)

    useEffect(
        () => {
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                console.log("setting existing categories as a drop down")
                // setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    //field Changed function
    const fieldChanged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    //create Post function
    const createPost = (event) => {

        event.preventDefault()
        console.log("created the post after preventing the def act after sub buttn pressed: ",post)
        if (post.event_name.trim() === '') {
            toast.error('post is required!')
            return;
        }
        if (post.location.trim() === '') {
            toast.error('content is required!')
            return;
        }
        if (post.category.trim() === '') {
            toast.error('category is required!')
            return;
        }

        //submit the form on server
        post['user_id'] = user.user_id

        writePost(post).then(data => {

            uploadPostImage(image,data.event_id).then(data=>{
                toast.success("image uploaded too!!!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })

            toast.success("post created but if data is sent to backend, this isn't guaranteed");
            console.log("logging after post created: ", post)
            setPost({
                event_name: '',
                start_time: '',
                end_time: '',
                location: '',
                description: '',
                category: '',
                banner_image_url: '',
            })
        }).catch((error) => {
            toast.error("post creation failed")
            console.log(error)
        })
    }


    //handling file change event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
        // setPost({
        //     banner_image_url: image.name
        // })
    }

    return (
        <div className="wrapper">
            <Card className="shadow-sm mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What's are you thinking</h3>
                    <Form onSubmit={createPost} >

                        {/* event_name */}
                        <div className="my-2">
                            <Label for="event_name">Post Title</Label>
                            <Input
                                type="text"
                                id="event_name"
                                placeholder="Enter here"
                                name="event_name"
                                onChange={fieldChanged}
                            />
                        </div>

                        {/* Post Content */}
                        <div className="my-2">
                            <Label for="description">Post Content</Label>
                            <JoditEditor
                                ref={editor}
                                value={post.description}
                                onChange={(newContent) => setPost({ ...post, 'description': newContent })}
                            />
                        </div>


                        {/* image file upload */}
                        <div className="mt-3">
                            <Label for="banner_image_url">Select Post Banner</Label>
                            <Input id="banner_image_url" type="file" onChange={handleFileChange} />
                        </div>


                        {/* Post Category */}
                        <div className="my-2">
                            <Label for="category">Post Category</Label>
                            <Input
                                type="text"
                                id="category"
                                placeholder="Enter here"
                                name="category"
                                onChange={fieldChanged}
                            />
                        </div>


                        {/* Start Time */}
                        <div className="my-2">
                            <Label for="start_time">Start Time</Label>
                            <Input
                                type="datetime-local"
                                id="start_time"
                                name="start_time"
                                onChange={fieldChanged}
                            />
                        </div>

                        {/* End Time */}
                        <div className="my-2">
                            <Label for="end_time">End Time</Label>
                            <Input
                                type="datetime-local"
                                id="end_time"
                                name="end_time"
                                onChange={fieldChanged}
                            />
                        </div>

                        {/* Location */}
                        <div className="my-2">
                            <Label for="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                placeholder="Enter location"
                                name="location"
                                onChange={fieldChanged}
                            />
                        </div>


                        {/* Submit and reset Buttons */}
                        <Container className="text-center">
                            <Button type="submit" color="success" outline>Create Post</Button>
                            <Button color="danger" className="ms-2" outline>Reset Post</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost
