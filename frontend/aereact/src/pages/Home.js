// post is not being used here in the <Home/> component
// import Post from "../components/Post";
import { useEffect } from "react";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {

    console.log("Home RErender")
    useEffect(() => {console.log("###########Home USE EFFECT@@@@@@@@@@@@@@@@@@@")},[])

    return (
        <Base>
            <Container className="mt-2" >

                <Row>
                    <Col md={2} className="pt-5"><CategorySideMenu /></Col>
                    <Col md={8}><NewFeed /></Col>
                    <h1>This is the home</h1>

                </Row>

            </Container>
        </Base>

    )
}

export default Home;