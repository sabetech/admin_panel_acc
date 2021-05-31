import React, {useState, useEffect} from "react";
import Header_Plain from 'components/Headers/Header_plain';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Container,
    Row,
    Label
  } from "reactstrap";
  import { Bar } from "react-chartjs-2";
  import {BASE_URL} from "../../../config/baseUrl";
  import axios from 'axios';
  import moment from 'moment';

export default function AllConstituencyCharts(){
    const [allConstituencies, setAllConstituencies] = useState([]);

    useEffect(() => {
        
        getAllConstituencies();

    },[]);

    const getAllConstituencies = () => {

        return axios.get(`${BASE_URL}/react_admin/admin/constituencies`)
          .then((response) => 
          {
            setAllConstituencies(response.data);
          });

    }

    const RenderConstituencyBarChart = ({item}) => {
        const [chartData, setChartData] = useState({});
        const [chartDataArray, setChartDataArray] = useState([]);

        

        useEffect(() => {
            
            axios.get(`${BASE_URL}/react_admin/admin/constituencies_bussing_report?constituency_id=${item.id}`)
            .then((response) => {
                
                setChartData(response.data);

                setChartDataArray(response.data.months.map((m, index) => {
                    let numberOfSundays = getNumberOfWeekday(new moment(response.data.year +"-"+(index + 1)+"-"+"01"), 0);
                    return (parseInt(response.data.bussing.find(item => item.month === (index + 1))?.number_bussed || "0") / numberOfSundays).toFixed(0);
                }));

            });

        },[]);

    const getNumberOfWeekday = (date, weekday) => {
        date.date(1);
        var dif = (7 + (weekday - date.weekday()))%7+1;
        
        return Math.floor((date.daysInMonth()-dif) / 7)+1;
    }

        return (
            <Card className=" shadow" body outline color="primary">
                <CardBody>
                    <CardTitle tag="h5">{item?.region_name}</CardTitle>
                    {chartData && <Bar
                        data={{
                            labels: chartData.months,
                            datasets: [
                            {
                                type: 'bar',
                                label: `Town Bussing for ${item?.region_name} Constituency`,
                                borderColor: 'rgb(54, 162, 235)',
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderWidth: 1,
                                data: chartDataArray
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
                                maintainAspectRatio:true
                            }
                        }
                        />
                    }
                </CardBody>
            </Card>
        );
    }

    const RenderConstituencyLabel = () => {

        return (
            <Label>
                Chart Name
            </Label>
        )

    }

    //show all the charts for a constituency
    return (
        <>
            <Header_Plain title={"All Constituency Chart on Monthly Basis"}/>
            <Container className=" mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                            <h3 className=" mb-0">{"All Constituency Chart Summary"}</h3>
                    
                        </CardHeader>
                        <CardBody>
                    
                            {
                                allConstituencies && allConstituencies.map(item => <RenderConstituencyBarChart key={item.id} item={item}/>)
                            }
                            
                        </CardBody>
                    </Card>
                </div>
            </Row>
            </Container>

        </>
    );
}