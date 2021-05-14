import React, { useEffect, useState } from "react";
import {
    Container
  } from "reactstrap";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
  } from '@material-ui/data-grid';
import Header from "components/Headers/Header.js";
import {BASE_URL} from "../../config/baseUrl";
import axios from "axios";

export default function MinistrySkills(){
    const [ministrySkills, setMinistrySkills] = useState([]);

    let unmounted = false;
    //get ministry skills json from the server
    useEffect(()=>{
        
        loadMinistrySkills();

        return () => {
            unmounted = true;
          }    
    },[]);

    const loadMinistrySkills = () => {
        
        return axios.get(`${BASE_URL}/react_admin/admin/ministry_skills/report`)
                .then((response) => 
                {
                  if (unmounted) return;
                  
                  setMinistrySkills(response.data.items);
                  console.log(response.data);
      
                });
    }

    return (
        <>
          <Header />
          <Container className=" mt--7" fluid>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid 
                    ministrySkills
                />
            </div>
          </Container>
        </>
    );
}