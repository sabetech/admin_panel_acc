import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

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
    
    handleLoadMore();

  },[]);

  const loadNextPage = (page) => {
      return axios.get(`${BASE_URL}/react_admin/students?page=${page}`);
  }

  const handleLoadMore = () => {
    
    setLoading(true);
    // Some API call to fetch the next page
    loadNextPage(currentPage).then((page_result) => {
      setLoading(false);
      setHasNextPage(page_result.hasNextPage);
      console.log(page_result);
      setStudents([...students, page_result.data.items.data]);
      setCurrentPage(prev => prev + 1);
    });
  }


  const RenderStudentItem = (item) => {
    
    return (
      <Col lg="3" md="6" >
          <StudentCard student={item}/>
      </Col>
    );
  }

    return (
        <>
          <Header />
          {/* Page content */}
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className=" col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Students</h3>
                  </CardHeader>
                  <CardBody>
                    <Row className=" icon-examples">
                      <FlatList
                        paginate={{
                          hasMore: hasNextPage,
                          loadMore: handleLoadMore,
                          loadingIndicator: <div style={{background: '#090'}}>Getting more items...</div>
                        }}
                        list={students}
                        renderItem={(item, index) => (<Col lg="3" md="6" key={index} >
                                                        <StudentCard student={item}/>
                                                      </Col>) }
                        renderWhenEmpty={() => <div>No Students</div>}
                        //sortBy={["firstName", {key: "lastName", descending: true}]}
                        //groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
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