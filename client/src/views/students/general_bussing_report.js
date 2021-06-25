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

export default function BussingReport(){
    const [bussingReport, setBussingReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateBussingHeadings, setDateBussingHeadings] = useState([]);

    const columns = [
        { field: 'index_number', headerName: 'Index Number', width: 100 },
        { field: 'student_name', headerName: 'Name', width: 130 },
        { field: 'class', headerName: 'Class', width: 130 }
    ];

    let unmounted = false;
    //get ministry skills json from the server
    useEffect(()=>{
        
        loadBussingReport();

        return () => {
            unmounted = true;
          }    
    },[]);

    // const dateBussingHeadings = () => {
    //   return axios.get(`${BASE_URL}/react_admin/bussing-date-headings`)
    //   .then((response) => {
    //     if (unmounted) return;

    //     //setDateBussingHeadings(response.data);

    //   });
    // }

    const createData = () => {
      
    }

    const loadBussingReport = () => {
        setLoading(true);
        return axios.get(`${BASE_URL}/react_admin/admin/general_bussing/report`)
                .then((response) => 
                {
                  if (unmounted) return;
                  setLoading(false);
                  console.log(response.data.students);
                  //setDateBussingHeadings(response.data.headings);
                  //setBussingReport(response.data.students);
      
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
                    <h3 className=" mb-0">General Bussing Report - {loading && <Spinner color="success" />}</h3>
                </CardHeader>
                <CardBody style={{ height: 700, width: '100%' }}>
                    <DataGrid 
                        rows={bussingReport} 
                        columns={columns} 
                        pageSize={40} 
                         />
                </CardBody>
            </Card>
          </Container>
        </>
    );
}