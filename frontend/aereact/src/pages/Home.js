import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {

    return (
        <Base>
            <Container className="mt-4" >

                <Row className="justify-content-between border">
                    <Col md={2} className="pt-2 border">
                        {/* Render the date filter */}
                        <CategorySideMenu dateFilter={true} categoryFilter={true} cityFilter={false}  />
                        {/* <CategorySideMenu categoryFilter={true} /> */}
                    </Col>

                    <Col md={2} className="pt-4 border">
                        {/* Render the date filter */}
                        <CategorySideMenu cityFilter={true} dateFilter={false} categoryFilter={false} />
                    </Col>

                    <Col md={8}>
                        {/* Render the main content */}
                        <NewFeed />
                    </Col>
                </Row>

            </Container>
        </Base>

    )
}

export default Home;