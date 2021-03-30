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

export default function Students(){
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentHeading, setCurrentHeading] = useState("Students");
  const [all_students, setAllStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    
      !loaded && loadAllStudents(); //if it is false, load the students ....

  },[students]);

  const loadAllStudents = () => {

    return axios.get(`${BASE_URL}/react_admin/students_all`)
          .then((response) => 
          {
            setStudents(response.data.items);
            setAllStudents(response.data.items);

            setLoaded(true);

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
                    <h3 className=" mb-0">{currentHeading}</h3>
                    {all_students.length > 0 && <StudentFilterBox all_students={all_students} setFilteredStudents={setStudents} setCurrentHeading={setCurrentHeading} />}
                  </CardHeader>
                  <CardBody>
                    <Row className=" icon-examples">
                      <PlainList
                        list={students}
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