import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Button
  } from "reactstrap";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";

export default function TopBussingStudent(){
    const [topBussers, setTopBussers] = useState([]);

    const getTopBussers = async () => {
        const response = await axios.get(`${BASE_URL}/react_admin/top_bussers`);
        await console.log(response);
        await setTopBussers(response.data);
    }

    useEffect(() => {
        getTopBussers();
    },[]);

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col">
                        <h3 className="mb-0">Top 10 Bussing Students</h3>
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
                    <th scope="col">Index Number</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Souls Bussed</th>
                </tr>
                </thead>
                <tbody>
                    {
                        topBussers.map((busser) => (
                            <tr>
                                <th scope="row">{busser.index_number}</th>
                                <td>{busser.student_name}</td>
                                <td>{busser.class}</td>
                                <td>
                                    {busser.sum_number_bussed}
                                </td>
                            </tr>
                        ))
                    }
                
                </tbody>
            </Table>
        </Card>
    );
}