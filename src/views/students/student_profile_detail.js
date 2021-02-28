import React, {useEffect, useState} from "react";
import UserHeader from "components/Headers/UserHeader.js";
import {useLocation} from "react-router-dom";
import {BASE_URL} from "../../config/baseUrl";
import { Badge } from "reactstrap";
import { Image, List, Placeholder, Modal } from 'semantic-ui-react';
import { Bar } from "react-chartjs-2";

//import RenderStudentSummary from "profile_summaries";

import axios from 'axios';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
  } from "reactstrap";

export default function Student_Profile_Detail({student_id}){

    const [studentProfileInformation, setStudentProfileInformation] = useState({});
    const [activeSummaryDetail, setActiveDetail] = useState("Click on a Summary to show Detail");
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartTitle, setChartTitle] = useState("");


    let location = useLocation();

    useEffect(() => {
        loadStudentProfile();
    },[]);

    const loadStudentProfile = () => {
        
        return axios.get(`${BASE_URL}/react_admin${location.pathname}`)
          .then((response) => 
          {
            console.log(response.data);
            setStudentProfileInformation(response.data);
          });
    }

    const RenderStudentSummary = () => {

      return (
        (typeof studentProfileInformation.student_profile !== 'undefined') ?
        <List divided selection verticalAlign='middle'>  
            <RenderPrayerSummary prayer_logs={studentProfileInformation.student_profile?.prayer_logs}/>
            <RenderVisitationSummary visitation_logs={studentProfileInformation.student_profile?.sheep_seeking}/>
            <RenderCounsellingSummary counselling_logs={studentProfileInformation.student_profile?.counsellings}/>
            <RenderOutreachSummary outreach_logs={studentProfileInformation.student_profile?.outreach}/>
            <RenderBussingSummary bussing_logs={studentProfileInformation?.student_bussing_history}/>
            <RenderCenterServiceSummary center_services={studentProfileInformation.student_profile?.student_center_service} />
        </List>
        :
        <div className="ui placeholder">
          <div className="image header">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="image header">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="image header">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="image header">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div> 
        
      );
    }

    const RenderMembers = () => {
      //get members
      return (
        (typeof studentProfileInformation.student_profile !== 'undefined') ?
          <List>
            {studentProfileInformation.student_profile.members.map((member, index) => 
                <List.Item key={index} style={{padding: 10}}>
                  <Image circular src={`http://anagkazo.firstlovegallery.com/${member.photo_url}`} size="mini"/>
                  <List.Content>
                    <List.Header as='a'>{member.name}</List.Header>
                    <List.Description>
                      {member.phone}
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
          </List>
          :
          ""
      );
    }

    const RenderPrayerSummary = ({prayer_logs}) => {
      const prayer_hours_sum = prayer_logs.reduce((prev, cur) => prev + cur.number_of_hours, 0);

      return (
      <List.Item
        onClick = {() => {
          setActiveDetail("Prayer Logs");
          setChartTitle("Prayer Chart");

          setChartData(prayer_logs.map((o) => o.number_of_hours));

          setChartLabels(
            prayer_logs.map((o) => new Date(o.date_prayed)
            .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})));
        }}
      >
        <List.Content floated='right'>
          {prayer_hours_sum}
        </List.Content>
        <Image avatar src='http://www.clker.com/cliparts/L/A/1/9/z/W/praying-hands-rt.svg' />
        <List.Content>
          <List.Header>Prayer (Number of Hours): </List.Header>
        </List.Content>
      </List.Item>
      );

    }

    const RenderVisitationSummary = ({visitation_logs}) => {
      const visitations = visitation_logs.length;
      return (
        <List.Item
          onClick = {() => {
            setActiveDetail("Visitations");
            setChartTitle("Visitations");

            let sumedVisitationLogs = {};
            let prev = visitation_logs[0];
            let sum = 0;

            for(let i = 0; i < visitation_logs.length; i++){
              if (prev.date === visitation_logs[i].date) {
                sum++;
              }else{
                sum = 1;
              }

              sumedVisitationLogs[visitation_logs[i].date] = sum;
              prev = visitation_logs[i];
            }

            setChartLabels(
              Object.keys(sumedVisitationLogs).map((o) => new Date(o)
                        .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}))
            )

            setChartData(Object.values(sumedVisitationLogs));
            
          }}
        > 
          <List.Content floated='right'>
            {visitations}
          </List.Content>
          <Image avatar src='https://image.flaticon.com/icons/png/512/10/10694.png' />
          <List.Content>
            <List.Header>Number of Visitations: </List.Header>
          </List.Content>
        </List.Item>
        );
    }

    const RenderCounsellingSummary = ({counselling_logs}) => {
      const counsellings = counselling_logs.length;
      return (
        <List.Item
          onClick = {() => {
            setActiveDetail("Counselling");
            setChartTitle("Counselling");

            let summedCounsellings = {};
            let prev = counselling_logs[0];
            let sum = 0;

            for(let i = 0; i < counselling_logs.length; i++){
              if (prev.date === counselling_logs[i].date) {
                sum++;
              }else{
                sum = 1;
              }

              summedCounsellings[counselling_logs[i].date] = sum;
              prev = counselling_logs[i];
            }

            setChartLabels(
              Object.keys(summedCounsellings).map((o) => new Date(o)
                        .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}))
            )

            setChartData(Object.values(summedCounsellings));

          }}
        >
          <List.Content floated='right'>
            {counsellings}
          </List.Content>
          <Image avatar src='https://listimg.pinclipart.com/picdir/s/35-357266_benefit-counseling-pierce-benefits-interview-icon-png-clipart.png' />
          <List.Content>
            <List.Header>Number of Counsellings: </List.Header>
          </List.Content>
        </List.Item>
        );
    }

    const RenderOutreachSummary = ({outreach_logs}) => {
      const outreaches = outreach_logs.length;
      return (
        <List.Item onClick = 
        {() => {
            setActiveDetail("Outreach");
            setChartTitle("Outreach");

            let summedOutreaches = {};
            let prev = outreach_logs[0];
            let sum = 0;

            for(let i = 0; i < outreach_logs.length; i++){
              if (prev.date === outreach_logs[i].date) {
                sum++;
              }else{
                sum = 1;
              }

              summedOutreaches[outreach_logs[i].date] = sum;
              prev = outreach_logs[i];
            }

            setChartLabels(
              Object.keys(summedOutreaches).map((o) => new Date(o)
                        .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}))
            )

            setChartData(Object.values(summedOutreaches));


        }}>
          <List.Content floated='right'>
            {outreaches}
          </List.Content>
          <Image avatar src='https://static.thenounproject.com/png/1151430-200.png' />
          <List.Content>
            <List.Header>Souls Won: </List.Header>
          </List.Content>
        </List.Item>
        );
    }

    const RenderBussingSummary = ({bussing_logs}) => {
      const bussing_average = (bussing_logs.reduce((prev, cur) => prev + cur.value, 0) / bussing_logs.length).toFixed(2);
      return (
        <List.Item onClick = 
        {() => {
          setActiveDetail("Bussing");
          setChartTitle("Bussing");

          setChartLabels(bussing_logs.map((o) => 
            new Date(o.title)
            .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}))
            );

          setChartData(bussing_logs.map((o) => o.value));

        }}>
          <List.Content floated='right'>
            {bussing_average}
          </List.Content>
          <Image avatar src='https://simg.nicepng.com/png/small/51-517562_image-set-png-128x128-px-shuttle-bus-icon.png' />
          <List.Content>
            <List.Header>Bussing Average: </List.Header>
          </List.Content>
        </List.Item>
        );
    }

    const RenderCenterServiceSummary = ({center_services}) => {
      const center_service_average = (center_services.reduce((prev, cur) => prev + cur.number_of_souls, 0) / center_services.length).toFixed(2);
      return (
        <List.Item onClick={() => {
          setActiveDetail("Center Service");
          setChartTitle("Center Services");

          setChartLabels(center_services.map((o) => 
            new Date(o.date_of_service)
            .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}))
            );

          setChartData(center_services.map((o) => o.number_of_souls));

        }}>
          <List.Content floated='right'>
            {center_service_average}
          </List.Content>
          <Image avatar src='https://cdn.iconscout.com/icon/premium/png-128-thumb/church-339-556352.png' />
          <List.Content>
            <List.Header>Center Service Average: </List.Header>
          </List.Content>
        </List.Item>
      );
    }

    const RenderBarChart = () => {

      return (
        <Bar
            data={{
                    labels: chartLabels,
                    datasets: [
                    {
                        type: 'bar',
                        label: chartTitle,
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        fill: false,
                        data: chartData,
                    }]
                }}
        />
      );

    }

    return (
        <>
        <UserHeader student_name={studentProfileInformation.student_profile?.name || ""} photo_url={studentProfileInformation.student_profile?.photo_url}/>
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {
                        (typeof studentProfileInformation !== 'undefined') ?
                          <img
                            alt="..."
                            src={`https://anagkazo.firstlovegallery.com/${studentProfileInformation.student_profile?.photo_url}`}
                          />
                        :
                        <Placeholder>
                          <Placeholder.Image square />
                        </Placeholder>
                        }
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Members</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Points</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Ave Bussing</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {studentProfileInformation.student_profile?.name}
                      <span className="font-weight-light">, {studentProfileInformation.student_profile?.age}</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                     {studentProfileInformation.student_profile?.home_church}, {studentProfileInformation.student_profile?.country}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {studentProfileInformation.student_profile?.class}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      <Badge color="success" pill>
                        Center Leader
                      </Badge>
                      <Badge color="info" pill>
                        Basonta Leader
                      </Badge>
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Summary</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Details
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <RenderStudentSummary />
                </CardBody>
            </Card>
          </Col>
          {/*  */}
          <Col className="order-xl-3 mb-5 mb-xl-0" xl="8">
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ministerial Skills - {activeSummaryDetail} </h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Switch Chart
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <RenderBarChart />
                  </div>
                </CardBody>
            </Card>
          </Col>
          
          <Col className="order-xl-4 mb-5 mb-xl-0" xl="4">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Members</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Details
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <RenderMembers />
                </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
    );

}