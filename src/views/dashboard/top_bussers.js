import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Button,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";

export default function TopBussingStudent(){
    const [topBussers, setTopBussers] = useState([]);
    const [hideFilterOptions, setHideFilterOptions] = useState(false);

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
                    <div className="col-md-3">
                        <h3 className="mb-0">Top 10 Bussing Students</h3>
                    </div>
                    {
                        hideFilterOptions && 
                    
                        <div className="col" style={{flexDirection: 'row'}}>
                            <FormGroup>
                                <Label for="exampleSelect">Filter Options</Label>
                                <Input type="select" name="select" id="filter_options">
                                <option>Class</option>
                                <option>Country</option>
                                <option>UD/NON UD</option>
                                <option>Community</option>
                                </Input>
                            </FormGroup>
                        
                            <FormGroup>
                                <Label for="exampleSelect">Filter Value</Label>
                                <Input type="select" name="select" id="filter_value">
                                
                                </Input>
                            </FormGroup>
                        </div>
                    
                    }
                    <div className="col text-right">
                        <Button
                        color="primary"
                        onClick={e => {
                            setHideFilterOptions( val => !val);
                        }}
                        size="sm"
                        >
                        Filter Options
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
                        topBussers.map((busser, index) => (
                            <tr key={index}>
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