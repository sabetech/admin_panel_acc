import React, {useState, useEffect} from "react";
import Map from "../dashboard/map_centers";
import CenterList from "../dashboard/center_lists";
import {
    Container,
    Row,
    Col
} from "reactstrap";
import Header from "components/Headers/Header.js";
import places from "../../assets/resources/centers_locations.json";

export default function CenterVenueMap(){


    
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
            </Container>
          </>
        )
    
}