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
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {BASE_URL} from "../../config/baseUrl";

export default function StudentBussingInfo(){
    const [studentBussing, setStudentBussing] = useState([]);
    const [hideFilterOptions, setHideFilterOptions] = useState(false);
    const [bussingDate, setBussingDate] = useState("");

    const getTopBussers = async (date) => {
        const response = await axios.get(`${BASE_URL}/react_admin/student_bussing?date=${date}`);        
        await setStudentBussing(response.data);
    }

    useEffect(() => {
        let defaultDate = moment().startOf('week');
        setBussingDate(moment(defaultDate).format("YYYY-MM-DD"));
        getTopBussers(moment(defaultDate).format("YYYY-MM-DD"));
    },[]);

    const handleDateChange = (obj) => {
        let selectedDate = moment(obj.startDate).format("YYYY-MM-DD");
        setBussingDate(selectedDate);
        getTopBussers(selectedDate);
    }

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col-md-4">
                        <h3 className="mb-0">Students Bussing Information<br />on {moment(bussingDate).format("DD-MMM-YYYY")}</h3>
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
                    <div className="col-md-4" >
                        <Label>Choose Date</Label>
                        <DateRangePicker
                            initialSettings={{
                                singleDatePicker: true,
                                showDropdowns: true,
                                minYear: 2018,
                                maxYear: parseInt(moment().format('YYYY'), 10),
                                locale: {
                                    format: 'D-MMM-YYYY'
                                }
                            }}
                            onApply={
                                (e, obj) => {
                                    handleDateChange(obj);
                                }
                            }
                        >    
                            <input type="text" className="form-control col-4" value={bussingDate}/>
                        </DateRangePicker>
                    </div>
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
                    <th scope="col">Present/Absent</th>
                    <th scope="col">Souls Bussed</th>
                </tr>
                </thead>
                <tbody>
                    {
                        studentBussing.map((busser, index) => (
                            <tr key={index}>
                                <th scope="row">{busser.student_addmission_number}</th>
                                <td>{busser.name}</td>
                                <td>{busser.student_class}</td>
                                <td>{(busser.present) ? "Yes":"No"}</td>
                                <td>{busser.number_bussed}</td>
                            </tr>
                        ))
                    }
                
                </tbody>
            </Table>
        </Card>
    );
}