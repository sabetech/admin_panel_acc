import React, {useEffect, useState} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Bar } from "react-chartjs-2";
import moment from 'moment';

import {
    Col,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Row
  } from "reactstrap";
import classnames from "classnames";
import axios from 'axios';

export default function SSMG_ChartDisplay({ssmg_name, requestUrl, constituency}) {
    const [ssmgResult, setServerResponse] = useState({});
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [dateRange, setDateRange] = useState("Click to Choose Date Range");
    const [dateRangeVal, setDateRangeVal] = useState(null);

    useEffect(() => {
       getSSMG_Info();
    },[]);

    useEffect(() => {

        if (typeof ssmgResult.data === 'undefined') return;

        setChartLabels([...Object.keys(ssmgResult.data)]);
        setChartValues([...Object.values(ssmgResult.data)]);
    },[ssmgResult]);

    useEffect(() => {

        if (dateRangeVal == null) return;

        getSSMG_Info();

    }, [dateRangeVal]);

    //get ssmg
    const getSSMG_Info = async () => {
        try{   
            const response = await axios.get(`${requestUrl}?ssmg=${ssmg_name.requestParam}&date_range=${dateRangeVal}`);
            setServerResponse(response)
            
        }catch(e){
            console.log(e);
        }
    }

    const handleEvent = (event, picker) => {
        //console.log(picker.startDate);
    }

    const handleCallback = (start, end, label) => {
        setDateRange("From: "+start.format("MMM DD, Y")+" to: "+end.format("MMM DD, Y"));
        setDateRangeVal(start.format("Y-MM-DD")+" - "+end.format("Y-MM-DD"));
    }

    return(
        <Row style={{marginTop: 25}}>
            <Col xs="10">
                <Card className="bg-gradient-default shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h4 className="text-uppercase text-light ls-1 mb-1">
                                    SSMG - {(typeof constituency !== 'undefined') ? constituency.region_name:""}
                                </h4>
                                <h2 className="text-white mb-0">{ssmg_name.readableName}</h2>
                            </div>

                            <div className="col">
                                <Nav className="justify-content-end" pills>
                                    <NavItem>
                                        <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: true
                                        })}
                                        >
                                        <DateRangePicker 
                                            onEvent={handleEvent} onCallback={handleCallback}
                                            initialSettings={{
                                                ranges: {
                                                  'Last 7 Days': [
                                                    moment().subtract(6, 'days').toDate(),
                                                    moment().toDate(),
                                                  ],
                                                  'Last 30 Days': [
                                                    moment().subtract(29, 'days').toDate(),
                                                    moment().toDate(),
                                                  ],
                                                  'This Month': [
                                                    moment().startOf('month').toDate(),
                                                    moment().endOf('month').toDate(),
                                                  ],
                                                  'Last Month': [
                                                    moment().subtract(1, 'month').startOf('month').toDate(),
                                                    moment().subtract(1, 'month').endOf('month').toDate(),
                                                  ],
                                                  'All Time': [
                                                      moment().subtract(25, 'year').toDate(),
                                                      moment().toDate()
                                                  ]
                                                },
                                              }}
                                        >
                                            <span className="d-none d-md-block">{dateRange}</span>
                                        </DateRangePicker>
                                        <span className="d-md-none">M</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div >
                            <Bar
                                data={{
                                    labels: chartLabels,
                                    datasets: [
                                    {
                                        type: 'bar',
                                        label: ssmg_name.readableName,
                                        borderColor: 'rgb(54, 162, 235)',
                                        backgroundColor: 'rgb(255, 99, 2)',
                                        borderWidth: 2,
                                        data: chartValues,
                                    }]
                                }}
                                getDatasetAtEvent={e => console.log(e)}
                            />
                        </div>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
    );
}