import React, {useState, useEffect} from "react";
import { Pie } from "react-chartjs-2";
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Nav,
    NavItem,
    NavLink
  } from "reactstrap";
  import classnames from "classnames";
  import {BASE_URL} from "../../config/baseUrl";

export default function BussingPieChart({chartOptions}){

    const [labels, setLabels] = useState([]);
    const [bussingData, setBussingData] = useState([]);

    const getBussingPieChart =  async () => {

        const response = await axios.get(`${BASE_URL}/react_admin/bussing_twn_v_students`);
        await setLabels(response.data.labels);
        await setBussingData(response.data.data);

    };

    useEffect(() => {

        getBussingPieChart();

    },[]);

    return (
        <Card className="shadow">
            <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Bussing Pie Chart(Town Vs Students)
                        </h6>
                        <h2 className="mb-0">Students Vrs Town Souls</h2>
                    </div>
                    <div className="col">
                                <Nav className="justify-content-end" pills>
                                    <NavItem>
                                        <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: true
                                        })}
                                        //onClick={ e => setChartVisibility(true) }
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
                {/* Chart */}
                <div className="chart">
                <Pie
                    data={{
                            labels: labels,
                            datasets: [
                            {
                                type: 'pie',
                                label: 'Bussing Pie Chart (Town vrs Students)',
                                borderWidth: 2,
                                data: bussingData,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)'
                                ]
                            }]
                        }}
                    options={{
                        legend: { display: true, position: "top" },
              
                        datalabels: {
                          display: true,
                          color: "white",
                        }
                    }}
                />
                </div>
            </CardBody>
        </Card>
    )

}