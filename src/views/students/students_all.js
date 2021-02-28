import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";

import Header from "components/Headers/Header.js";
import FlatList from 'flatlist-react';

import StudentCard from "./student_card";
import {BASE_URL} from "../../config/baseUrl";


import axios from 'axios';

export default function Students(){
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    
    loadAllStudents();

  },[]);

  const loadAllStudents = () => {

    return axios.get(`${BASE_URL}/react_admin/students_all`)
          .then((response) => 
          {
            setStudents(response.data.items)
          });
  }

  // const loadNextPage = (page) => {
  //     return axios.get(`${BASE_URL}/react_admin/students?page=${page}`);
  // }

  // const handleLoadMore = () => {
    
  //   setLoading(true);
  //   // Some API call to fetch the next page
  //   loadNextPage(currentPage).then((page_result) => {
  //     setLoading(false);
  //     setHasNextPage(page_result.hasNextPage);
  //     setStudents([...students, ...page_result.data.items.data]);
  //     setCurrentPage(prev => prev + 1);
  //   });
  // }


  const RenderStudentItem = (item) => {
    
    return (
      
        <Col lg="3" md="6" >
          <Link 
            to={`/admin/student/${item.item.id}/profile`}
            >
            <StudentCard student={item.item}/>
          </Link>
        </Col>
      
    );
  }

    return (
        <>
          <Header />
          <Container className=" mt--7" fluid>
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Students</h3>
                    <div className="row">
                        <div className="col">
                          <FormGroup>
                              <Label for="exampleSelect">Filter Options</Label>
                              <Input type="select" name="select" id="filter_options">
                              <option>Name</option>
                              <option>Class</option>
                              <option>Country</option>
                              <option>UD/NON UD</option>
                              <option>Community</option>
                              <option>Center</option>
                              </Input>
                          </FormGroup>
                      </div>
                      <div className="col">
                        <FormGroup>
                            <Label for="exampleSelect">Filter Value</Label>
                            <Input type="select" name="select" id="filter_value">
                            
                            </Input>
                        </FormGroup>
                      </div>
                  </div>
                      
                    
                  </CardHeader>
                  <CardBody>
                    <Row className=" icon-examples">
                      <FlatList
                        
                        list={students}
                        renderItem={(item, index) => <RenderStudentItem item={item} key={index}/>}
                        renderWhenEmpty={() => <div>No Students</div>}
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