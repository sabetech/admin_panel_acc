import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Row,
    Button,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
  import { Icon, Label as SmLabel, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {BASE_URL} from "../../config/baseUrl";

export default function StudentBussingInfo(){
    const [studentBussing, setStudentBussing] = useState([]);
    
    const [hideFilterOptions, setHideFilterOptions] = useState(false);
    const [bussingDate, setBussingDate] = useState("");
    

    const getStudentBussingInfo = async (date) => {
        const response = await axios.get(`${BASE_URL}/react_admin/town_bussing_aggregate?date=${date}`);        
        await setStudentBussing(response.data);
    }
    useEffect(() => {
        let defaultDate = moment().startOf('week');
        setBussingDate(moment(defaultDate).format("YYYY-MM-DD"));
        getStudentBussingInfo(moment(defaultDate).format("YYYY-MM-DD"));
    },[]);

    const handleDateChange = (obj) => {
        let selectedDate = moment(obj.startDate).format("YYYY-MM-DD");
        console.log(selectedDate)
        setBussingDate(selectedDate);
        getStudentBussingInfo(selectedDate);
    }

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col-md-4">
                        <h3 className="mb-0">Constituency Bussing on<br />on {moment(bussingDate).format("DD-MMM-YYYY")}</h3>
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Constituency</Table.HeaderCell>
                        <Table.HeaderCell>Con Rep</Table.HeaderCell>
                        <Table.HeaderCell>Total Number Bussed</Table.HeaderCell>
                        <Table.HeaderCell>Total Students Present</Table.HeaderCell>
                        <Table.HeaderCell>Total Students that Bussed</Table.HeaderCell>
                        <Table.HeaderCell>Total Students that Didn't Bussed</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        studentBussing.map((item, key) => (
                            <Table.Row key={key}>
                                <Table.Cell>
                                    <SmLabel>{item.region_name}</SmLabel>
                                </Table.Cell>
                                <Table.Cell>{item.con_rep}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalNumberBussed}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsPresent}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsThatBussed}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsThatDidntBus}</Table.Cell>
                            </Table.Row>
                            )
                        )
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            {/* put totals here */}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Card>
    );
}