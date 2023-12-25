import React, { useContext, useEffect, useState } from 'react'
import Base from '../src/components/Base'
import { useNavigate, useParams } from 'react-router-dom'
// import userContext from '../context/userContext'
import { loadPost, updatePostService } from '../src/servicesArea/PostService'
import { toast } from 'react-toastify'
import { useRef } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../src/servicesArea/CategoryService"
import JoditEditor from "jodit-react"
import { getCurrentUserDetail } from '../src/auth/authIndex'


function UpdateBlog() {

    const { blogId } = useParams()
    // const object = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    const [categories, setCategories] = useState([])
    const editor = useRef(null)

    // console.log("post.category.id: ",post)

    //load all categories to be used in select input bar
    useEffect(() => {
        loadAllCategories().then((data) => {
            console.log("loadAllCategories: ", data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })

        //load blog form database
        loadPost(blogId).then(data => {
            // durgesh has categoryId as his id field of category array, i'll use id
            // setPost({ ...data, categoryId: data.category.id })
            console.log("data.category.id from loadPost in id value: ", data)
            setPost({ ...data, id: data.event.event_id })
            console.log("data.category.id from loadPost in id value after setting id: data.category.id=>", data)
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading the post from db")
            })
    }, [])

    useEffect(() => {
        console.log("first")
        if (post) {
            const userData = getCurrentUserDetail();
            console.log("post from tresssss: ", post)
            console.log("getcurrnetuserdetail: ", userData)
            if (post?.event?.user_id !== userData.user_id) {
                toast.error("no trespassing")
                navigate('/')
            }
        }
    }, [post])

    // const handleChange = (event, fieldName) => {
    //     if (fieldName === 'category.id') {
    //         setPost({
    //             ...post,
    //             category: { id: event.target.value }
    //         });
    //     } else {
    //         setPost({
    //             ...post,
    //             [fieldName]: event.target.value
    //         });
    //     }
    // }



    const handleChange = (event, fieldName) => {
        setPost({
          ...post,
          [fieldName]: event.target.value,
        });
    };
    




    //update post function
    const updatePost = (event) => {
        event.preventDefault()
        console.log("postDto from updatePost of UpdateBlog: ", post)
        // updatePostService({ ...post, category: { categoryId: post.categoryId } }, post.postId)
        updatePostService({ ...post }, post.event_id)
            .then(resp => {
                console.log(resp)
                toast.success("post updated")
            })
            .catch(error => {
                console.log(error)
                toast.error("error in updateing the post")
            })
    }


    const updateHtml = () => {
        return (
            <div className="wrapper">
                {/* {JSON.stringify(post)} */}
                <Card className="shadow-sm mt-2">
                    <CardBody>
                        {/* {JSON.stringify(post)} */}
                        <h3>Update opost form here</h3>
                        <Form onSubmit={updatePost} >
                            <div className="my-2">
                                <Label for="title">Post Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter here"
                                    name="title"
                                    value={post.title}
                                    onChange={(event) => handleChange(event, 'title')}
                                />
                            </div>

                            <div className="my-2">
                                <Label for="content">Post Content</Label>

                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={newContent => setPost({ ...post, content: newContent })}
                                />
                            </div>

                            {/* image file upload */}
                            <div className="mt-3">
                                <Label for="image">Select Post Banner</Label>
                                <Input id="image" type="file" onChange={''} />
                            </div>


                            <div className="my-2">
                                <Label for="category">Post Category</Label>
                                <Input
                                    type="select"
                                    id="category"
                                    title="Select a Category"
                                    placeholder="Enter here"
                                    name="category"
                                    // onChange={(event) => handleChange(event, 'category.id')}
                                    onChange={(event) => handleChange(event, 'category')}
                                    value={post.category}
                                >

                                    <option disabled value={0}>--Select Category--</option>

                                    {/* Preloaded categories */}
                                    {categories.map((category) => (
                                        <option key={category?.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
    
                                    {/* Other option */}
                                    <option value="other">Other</option>

                                </Input>
    
                                {/* Text box for custom category */}
                                {post.category?.id === 'other' && (
                                    <Input
                                        type="text"
                                        placeholder="Enter custom category"
                                        value={post.customCategory}
                                        onChange={(event) => handleChange(event, 'customCategory')}
                                    />
                                )}

                            </div>




                            <Container className="text-center">
                                <Button type="submit" color="success" outline>Update Post</Button>
                                <Button color="danger" className="ms-2" outline>Reset Post</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>

        )
    }

    return (

        <Base>
            <Container>
                {post && updateHtml()}

            </Container>

        </Base>
    )
}

export default UpdateBlog