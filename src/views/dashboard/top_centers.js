import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Button
  } from "reactstrap";
import axios from 'axios';
import {BASE_URL} from '../../config/baseUrl';

export default function TopCenterAttnOffering(){

    const [topCenters, setTopCenters] = useState([]);

    const getTopBussers = async () => {
        const response = await axios.get(`${BASE_URL}/react_admin/top_centers_attn_n_offering`);
        await console.log(response);
        await setTopCenters(response.data);
    }

    useEffect(() => {
        getTopBussers();
    },[]);

    return (
        <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Top Center Service Average</h3>
            </div>
            <div className="col text-right">
              <Button
                color="primary"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="sm"
              >
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Center</th>
              <th scope="col">Attendance (Avg)</th>
              <th scope="col">Offering (Avg)</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
              {
                  topCenters.map(item => (
                    <tr>
                        <th scope="row">{item.center_name}</th>
                        <td>{ parseFloat(item.attn).toFixed(1) }</td>
                        <td>
                            <div className="d-flex align-items-center">
                                <span className="mr-2">{parseFloat(item.total_offering).toFixed(2)} ghc</span>
                            </div>
                        </td>
                        <td />
                    </tr>
                  ))
              }
            
          </tbody>
        </Table>
      </Card>
    );

}