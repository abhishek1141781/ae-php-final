// import NewFeed from '../components/NewFeed'
import React, { useEffect, useState } from "react";
import Base from "../src/components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../src/components/CategorySideMenu";
import {
  deletePostService,
  loadPostCategoryWise,
  loadPostLocationWise,
} from "../src/servicesArea/PostService";
import { toast } from "react-toastify";
import Post from "../src/components/Post";

function Categories() {
  const [posts, setPosts] = useState([]);

  const { categoryName } = useParams();
  const { locationName } = useParams();

  useEffect(() => {
    console.log(categoryName);
    loadPostCategoryWise(categoryName)
      .then((data) => {
        // setPosts([...data])
        setPosts([...data.content]);
        // const dataArr = Object.values(data)
        console.log("non array data: ", data);
        // setPosts([...dataArr])
        // setPosts([Object.values(...data)])
        // .catch(error => {
        //     console.log("error from inside setPosts: ", error)
        // })
      })
      .catch((error) => {
        console.log("from line 23: ", error);
        toast.error("error in loading posts");
      });
  }, [categoryName]);

  useEffect(() => {
    console.log(locationName);
    loadPostLocationWise(locationName)
      .then((data) => {
        // setPosts([...data])
        setPosts([...data.content]);
        // const dataArr = Object.values(data)
        console.log("non array data: ", data);
        // setPosts([...dataArr])
        // setPosts([Object.values(...data)])
        // .catch(error => {
        //     console.log("error from inside setPosts: ", error)
        // })
      })
      .catch((error) => {
        console.log("from line 23: ", error);
        toast.error("error in loading posts");
      });
  }, [locationName]);

  // function to delete post
  function deletePostUtility(post) {
    console.log("post from deletePost: ", post);
    //going to delete post
    deletePostService(post.id)
      .then((data) => {
        console.log(data);
        toast.success("post deleted");
        // loadPostData()
        let newPosts = posts.filter((p) => p.id !== post.id);
        setPosts([...newPosts]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting post");
      });
  }

  return (
    <Base>
      <Container className="mt-2">
        {/* <NewFeed /> */}
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h1>Events Count ({posts.length})</h1>
            {posts &&
              posts.map((post, index) => {
                return (
                  <Post
                    post={post}
                    key={index}
                    deletePost={deletePostUtility}
                  />
                );
              })}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
