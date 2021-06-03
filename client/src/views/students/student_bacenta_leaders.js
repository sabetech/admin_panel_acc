import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import {PlainList} from 'flatlist-react';

import {BASE_URL} from "../../config/baseUrl";
import RenderStudentItem from "./student_item";

import axios from 'axios';

export default function StudentBacentaLeader(){

    const [bacentaLeaders, setBacentaLeaders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadBacentaleaders();
    },[]);

    const loadBacentaleaders = () => {

        setLoading(true);
        return axios.get(`${BASE_URL}/admin_app/bacenta_leaders`)
              .then((response) => 
              {
                setBacentaLeaders(response.data.bacenta_leaders);
                
                setLoading(false);
    
              });
      }

    return (
        <>
          <Header />
            <Container className=" mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className=" shadow">
                            <CardHeader className=" bg-transparent">
                            <h3 className=" mb-0">Bacenta Leader(s) - {bacentaLeaders.length}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row className=" icon-examples">
                                <PlainList
                                    list={bacentaLeaders}
                                    renderItem={(item, index) => <RenderStudentItem item={item} key={index}/>}
                                    renderWhenEmpty={() => <div>Loading ...</div>}
                                    renderOnScroll
                                />
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}