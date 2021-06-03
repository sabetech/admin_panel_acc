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
import FlatList, {PlainList} from 'flatlist-react';

import StudentFilterBox from "./student_filter_box";
import {BASE_URL} from "../../config/baseUrl";
import RenderStudentItem from "./student_item";

import axios from 'axios';

export default function StudentCenterLeaders(){

    const [centerLeaders, setCenterLeaders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCenterLeaders();
    },[]);

    const loadCenterLeaders = () => {

        setLoading(true);
        return axios.get(`${BASE_URL}/react_admin/admin/center_leaders`)
              .then((response) => 
              {
                
                setCenterLeaders(response.data.center_leaders);
                
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
                            <h3 className=" mb-0">Center Leaders - {centerLeaders.length}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row className=" icon-examples">
                                <PlainList
                                    list={centerLeaders}
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