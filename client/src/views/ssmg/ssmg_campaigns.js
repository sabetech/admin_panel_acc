import React, {useEffect, useState} from "react";
import Header_Plain from "components/Headers/Header_plain";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {Breadcrumbs, Typography, Link} from '@material-ui/core/';
import {
    Container
  } from "reactstrap";
import {BASE_URL} from "../../config/baseUrl";
import SSMG_ChartDisplay from "./ssmg_chart_display";
import { ssmg_array } from "./campaigns";


export default function SSMGCampaigns() {
    
    const [constituencies, setConstituencies] = useState();

    const location = useLocation();
    const requestUrl = BASE_URL+"/admin/ssmg/constituencies/";

    const query = location.search;
    const myParams = new URLSearchParams(query);
    let ssmg_find_text = myParams.get('ssmg_param');
    if (ssmg_find_text === 'BasontaAttendance'){
        ssmg_find_text += "&basonta_field=" + myParams.get('basonta_field')
    }

    useEffect(() => {

        getAllConstituencies();

    },[]);

    const getAllConstituencies = async () => {
        const response = await axios.get(`${BASE_URL}/react_admin/admin/constituencies`);
        setConstituencies(response.data);
    }

    const ssmg_name = ssmg_array.find((item) => item.requestParam === ssmg_find_text);
    
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
                
                <Typography color="textPrimary">SSMG Campaigns</Typography>
            </Breadcrumbs>
            <Container>
                {
                    constituencies && ssmg_name && constituencies.map((item, index) => <SSMG_ChartDisplay key={index} ssmg_name={ssmg_name} requestUrl={requestUrl+item.id} constituency={item}/>)
                }
            </Container>
        </>
    );
}