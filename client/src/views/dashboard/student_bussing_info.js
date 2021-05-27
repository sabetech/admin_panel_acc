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
  import { Link, useLocation } from "react-router-dom";
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

        return () => {

        }

    },[]);

    const handleDateChange = (obj) => {
        let selectedDate = moment(obj.startDate).format("YYYY-MM-DD");
        
        setBussingDate(selectedDate);
        getStudentBussingInfo(selectedDate);
    }

    const handleConstituencyClick = (e, x) => {
        //go to the constituency page
        console.log(x);

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
                            <input type="text" className="form-control col-4" value={bussingDate} readOnly/>
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
                        <Table.HeaderCell><h4>Constituency</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Con Rep</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Town Souls Bussed</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Students Present</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Total Number Bussed</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Students that Bussed</h4></Table.HeaderCell>
                        <Table.HeaderCell><h4>Students that Didn't Bus</h4></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        studentBussing.map((item, key) => (
                            <Table.Row key={key}>
                                <Table.Cell >
                                    <Link
                                        to={`/admin/constituency/${item.region_id}?date=${bussingDate}`}
                                        >
                                        <SmLabel 
                                            style={{cursor:'pointer'}}
                                            onClick={handleConstituencyClick}
                                        >
                                            {item.region_name}
                                        </SmLabel>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{item.con_rep}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalNumberBussed}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsPresent}</Table.Cell>
                                <Table.Cell>{(item.bussingStats.totalStudentsPresent + item.bussingStats.totalNumberBussed)}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsThatBussed}</Table.Cell>
                                <Table.Cell>{item.bussingStats.totalStudentsThatDidntBus}</Table.Cell>
                            </Table.Row>
                            )
                        )
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            <h4>{"FLC Anagkazo Grand Totals"}</h4>
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            studentBussing.reduce((prev, currentVal) => 
                               prev + currentVal.bussingStats.totalNumberBussed
                            ,0)
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            studentBussing.reduce((prev, currentVal) => 
                               prev + currentVal.bussingStats.totalStudentsPresent
                            ,0)
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            studentBussing.reduce((prev, currentVal) => 
                               prev + (currentVal.bussingStats.totalStudentsPresent + currentVal.bussingStats.totalNumberBussed)
                            ,0)
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            studentBussing.reduce((prev, currentVal) => 
                               prev + currentVal.bussingStats.totalStudentsThatBussed
                            ,0)
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            studentBussing.reduce((prev, currentVal) => 
                               prev + currentVal.bussingStats.totalStudentsThatDidntBus
                            ,0)
                            }
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Card>
    );
}