import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

const MapWrapper = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 5.9486601, lng: -0.1516862 }}
        defaultOptions={{
          scrollwheel: false,
          styles: [
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [{ color: "#444444" }]
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [{ color: "#f2f2f2" }]
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [{ visibility: "simplified" }]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [{ color: "#5e72e4" }, { visibility: "on" }]
            }
          ]
        }}
      >
        <Marker position={{ lat: 5.9486601, lng: -0.1516862 }} />
      </GoogleMap>
    ))
  );

  export default function MapMountains(){

    return (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <MapWrapper
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key="
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{ height: `600px` }}
                      className="map-canvas"
                      id="map-canvas"
                    />
                  }
                  mapElement={
                    <div style={{ height: `100%`, borderRadius: "inherit" }} />
                  }
                />
              </Card>
            </div>
          </Row>
        </Container>
    );

  }