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
import axios from 'axios';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {

  state = {
    studentsCount: 0,
    gsos: 0,
    centerleaderCount: 0,
    sontaLeaderCount: 0
  };

  componentDidMount(){

    //get student count 
    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/students',
      method: 'GET'
    }).then((response) => {
      this.setState({studentsCount: response.data.length})
    }).catch(e => console.log(e));

    //get gso count
    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/gsos',
      method: "GET"
    }).then((response) => {
      this.setState({gsos: response.data.length});
    });

    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/centers_count',
      method: "GET"
    }).then((response) => {
      this.setState({centerleaderCount: response.data.center_count});
    });

    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/sonta_count',
      method: "GET"
    }).then((response) => {
      this.setState({sontaLeaderCount: response.data.sonta_leader_count});
    });

  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                    <Link to={"/admin/students"}>
                      <Row>
                        <Col>
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Students
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.studentsCount}
                          </span>
                        </Col>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </Link>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Consituency Reps
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.gsos}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Center Leaders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"> {this.state.centerleaderCount} </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sonta Leaders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.sontaLeaderCount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-fire" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
