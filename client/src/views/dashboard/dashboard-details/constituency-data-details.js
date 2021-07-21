import React, {useEffect, useState} from "react";
import Header_Plain from 'components/Headers/Header_plain';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Label
  } from "reactstrap";
  import { Bar } from "react-chartjs-2";
  import { Table } from 'semantic-ui-react';
  import DateRangePicker from 'react-bootstrap-daterangepicker';
  import moment from 'moment';
  import Typography from '@material-ui/core/Typography';
  import Link from '@material-ui/core/Link';
  import { Link as Url_link } from "react-router-dom";
  import axios from 'axios';
  import { useLocation } from "react-router-dom";
  import {BASE_URL} from "../../../config/baseUrl";
  import Breadcrumbs from '@material-ui/core/Breadcrumbs';


export default function ConstituencyDetail(){
    const [bussingInfo, setBussingInfo] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [regionInfo, setRegionInfo] = useState("");
    const [bussingDate, setBussingDate] = useState("");
    

    const location = useLocation();
    const pathName = location.pathname
    const query = location.search;
    const myParams = new URLSearchParams(query);

    useEffect(() => {
        //get the chart values for a particular constituency
        setBussingDate(myParams.get('date'));

    },[]);

    useEffect(() => {
        loadConstituencyDetail(pathName+"?date="+bussingDate);
    }, [bussingDate]);

    useEffect(() => {
        setChartLabels(Object.keys(bussingInfo));
        
        const bussingVals = Object.keys(bussingInfo).map((item) => {
            return bussingInfo[item].students.reduce((accm, curVal) => {
                return accm + (curVal?.bussingInfo?.number_bussed || 0)
            },0) ;
        });
        
        setChartValues(bussingVals);

    },[bussingInfo]);

    const loadConstituencyDetail = (pathname) => {
        return axios.get(`${BASE_URL}/react_admin${pathname}`)
          .then((response) => 
          {
            setRegionInfo(response.data.region);
            setBussingInfo(response.data.bussingInfo);
          });
    }

    const  handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    
    return (
        <>
           
            <Header_Plain title={"Constituency Rep: "+ regionInfo?.region_head || "Loading ..."}/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to={'/admin/index'} href="/admin/index">
                    Dashboard
                </Link>
                <Typography color="textPrimary">Constituency Bussing Details</Typography>
            </Breadcrumbs>
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
                                    label: 'Town Bussing',
                                    borderColor: 'rgb(54, 162, 235)',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderWidth: 1,
                                    data: chartValues,
                                }]
                            }}
                            options={
                                {
                                    scales: {
                                        yAxes: [
                                        {
                                            ticks: {
                                              beginAtZero: true,
                                            },
                                          },
                                        ],
                                    },
                                    maintainAspectRatio:true,
                                    tooltips: {
                                        callbacks: {
                                            footer: (tooltipItems) => {
                                                let centerLeader;
                                                tooltipItems.forEach(function(tooltipItem) {
                                                    centerLeader = bussingInfo[tooltipItem.label].students.find(item => item.id === bussingInfo[tooltipItem.label].centerLeader.student_id);
                                                });
                                                return 'Center Leader: '+ (centerLeader?.name || "Unknown");
                                            },
                                        }
                                    }
                                }
                            }
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
                                            setBussingDate(obj.startDate.format("YYYY-MM-DD"));
                                        }
                                    }
                                >    
                                    <input type="text" className="form-control col-4" value={bussingDate} readOnly/>
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
                                            Object.keys(bussingInfo).sort().map((item, index) => {
                                                return (bussingInfo[item].students.map((itm, indx) => {
                                                    return (<Table.Row key={indx}>
                                                        <Table.Cell >
                                                            {itm.center.center_name}
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell>
                                                        <Url_link 
                                                            to={`/admin/student/${itm.id}/profile`}
                                                        >{itm.name}
                                                        </Url_link>
                                                        </Table.Cell>
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