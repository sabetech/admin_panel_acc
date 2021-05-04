import React, {useEffect, useState} from "react";
import Header_Plain from 'components/Headers/Header_plain';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Label
  } from "reactstrap";
  import { Bar } from "react-chartjs-2";
  import { Icon, Label as SmLabel, Menu, Table } from 'semantic-ui-react';
  import DateRangePicker from 'react-bootstrap-daterangepicker';
  import moment from 'moment';
  import axios from 'axios';
  import { useLocation } from "react-router-dom";
  import {BASE_URL} from "../../../config/baseUrl";


export default function ConstituencyDetail(){

    let location = useLocation();
    useEffect(() => {
        //get the chart values for a particular constituency
        loadConstituencyDetail(location.pathname);

    },[]);

    const loadConstituencyDetail = (pathname) => {
        return axios.get(`${BASE_URL}/react_admin${pathname}`)
          .then((response) => 
          {
            console.log(response.data);
          });
    }
    
    return (
        <>
            <Header_Plain title={"Mampong Constituency - Rev Dr Kumah Agyemang"}/>
            <div style={{ width: '100%' }}>
                <Card className="shadow">
                    <CardHeader className=" bg-transparent">
                        <CardBody style={{ width: '100%' }}>
                            <Bar
                                data={{
                                    labels: ['January','Febrary', 'March', 'April'],
                                    datasets: [
                                    {
                                        type: 'bar',
                                        label: 'Town Bussing Average',
                                        borderColor: 'rgb(54, 162, 235)',
                                        backgroundColor: 'rgb(255, 99, 132)',
                                        borderWidth: 2,
                                        data: [21,32,14,24],
                                    }]
                                }}
                            />

                        <Row className="mt-5">
                            <Col className="mb-5 mb-xl-0" >
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
                                            
                                        }
                                    }
                                >    
                                    <input type="text" className="form-control col-4" readOnly/>
                                </DateRangePicker>
                            </div>

                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Center</Table.HeaderCell>
                                            <Table.HeaderCell>Student</Table.HeaderCell>
                                            <Table.HeaderCell>Number Bussed</Table.HeaderCell>
                                            <Table.HeaderCell>Present</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row >
                                            <Table.Cell >
                                                Center 1
                                            </Table.Cell>
                                            <Table.Cell>Etienne Pierre Louis</Table.Cell>
                                            <Table.Cell>13</Table.Cell>
                                            <Table.Cell>present</Table.Cell>
                                        </Table.Row>
                                        <Table.Row >
                                            <Table.Cell >
                                                
                                            </Table.Cell>
                                            <Table.Cell>Calel Okoro</Table.Cell>
                                            <Table.Cell>13</Table.Cell>
                                            <Table.Cell>present</Table.Cell>
                                        </Table.Row>
                                        <Table.Row >
                                            <Table.Cell >
                                                
                                            </Table.Cell>
                                            <Table.Cell>Steve Johnson</Table.Cell>
                                            <Table.Cell>13</Table.Cell>
                                            <Table.Cell>present</Table.Cell>
                                        </Table.Row>
                                        <Table.Row >
                                            <Table.Cell >
                                                
                                            </Table.Cell>
                                            <Table.Cell>Joseph Lemou</Table.Cell>
                                            <Table.Cell>13</Table.Cell>
                                            <Table.Cell>present</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Col>
                        </Row>
                        </CardBody>
                    </CardHeader>
                </Card>
            </div>
            

            
            
        </>
    )

}