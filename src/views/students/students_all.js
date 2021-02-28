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
import { Dropdown } from 'semantic-ui-react'


import axios from 'axios';

export default function Students(){
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [all_students, setAllStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filterOption, setFilterOption] = useState("name");
  const [filterValues, setFilterValue] = useState([]);
  const [currentPlaceholder, setPlaceholder] = useState("Search for name");


  useEffect(() => {
      !loaded && loadAllStudents(); //if it is false, load the students ....

      !(classes > 0) && (filterOption === "class") && setFilterValue(classes.map((myclass, i) => {
          return {
            key: i,
            value: myclass,
            text: myclass
          } 
      }));

      !(countries > 0) && (filterOption === "country") && setFilterValue(countries.map((country, i) => {
          return {
            key: i,
            value: country,
            text: country
          }
      }));

  },[classes, countries]);

  const loadAllStudents = () => {

    return axios.get(`${BASE_URL}/react_admin/students_all`)
          .then((response) => 
          {
            setStudents(response.data.items);
            setAllStudents(response.data.items);
            setFilterValue([{key: 0, value: 'all', text: 'All'}, ...response.data.items.map((student) => {
              return {
                  key: student.id, 
                  value: student.index_number, 
                  text: student.name
                }}
            )]);
            
            setLoaded(true);

          });
  }

  const loadFilteredStudents = (filteredOption, filterValue) => {

    switch(filteredOption){

      case 'name':
        if (filterValue === 'all'){
          setStudents(all_students);
        }else{
          setStudents(all_students.filter((student) => student.index_number.toString().includes(filterValue)));
        }
      break;

      case 'class':

      break;

      case 'country':
        setStudents(all_students.filter((student) => student.country.includes(filterValue)));
      break;
    }

  }

  const loadCommunities = () => {

      return axios.get(`${BASE_URL}/admin_app/communities`)
                  .then((response) => 
                  {
                    setFilterValue(response.data.map((community) => {
                        return {
                          key: community.id,
                          value: community.region_name,
                          text: community.region_name
                        }
                    }));
                  });
  }

  const loadCenters = () => {
    return axios.get(`${BASE_URL}/admin_app/centers`)
                  .then((response) => 
                  {
                    setFilterValue(response.data.map((center) => {
                        return {
                          key: center.id,
                          value: center.center_name,
                          text: center.center_name
                        }
                    }));
                  });
  }

  const selectFilterOption = (e) => {
    
    setStudents(all_students);
    setFilterOption(e.target.value);

    switch(e.target.value){
      case 'name':  
        setPlaceholder("Search for Name");
        setFilterValue(
                          [{key: 0, value: 'all', text: 'All'}, ...students.map((student) => {
                                              return {
                                                  key: student.id, 
                                                  value: student.index_number, 
                                                  text: student.name
                                                }}
                                            )] );
      break;

      case 'class':
        setPlaceholder("Search for Class");
        setClasses([...new Set(students.map(student => student.class))]);
      break;

      case 'country':
        setPlaceholder("Search for Country");
        setCountries([...new Set(students.map(student => student.country))]);
      break;

      case 'ud_non_ud':
        setPlaceholder("Filter By UD or Non UD");
        setFilterValue([{
          key: 1,
          value: 'ud',
          text: 'UD'
        }, 
        {
          key: 2,
          value: 'non_ud',
          text: 'NON-UD'
        }]);
      break;
  
      case 'community':
        setPlaceholder("Filter By Community");
        loadCommunities();
      break;

      case 'center':
        setPlaceholder("Filter By Center");
        loadCenters();
      break;

    }
  }

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
                              <Input type="select" name="select" id="filter_options" onChange={selectFilterOption}>
                              <option value="name">Name</option>
                              <option value="class">Class</option>
                              <option value="country"> Country</option>
                              <option value="ud_non_ud">UD/NON UD</option>
                              <option value="community">Community</option>
                              <option value="center">Center</option>
                              </Input>
                          </FormGroup>
                      </div>
                      <div className="col">
                      <Label for="exampleSelect">Filter Values</Label>
                      <Dropdown
                        placeholder={currentPlaceholder}
                        fluid
                        search
                        selection
                        onChange={(e, x) => loadFilteredStudents(filterOption, x.value)}
                        options={filterValues}
                      />
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