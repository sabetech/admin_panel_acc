import React, {useState, useEffect} from "react";
import {
    
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    FormGroup,
    Label,
    Input,
    Nav,
    Row
  } from "reactstrap";
import classnames from "classnames";
// import Chart from "chart.js";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";
import {Reveal} from 'semantic-ui-react'

export default function Bussing_V_Center_Attn({chartOptions}){
    
    const [labels, setLabels] = useState([]);
    const [bussingData, setBussingData] = useState([]);
    const [centerServiceData, setCenterServiceData] = useState([]);
    const [chartVisibility, setChartVisibility] = useState(true);
    const [barChartOptionsDisenabled, setBarChartOptionsDisenabled] = useState(true);


    //get the bussing data from here ...
    const getBussing_v_CenterValues =  async () => {

        const response = await axios.get(`${BASE_URL}/react_admin/bussing_v_center`);
        await setLabels(response.data.bussingByMonth.map(item => `${item.month_name} ${item.year}`));
        await setBussingData(response.data.bussingByMonth.map(item => `${item.number_bussed}`));
        await setCenterServiceData(response.data.bussingByMonth.map(({month, year}) => {
                 let centerVal = response.data.centerValuesByMonth.find(
                                        (item) => ((item.month === month) && (item.year === year))
                                );
                                if (typeof centerVal !== 'undefined'){
                                    return centerVal.attn;
                                }
                                return 0;
        }));
    }

    const handleSelect = (e) => {
        console.log(e);
    }
    
    useEffect(() => {
        
        getBussing_v_CenterValues();
        
    },[]);

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    return (
        <Reveal animated='move down' disabled={barChartOptionsDisenabled}>
            <Reveal.Content visible={chartVisibility} style={{width:'100%'}}>
                <Card className="bg-gradient-default shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                                </h6>
                                <h2 className="text-white mb-0">Bussing Attendance</h2>
                            </div>
                            
                            <div className="col">
                                <Nav className="justify-content-end" pills>
                                    <NavItem>
                                        <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: true
                                        })}
                                        onClick={ e => {
                                            setBarChartOptionsDisenabled(false);
                                            setChartVisibility(true)
                                        } 
                                            
                                        }
                                        >
                                        <span className="d-none d-md-block">Options</span>
                                        <span className="d-md-none">M</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className="chart">
                            <Bar
                                data={{
                                    labels: labels,
                                    datasets: [
                                    {
                                        type: 'bar',
                                        label: 'Bussing',
                                        borderColor: 'rgb(54, 162, 235)',
                                        borderWidth: 2,
                                        data: bussingData,
                                    }
                                    // ,
                                    // {
                                    //     type: 'bar',
                                    //     label: 'Center Service Attn',
                                    //     backgroundColor: 'rgb(255, 99, 132)',
                                    //     data: centerServiceData,
                                    //     borderColor: 'white',
                                    //     borderWidth: 2,
                                    //     fill: false,
                                    // }
                                    ]
                                    }}
                                
                                options={chartOptions}
                                getDatasetAtEvent={e => console.log(e)}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Reveal.Content> 



            <Reveal.Content hidden={chartVisibility} style={{height:'100%'}}>
                <Card className="bg-gradient-default shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h2 className="text-white mb-0">Chart Options</h2>
                            </div>

                            <div className="col">
                                <Nav className="justify-content-end" pills>
                                    <NavItem>
                                        <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: true
                                        })}
                                        onClick={ e => setChartVisibility(false) }
                                        >
                                        <span className="d-none d-md-block">Show Chart</span>
                                        <span className="d-md-none">S</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <div className="col">
                                <FormGroup>
                                    <Label for="exampleSelect text-light" >Filter Options</Label>
                                    <Input type="select" name="select" id="filter_options">
                                    <option>Class</option>
                                    <option>Country</option>
                                    <option>UD/NON UD</option>
                                    <option>Community</option>
                                    <option>Center</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup>
                                    <Label for="exampleSelect">Filter Value</Label>
                                    <Input type="select" name="select" id="filter_value">
                                    </Input>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row >
                            <div className="col">
                                <Label>Date Range</Label>
                                <DateRangePicker
                                    initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}
                                    onShow={() => {
                                        //setBarChartOptionsDisenabled(true);
                                    }}
                                    onClick={() => {
                                        setBarChartOptionsDisenabled(true);
                                    }}
                                >
                                    <input type="text" className="form-control" />
                                </DateRangePicker>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Reveal.Content> 
        </Reveal>
    );

}