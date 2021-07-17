import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Row,
    Button,
    FormGroup,
    Label,
    Input,
    Spinner
  } from "reactstrap";
  import { Link, useLocation } from "react-router-dom";
  import { Icon, Label as SmLabel, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {BASE_URL} from "../../config/baseUrl";

export default function StudentCenterService(){
    const [centerServiceAtn, setCenterServiceAttn] = useState([]);
    const [hideFilterOptions, setHideFilterOptions] = useState(false);
    const [serviceDate, setServiceDate] = useState("");
    const [loading, setLoading] = useState(false);

    const getStudentCenterServiceInfo = async (date) => {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/react_admin/center_service_aggregate?date=${date}`);        
        await setCenterServiceAttn(response.data);
        setLoading(false);
    }

    useEffect(() => {
        let defaultDate = moment().day('Thursday');
        setServiceDate(moment(defaultDate).format("YYYY-MM-DD"));
        getStudentCenterServiceInfo(moment(defaultDate).format("YYYY-MM-DD"));

        return () => {
            //put unmount code here ...
        }

    },[]);

    const handleDateChange = (obj) => {
        let selectedDate = moment(obj.startDate).format("YYYY-MM-DD");
        
        setServiceDate(selectedDate);
        getStudentCenterServiceInfo(selectedDate);
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
                        <h3 className="mb-0">Constituency Center Service on<br />on {moment(serviceDate).format("DD-MMM-YYYY")}</h3>
                        {loading && <Spinner color="primary" />}
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
                            <input type="text" className="form-control col-4" value={serviceDate} readOnly/>
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
                        <Table.HeaderCell><h4>Total Center Service Attendance</h4></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        centerServiceAtn.map((item, key) => (
                            <Table.Row key={key}>
                                <Table.Cell >
                                    <Link
                                        to={`/admin/student_center_service/${item.region_id}?date=${serviceDate}`}
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
                                <Table.Cell>{item.centerServiceStats.totalAttendance}</Table.Cell>
                                
                            </Table.Row>
                            )
                        )
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                        <Link
                            to={`/admin/all_constituency_monthly_charts`}
                        >
                            <SmLabel 
                                style={{cursor:'pointer'}}                
                            >
                            <h4>{"FLC Anagkazo Bacenta/Center Service Grand Totals"}</h4>
                            </SmLabel>
                        </Link>
                        </Table.HeaderCell>
                        <Table.HeaderCell >
                            {
                            centerServiceAtn.reduce((prev, currentVal) => 
                               prev + currentVal.centerServiceStats.totalAttendance
                            ,0)
                            }
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Card>
    );
}