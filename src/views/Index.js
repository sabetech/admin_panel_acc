/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Bussing_V_Center_Attn from "./dashboard/bussing_v_center_attn";
import BussingBarChart from "./dashboard/bussing_bar_chart";
import TopBussingStudent from "./dashboard/top_bussers";
import TopCenterAttnOffering from "./dashboard/top_centers";
//import MapMountains from "./dashboard/map_mountains";
//import MapAnagkazoCenters from "./dashboard/map_anagkazo_centers";
import Map from "./dashboard/map_centers";
import PrayerTopStudents from "./dashboard/prayer_top_students";
import places from "../assets/resources/centers_locations.json";
import CenterList from "./dashboard/center_lists";


class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>,
            <Col className="mb-5 mb-xl-0" xl="8">
              <Map center={{ lat: 5.8997985, lng: -0.1529652 }}
                    zoom={13}
                    places={places.center_coordinates} />
            </Col>
            <Col>
              <CenterList />
          </Col>
        </Row>
          
          <div style={{height: 80}}>

          </div>
        
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Bussing_V_Center_Attn chartOptions />
            </Col>
            <Col xl="4">
              <BussingBarChart chartOptions/>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <TopBussingStudent />
            </Col>
            {/* <Col xl="4">
              <TopCenterAttnOffering />
            </Col> */}
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <PrayerTopStudents />
            </Col>

            <Col xl="4">

            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;