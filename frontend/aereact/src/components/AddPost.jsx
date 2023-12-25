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

    const [image,setImage] = useState(undefined)

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
            toast.error('Name: It must be something, right?!')
            return;
        }
        if (post.description.trim() === '') {
            toast.error('Description: Tell me more about it!')
            return;
        }
        if (post.banner_image_url === '') {
            toast.error('No image')
            return;
        }

        if (post.category?.trim() === '' || post.category === null) {
            toast.error('Category: Help us help you!')
            return;
        }



        if (post.start_time === '' || post.end_time === '' || post.start_time === null || post.end_time === null) {
            toast.error('No Time, No Deal')
            return;
        }
        if (post.start_time > post.end_time) {
            toast.error('Do not mess with time, tomorrow always comes after')
            return;
        }
        if (post.location?.trim() === '' || post.location === null) {
            toast.error('Location: Where is the event taking place? Hello?!!')
            return;
        }


        //submit the form on server
        post['user_id'] = user.user_id

        console.log("ready post: ",post)

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

        const selectedFile = event.target.files[0];

        // Update the state using the updater function
        setImage(() => {
            console.log("New image: ", selectedFile);

            // Update the post state
            setPost({
                ...post,
                banner_image_url: selectedFile?.name,
            });

            console.log("post.banner_image_url: ", post.banner_image_url);
            console.log("post: ", post);
            
            // Return the new state
            return selectedFile;
        });
        console.log("OUTSIDE: post.banner_image_url: ", post.banner_image_url);
        console.log("OUTSIDE: image: ", image);
        
    }

    //     setImage(event.target.files[0])
    //     console.log("image: ",image)
    //     setPost({
    //         banner_image_url: image?.name
    //     })
    //     console.log("post.banner_image_url: ",post.banner_image_url)
    //     console.log("post: ",post)

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
