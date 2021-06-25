import React, { useEffect, useState } from "react";
import {
    Container, Card, CardHeader, CardBody, Spinner
  } from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import Header from "components/Headers/Header.js";
import {BASE_URL} from "../../config/baseUrl";
import axios from "axios";

export default function BussingReport(){
    const [datatable, setDatatable] = React.useState(() => 
                                                        ({
                                                          columns: [
                                                            { field: 'index_number', label: 'Index Number', width: 100 },
                                                            { field: 'student_name', label: 'Name', width: 130 },
                                                            { field: 'class', label: 'Class', width: 130 }
                                                          ], 
                                                          rows: []
                                                        })
                                                    );
    const [loading, setLoading] = useState(false);

    let unmounted = false;
    
    useEffect(()=>{
        
        loadBussingReport();

        return () => {
            unmounted = true;
          }    
    },[]);

    const createData = () => {
      
    }

    const loadBussingReport = () => {
        setLoading(true);
        return axios.get(`${BASE_URL}/react_admin/admin/general_bussing/report`)
                .then((response) => 
                {
                  if (unmounted) return;
                  setLoading(false);
                  console.log([ 
                  ]);
                  setDatatable(prevState => {
                    return {
                      ...prevState, 
                      columns: [...prevState.columns, ...response.data.dateHeadings.map((item) => (
                                                                  {
                                                                    field: item,
                                                                    label: item,
                                                                    width: 100
                                                                  })) 
                                                                  ]}
                  });
                  
                  // setDatatable(prevState => {
                  //   return {
                  //     ...prevState, 
                  //     rows: 
                  //   }
                  // })
      
                });
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
                <MDBDataTableV5 scrollY hover entriesOptions={[5, 20, 25]} entries={20} pagesAmount={4} data={datatable} />;
                </CardBody>
            </Card>
          </Container>
        </>
    );
}