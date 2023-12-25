// ...

const AddPost = () => {
    // ...

    const [post, setPost] = useState({
        event_name: '',
        start_time: '',
        end_time: '',
        location: '',
        description: '',
        category: '',
        banner_image_url: '',
        userId: '',
        categoryId: ''  // Assuming categoryId is the corresponding field for category
    });

    // ...

    // Field Changed function
    const fieldChanged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    // ...

    return (
        <div className="wrapper">
            <Card className="shadow-sm mt-2">
                <CardBody>
                    <h3>What's are you thinking</h3>
                    <Form onSubmit={createPost}>
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

                        <div className="my-2">
                            <Label for="description">Post Content</Label>
                            <JoditEditor
                                ref={editor}
                                value={post.description}
                                onChange={(newContent) => setPost({ ...post, 'description': newContent })}
                            />
                        </div>

                        {/* Image file upload */}
                        <div className="mt-3">
                            <Label for="banner_image_url">Select Post Banner</Label>
                            <Input id="banner_image_url" type="file" onChange={handleFileChange} />
                        </div>

                        {/* Post Category */}
                        <div className="my-2">
                            <Label for="category">Post Category</Label>
                            {/* <Label for="title">Post Title</Label> */}
                            <Input
                                type="text"
                                // id="title"
                                id="categoryId"
                                placeholder="Enter here"
                                // name="title"
                                name="categoryId"
                                onChange={fieldChanged}
                            />
                        </div>

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

export default AddPost;
