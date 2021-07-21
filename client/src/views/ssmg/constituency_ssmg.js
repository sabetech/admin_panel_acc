import React from "react";
import Header_Plain from "components/Headers/Header_plain";
import { useLocation } from "react-router-dom";
import {Breadcrumbs, Typography, Link} from '@material-ui/core/';
import {
    Container
  } from "reactstrap";
import {BASE_URL} from "../../config/baseUrl";
import SSMG_ChartDisplay from "./ssmg_chart_display";

export default function ConstituencySSMG() {
 
    const location = useLocation();
    const pathName = location.pathname;
    const requestUrl = BASE_URL+pathName;

    const query = location.search;
    const myParams = new URLSearchParams(query);
    
    const ssmg_array = [{
                            requestParam :'SAT',
                            readableName: 'Servants Armed And Trained'
                        }, {
                            requestParam:'HearingAndSeeing',
                            readableName:'Hearing And Seeing'
                        }
                    ];

    return (
        <>
            <Header_Plain title={myParams.get('constituency')}/>
            <Breadcrumbs aria-label="breadcrumb">
                
                    <Link color="inherit" to={'/admin/index'} href="/admin/index">
                        Dashboard
                    </Link>
                
                
                    <Link color="inherit" to={'/admin/ssmg'} href="/admin/ssmg">
                        SSMG Home
                    </Link>
                
                <Typography color="textPrimary">SSMG Constituency Details</Typography>
            </Breadcrumbs>
            <Container>
                {
                    ssmg_array.map((item, index) => <SSMG_ChartDisplay key={index} ssmg_name={item} requestUrl={requestUrl} />)
                }
            </Container>
        </>
    );
}