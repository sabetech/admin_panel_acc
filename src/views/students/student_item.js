import React from "react";
import {
    Col
  } from "reactstrap";
import { Link } from "react-router-dom";
import StudentCard from "./student_card";

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

  export default RenderStudentItem;