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
    const [bussingInfo, setBussingInfo] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [regionInfo, setRegionInfo] = useState("");

    let location = useLocation();
    useEffect(() => {
        let pathName = location.pathname
        let query = location.search;

        const myParams = new URLSearchParams(query);
        //get the chart values for a particular constituency
        loadConstituencyDetail(pathName+"?date="+myParams.get('date'));

    },[]);

    useEffect(() => {
        setChartLabels(Object.keys(bussingInfo));
        
        const bussingVals = Object.keys(bussingInfo).map((item) => {
            return bussingInfo[item].reduce((accm, curVal) => {
                return accm + (curVal?.bussingInfo?.number_bussed || 0)
            },0) ;
        });
        
        setChartValues(bussingVals);

    },[bussingInfo]);

    const loadConstituencyDetail = (pathname) => {
        return axios.get(`${BASE_URL}/react_admin${pathname}`)
          .then((response) => 
          {
            console.log(response.data);
            setRegionInfo(response.data.region);
            setBussingInfo(response.data.bussingInfo);
          });
    }
    
    return (
        <>
            <Header_Plain title={"Constituency Rep: "+regionInfo?.region_head || "Loading ..."}/>
            <div style={{ width: '100%' }}>
                <Card className="shadow">
                    <CardHeader className=" bg-transparent">
                        <CardBody style={{ width: '100%' }}>
                        <Bar
                            data={{
                                labels: chartLabels,
                                datasets: [
                                {
                                    type: 'bar',
                                    label: 'Town Bussing Average',
                                    borderColor: 'rgb(54, 162, 235)',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderWidth: 1,
                                    data: chartValues,
                                }]
                            }}
                            options={{maintainAspectRatio:true}}
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
                                        {
                                            Object.keys(bussingInfo).map((item, index) => {
                                                console.log(bussingInfo[item])
                                                return (bussingInfo[item].map((itm, indx) => {
                                                    return (<Table.Row key={indx}>
                                                        <Table.Cell >
                                                            {itm.center.center_name}
                                                        </Table.Cell>
                                                        <Table.Cell>{itm.name}</Table.Cell>
                                                        <Table.Cell>{itm?.bussingInfo?.number_bussed}</Table.Cell>
                                                        <Table.Cell error={!itm?.bussingInfo?.present}>{itm?.bussingInfo?.present == 1 ? "Present" : "Absent"}</Table.Cell>
                                                    </Table.Row>)
                                                }))
                                            })
                                        }
                                        
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