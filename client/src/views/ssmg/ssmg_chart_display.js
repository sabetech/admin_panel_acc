import React, {useEffect, useState} from "react";
import { Link as Url_link } from "react-router-dom";
import { Bar } from "react-chartjs-2";

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

export default function SSMG_ChartDisplay({ssmg_name, requestUrl}) {
    const [ssmgResult, setServerResponse] = useState({});
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);

    useEffect(() => {
       getSSMG_Info();
    },[]);

    useEffect(() => {

        if (typeof ssmgResult.data === 'undefined') return;

        setChartLabels([...Object.keys(ssmgResult.data)]);
        setChartValues([...Object.values(ssmgResult.data)]);
    },[ssmgResult]);

    //get ssmg
    const getSSMG_Info = async () => {
        try{   
            const response = await axios.get(`${requestUrl}?ssmg=${ssmg_name.requestParam}`);
            setServerResponse(response)
        }catch(e){
            console.log(e);
        }
    }

    return(
        <Row style={{marginTop: 25}}>
            <Col xs="10">
                <Card className="bg-gradient-default shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                    SSMG
                                </h6>
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
                                        <span className="d-none d-md-block">Options</span>
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