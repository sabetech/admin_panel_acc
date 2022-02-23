import React from "react";
import Header_Plain from "components/Headers/Header_plain";
import { useLocation } from "react-router-dom";
import {Breadcrumbs, Typography, Link} from '@material-ui/core/';
import {
    Container
  } from "reactstrap";
import {BASE_URL} from "../../config/baseUrl";
import SSMG_ChartDisplay from "./ssmg_chart_display";
import {ssmg_array} from "./campaigns";

export default function AllConstituencySSMG({showCharts}) {
 
    const location = useLocation();
    const pathName = location.pathname;
    const requestUrl = BASE_URL+pathName+"/constituencies/0";
    
    
    return (
        <>
            <Container>
                {
                    showCharts && ssmg_array.map((item, index) => <SSMG_ChartDisplay key={index} ssmg_name={item} requestUrl={requestUrl} source={"all constituen"}/>)
                }
            </Container>
        </>
    );
}