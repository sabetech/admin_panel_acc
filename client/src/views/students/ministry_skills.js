import React, { useEffect, useState } from "react";
import {
    Container, Card, CardHeader, CardBody, Spinner
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
    const [loading, setLoading] = useState(false);

    const columns = [
        { field: 'index_number', headerName: 'Index Number', width: 100 },
        { field: 'student_name', headerName: 'Name', width: 130 },
        { field: 'class', headerName: 'Class', width: 130 },
        { 
            field: 'Prayer', 
            headerName: 'Prayer Point', width: 100,
            valueGetter: (params) => `${params.row.prayerPoint.prayerPoint}`
        },
        { 
            field: 'sheepSeeking', 
            headerName: 'Visitation', width: 130,
            valueGetter: (params) =>`${params.row.sheepSeeking.VisitPoint}`
        },
        { 
            field: 'counselling', 
            headerName: 'Counselling', width: 130,
            valueGetter: (params) =>`${params.row.counselling.counselPoint}`
        },
        { 
            field: 'multiplication', 
            headerName: 'Outreach', width: 130,
            valueGetter: (params) =>`${params.row.multiplication.outreachPoint}`
        },
        { 
            field: 'basonta', 
            headerName: 'Basonta', width: 100,
            valueGetter: (params) =>`${params.row.basonta.basontaPoint}`
        },
        { 
            field: 'SAT', 
            headerName: 'SAT', width: 80,
            valueGetter: (params) =>`${params.row.sat.satMaterialsPoint}`
        },
        { 
            field: 'ucPoint', 
            headerName: 'Understanding Campaign', width: 100,
            valueGetter: (params) =>`${params.row.ucPoint.ucPassPoint}`
        },
        { 
            field: 'bussingPoint', 
            headerName: 'Bussing', width: 130,
            valueGetter: (params) =>`${params.row.bussingPoint.bussingPoint}`
        },
        {
            field: 'sum_point',
            headerName: 'Total %', width: 100,
            valueGetter: (params) => (parseInt(params.row.bussingPoint.bussingPoint) + 
                                     parseInt(params.row.ucPoint.ucPassPoint) + 
                                     parseInt(params.row.sat.satMaterialsPoint) + 
                                     parseInt(params.row.basonta.basontaPoint) + 
                                     parseInt(params.row.multiplication.outreachPoint) + 
                                     parseInt(params.row.counselling.counselPoint) + 
                                     parseInt(params.row.sheepSeeking.VisitPoint) + 
                                     parseInt(params.row.prayerPoint.prayerPoint)) + "%"                      
        },
        {
            field: 'total_point',
            headerName: 'Point', width: 100,
            valueGetter: (params) => (parseInt(params.row.bussingPoint.bussingPoint) + 
                                    parseInt(params.row.ucPoint.ucPassPoint) + 
                                    parseInt(params.row.sat.satMaterialsPoint) + 
                                    parseInt(params.row.basonta.basontaPoint) + 
                                    parseInt(params.row.multiplication.outreachPoint) + 
                                    parseInt(params.row.counselling.counselPoint) + 
                                    parseInt(params.row.sheepSeeking.VisitPoint) + 
                                    parseInt(params.row.prayerPoint.prayerPoint)
                                    ) > 80 ? 100:0
        }
    ];

    let unmounted = false;
    //get ministry skills json from the server
    useEffect(()=>{
        
        loadMinistrySkills();

        return () => {
            unmounted = true;
          }    
    },[]);

    const loadMinistrySkills = () => {
        setLoading(true);
        return axios.get(`${BASE_URL}/react_admin/admin/ministry_skills/report`)
                .then((response) => 
                {
                  if (unmounted) return;
                  setLoading(false);
                  console.log(response.data.students);
                  setMinistrySkills(response.data.students);
      
                });
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
              <GridToolbarExport />
            </GridToolbarContainer>
          );
    }

    return (
        <>
          <Header />
          <Container className=" mt--7" fluid>
            <Card className="shadow">
                <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Ministry Skills - {loading && <Spinner color="success" />}</h3>
                </CardHeader>
                <CardBody style={{ height: 700, width: '100%' }}>
                    <DataGrid 
                        rows={ministrySkills} 
                        columns={columns} 
                        pageSize={40} 
                        components={{
                            Toolbar: CustomToolbar
                        }} />
                </CardBody>
            </Card>
          </Container>
        </>
    );
}