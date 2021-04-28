import React from "react";
import {
    Container,
  } from "reactstrap";

export default function Header_Plain({title}){
    

    return (
        
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            <Container fluid>
                <div className="header-body">
                    <h3>{title}</h3>
                </div>
            </Container>
        </div>
    );


}