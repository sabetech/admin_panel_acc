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
                        },{
                            requestParam:'AntiBrutish',
                            readableName:'AntiBrutish'
                        },{
                            requestParam:'CentersStarted',
                            readableName:'Centers Started'
                        },
                        {
                            requestParam:'BacentasStarted',
                            readableName:'Bacentas Started'
                        },{
                            requestParam:'WeeklySaturdayAttendance',
                            readableName:'Weekly Saturday Attendance (Bacenta Proliferation)'
                        },{
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_greater_love',
                            readableName:'Greater Love Gospel Choir (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_greater_love',
                            readableName:'Greater Love Gospel Choir (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_dancing_stars',
                            readableName:'Dancing Stars (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_dancing_stars',
                            readableName:'Dancing Stars (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_film_stars',
                            readableName:'Film Stars (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_film_stars',
                            readableName:'Film Stars (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_airport_stars',
                            readableName:'Airport Stars (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_airport_stars',
                            readableName:'Airport Stars (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_ushers',
                            readableName:'Ushers (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_ushers',
                            readableName:'Ushers (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_telepastors',
                            readableName:'Telepastors (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_telepastors',
                            readableName:'Telepastors (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_arrivals',
                            readableName:'Arrivals (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_arrivals',
                            readableName:'Arrivals (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_communion',
                            readableName:'Communion (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_communion',
                            readableName:'Communion (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sat_attn_hearing_seeing',
                            readableName:'Hearing and Seeing (Fri)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=sun_attn_hearing_seeing',
                            readableName:'Hearing and Seeing (Sat)'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=no_people_counselled',
                            readableName:'Number of people Counselled'
                        },
                        {
                            requestParam:'BasontaAttendance&basonta_field=no_counsellors',
                            readableName:'Number of Counsellors'
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