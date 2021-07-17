import React from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    CardBody
} from "reactstrap";
import Header from "components/Headers/Header.js";


export default function CO_reps(){
    

    return (
        <>
            <Header />
            <Container className=" mt--7" fluid>
                <Row>
                <div className="col">
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0">{"COs"}</h3>
                        </CardHeader>
                    </Card>
                    <CardBody>
                        <Row className=" icon-examples">
                        </Row>
                    </CardBody>
                </div>
                </Row>
            </Container>
        </>
    );
}