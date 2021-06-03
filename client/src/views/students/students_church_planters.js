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

export default function StudentChurchPlanters(){

    const [churchPlanters, setChurchPlanters] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadChurchPlanters();
    },[]);

    const loadChurchPlanters = () => {

        setLoading(true);
        return axios.get(`${BASE_URL}/react_admin/admin/church_planters`)
              .then((response) => 
              {
                
                setChurchPlanters(response.data.church_planters);
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
                            <h3 className=" mb-0">Church Planters - {churchPlanters.length}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row className=" icon-examples">
                                <PlainList
                                    list={churchPlanters}
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