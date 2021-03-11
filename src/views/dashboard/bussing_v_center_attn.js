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
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";

export default function Bussing_V_Center_Attn({chartOptions}){
    const rand = () => Math.round(Math.random() * 20)
    const [labels, setLabels] = useState([]);
    const [bussingData, setBussingData] = useState([]);
    const [centerServiceData, setCenterServiceData] = useState([]);


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

    

    const handleToggleNav = (e, index) => {
        //index 1 -> Month 
        //index 2 -> Week



    }

    useEffect(() => {
        
        getBussing_v_CenterValues();
        
    },[]);

    return (
        <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                    Overview
                    </h6>
                    <h2 className="text-white mb-0">Bussing Attn VS Center Service Attn</h2>
                </div>
                
                <div className="col">
                    <FormGroup>
                        <Label for="exampleSelect">Filter Options</Label>
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

                <div className="col">
                    <Nav className="justify-content-end" pills>
                    <NavItem>
                        <NavLink
                        className={classnames("py-2 px-3", {
                            active: true
                        })}
                        href="#pablo"
                        onClick={e => handleToggleNav(e, 1)}
                        >
                        <span className="d-none d-md-block">Month</span>
                        <span className="d-md-none">M</span>
                        </NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink
                        className={classnames("py-2 px-3", {
                            active: false
                        })}
                        data-toggle="tab"
                        href="#pablo"
                        onClick={e => handleToggleNav(e, 2)}
                        >
                        <span className="d-none d-md-block">Week</span>
                        <span className="d-md-none">W</span>
                        </NavLink>
                    </NavItem> */}
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
                                fill: false,
                                data: bussingData,
                            },
                            {
                                type: 'bar',
                                label: 'Center Service Attn',
                                backgroundColor: 'rgb(255, 99, 132)',
                                data: centerServiceData,
                                borderColor: 'white',
                                borderWidth: 2,
                                fill: false,
                            }
                            ]
                            }}
                        
                        options={chartOptions}
                        getDatasetAtEvent={e => console.log(e)}
                    />
                </div>
            </CardBody>
        </Card>
    );

}