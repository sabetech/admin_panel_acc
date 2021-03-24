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
    const [bussingCurrentPage, setBussingCurrentPage] = useState([]);
    const [hideFilterOptions, setHideFilterOptions] = useState(false);
    const [bussingDate, setBussingDate] = useState("");
    const [page, setPage] = useState(1);//current page
    const PAGE_COUNT = 15;

    const getStudentBussingInfo = async (date) => {
        const response = await axios.get(`${BASE_URL}/react_admin/student_bussing?date=${date}`);        
        await setStudentBussing(response.data);
        setPageData(page);
    }

    const setPageData = (page_number) => {
        let pageData = studentBussing.slice(((page_number - 1) * PAGE_COUNT), ((page_number - 1) * PAGE_COUNT) + PAGE_COUNT);
        setBussingCurrentPage(pageData);
    }

    useEffect(() => {
        let defaultDate = moment().startOf('week');
        setBussingDate(moment(defaultDate).format("YYYY-MM-DD"));
        getStudentBussingInfo(moment(defaultDate).format("YYYY-MM-DD"));
    },[bussingCurrentPage]);

    const handleDateChange = (obj) => {
        let selectedDate = moment(obj.startDate).format("YYYY-MM-DD");
        setBussingDate(selectedDate);
        getStudentBussingInfo(selectedDate);
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Index Number</Table.HeaderCell>
                        <Table.HeaderCell>Student Name</Table.HeaderCell>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.HeaderCell>Present</Table.HeaderCell>
                        <Table.HeaderCell>Number Bussed</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        bussingCurrentPage.map((item, key) => (
                            <Table.Row key={key}>
                                <Table.Cell>
                                    <SmLabel>{item.student_addmission_number}</SmLabel>
                                </Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.student_class}</Table.Cell>
                                <Table.Cell>{item.present}</Table.Cell>
                                <Table.Cell>{item.number_bussed}</Table.Cell>
                            </Table.Row>
                            )
                        )
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Card>
    );
}