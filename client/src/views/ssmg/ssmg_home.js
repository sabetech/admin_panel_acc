import React, {useState, useEffect} from "react";
import classnames from "classnames";
import {
    Card,
    CardHeader,
    Container,
    Row, 
    CardBody,
    TabContent, TabPane,
    Nav, NavItem, NavLink
} from "reactstrap";
import Header from "components/Headers/Header_plain";
import { BASE_URL } from "config/baseUrl";
import axios from 'axios';
import { Icon, Grid, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default function SSMG_home(){
    const [tab, setTabValue] = useState(1);
    const [constituencies, setConstituencies] = useState([])

    const toggleNavs = (e,tabValue) => {
        setTabValue(tabValue);
    }

    //get all constituencies
    useEffect(() => {

        getAllConstituencies();

    },[]);

    const getAllConstituencies = async () => {
        const response = await axios.get(`${BASE_URL}/react_admin/admin/constituencies`);
        setConstituencies(response.data);
    }

    return (
        <>
            <Header />
            <Container className=" mt--7" fluid>
                <Row>
                <div className="col">
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                            <h3 className=" mb-0">{"SSMG"}</h3>
                        </CardHeader>
                        <CardBody>
                        <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        aria-selected={tab === 1}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                        active: tab === 1
                                        })}
                                        onClick={e => toggleNavs(e, 1)}
                                        //href="#pablo"
                                        role="tab"
                                    >
                                    <i className="ni ni-cloud-upload-96 mr-2" />
                                        Constituencies
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={tab === 2}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                        active: tab === 2
                                        })}
                                        onClick={e => toggleNavs(e, 2)}
                                        //href="#pablo"
                                        role="tab"
                                    >
                                    <i className="ni ni-bell-55 mr-2" />
                                        Campaigns
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={tab === 3}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                        active: tab === 3
                                        })}
                                        onClick={e => toggleNavs(e, 3)}
                                        //href="#pablo"
                                        role="tab"
                                    >
                                        <i className="ni ni-calendar-grid-58 mr-2" />
                                        Messages
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <Container fluid>
                            <TabContent activeTab={"tabs" + tab}>
                                <TabPane tabId="tabs1">
                                    <Grid columns={3} divided> 
                                        {
                                            constituencies.map((item) =>
                                                (
                                                <Grid.Column key={item.id}>
                                                    <Label size={'large'} color={'blue'}>
                                                        <Link to={"/admin/ssmg/constituencies?constituency="+item.region_name}>
                                                        <Icon name='folder open' />
                                                        {item.region_name}
                                                        </Link>
                                                    </Label> 
                                                </Grid.Column>     
                                                )
                                            )
                                        }
                                    </Grid>
                                </TabPane>
                                <TabPane tabId="tabs2">
                                    My Nice Tab two
                                </TabPane>
                                <TabPane tabId="tabs3">
                                    My Nice Tab three
                                </TabPane>
                            </TabContent>
                        </Container>
                        </CardBody>
                    </Card>    
                </div>
                </Row>
            </Container>
        </>
    );
}