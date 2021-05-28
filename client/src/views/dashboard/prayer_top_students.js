import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Button
  } from "reactstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import {BASE_URL} from '../../config/baseUrl';

export default function PrayerTopStudents(){

    const [topPrayingstudents, setTopPrayingStudents] = useState([]);

    const getTopPrayers = async () => {
        const response = await axios.get(`${BASE_URL}/react_admin/top_praying_students`);
        
        await setTopPrayingStudents(response.data);
    }

    useEffect(() => {
        getTopPrayers();
    },[]);

    return (
        <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Top Praying Students</h3>
            </div>
            <div className="col text-right">
              <Button
                color="primary"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="sm"
              >
                Show Filter Options
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Stuent Name</th>
              <th scope="col">Number of Hours Prayed</th>
              <th scope="col">Class</th>
            </tr>
          </thead>
          <tbody>
              {
                  topPrayingstudents.map((item, index) => (
                    <tr key={index}>
                        <td scope="row">{item.index_number}</td>
                        <td>
                          <Link 
                              to={`/admin/student/${item.id}/profile`}
                          >
                              { item.name }
                          </Link>
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <span className="mr-2">{item.prayer_hours} hours</span>
                            </div>
                        </td>
                        <td>{ item.class }</td>
                        <td />
                    </tr>
                  ))
              }
            
          </tbody>
        </Table>
      </Card>
    );

}