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
    sontaLeaderCount: 0,
    bacenta_leader_count: 0
  };

  cancelTokenSource = null;

  componentDidMount(){
    this.cancelTokenSource = axios.CancelToken.source();
    //get student count 
    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/students',
      method: 'GET',
      cancelToken: this.cancelTokenSource.token
    }).then((response) => {
      this.setState({studentsCount: response.data.length})
    }).catch(e => console.log(e));

    //get gso count
    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/gsos',
      method: "GET",
      cancelToken: this.cancelTokenSource.token
    }).then((response) => {
      this.setState({gsos: response.data.length});
    });

    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/centers_count',
      method: "GET",
      cancelToken: this.cancelTokenSource.token
    }).then((response) => {
      this.setState({centerleaderCount: response.data.center_count});
    });

    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/sonta_count',
      method: "GET",
      cancelToken: this.cancelTokenSource.token
    }).then((response) => {
      this.setState({sontaLeaderCount: response.data.sonta_leader_count});
    });

    axios({
      url: 'https://anagkazo.firstlovegallery.com/api/admin_app/bacenta_leaders_count',
      method: 'GET',
      cancelToken: this.cancelTokenSource.token
    }).then((response) => {
      this.setState({bacenta_leaders_count: response.data.bacenta_leader_count.length});
    })

  }

  componentWillUnmount(){
    this.cancelTokenSource.cancel("with a message?");
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="4" xl="2">
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
                            <i className="fas fa-graduation-cap" />
                          </div>
                        </Col>
                      </Row>
                    </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Link to={"/admin/con_reps"}>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Constit. Reps
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
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                        <Link to={"/admin/students/center_leaders"}>
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
                        </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                    <Link to={"/admin/students/sonta_leaders"} >
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
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                    <Link to={"/admin/students/bacenta_leaders"} >
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Bacenta Leaders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            { this.state.bacenta_leaders_count }
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fa fa-bus" />
                          </div>
                        </Col>
                      </Row>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                    <Link to={"/admin/students/church_planters"} >
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Church Planters
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {(this.state.studentsCount - this.state.bacenta_leaders_count) + ""}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                            <i className="fa fa-seedling" />
                          </div>
                        </Col>
                      </Row>
                      </Link>
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
