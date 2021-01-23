import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip
  } from "reactstrap";
  import centers_locations from "../../assets/resources/centers_locations.json";
  


export default function centerlist(){

    return (
        <Card className="shadow">
            <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                        <h3 className="mb-0">Centers</h3>
                    </div>
                </Row>
            </CardHeader>
            <CardBody style={{overflowY: 'scroll', height: 660 }}>
            <Table className="align-items-center" responsive hover>
                <tbody>
                    {
                    centers_locations.center_coordinates.map(center => (
                        <tr>
                        <th scope="row">
                        <Media className="align-items-center">
                            <a
                                className="avatar rounded-circle mr-3 text-white bg-blue"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                            <i className="ni ni-air-baloon"></i>
                        </a>
                        <Media>
                            <span className="mb-0 text-sm">
                            {center.location}
                            </span>
                        </Media>
                        </Media>
                        </th>
                    </tr>
                    ))
                    }
                    
                </tbody>
            </Table>

            </CardBody>

            
        </Card>
    );
}