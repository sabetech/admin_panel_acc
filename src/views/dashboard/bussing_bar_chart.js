import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Row
  } from "reactstrap";
  import {BASE_URL} from "../../config/baseUrl";

export default function BussingBarChart({chartOptions}){

    const [labels, setLabels] = useState([]);
    const [bussingData, setBussingData] = useState([]);

    const getMontlyBussingValues =  async () => {

        const response = await axios.get(`${BASE_URL}/react_admin/bussing_by_month`);
        await setLabels(response.data.map(item => `${item.month_name} ${item.year}`));
        await setBussingData(response.data.map(item => `${item.number_bussed}`));

    };

    useEffect(() => {

        getMontlyBussingValues();

    },[]);

    return (
        <Card className="shadow">
            <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Monthly Bussing Chart
                    </h6>
                    <h2 className="mb-0">Number of Souls Bussed</h2>
                </div>
                </Row>
            </CardHeader>
            <CardBody>
                {/* Chart */}
                <div className="chart">
                <Bar
                    data={{
                            labels: labels,
                            datasets: [
                            {
                                type: 'bar',
                                label: 'Monthly Bussing',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 2,
                                fill: false,
                                data: bussingData,
                            }]
                        }}
                    options={chartOptions}
                />
                </div>
            </CardBody>
        </Card>
    )

}