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
import DateRangePicker from 'react-bootstrap-daterangepicker';

export default function StudentAttn(){

    const [selectedDate, setSelectedDate] = useState("");
    const [attn_data, setattn_data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateString, setDateString] = useState("Select Date");

    const columns = [
        { field: 'student_admission_number', headerName: 'Index Number', width: 100 },
        { 
            field: 'student_name', headerName: 'Name', width: 130,
        valueGetter: (params) =>`${params.row.student.name}`        
        },
        { 
            field: 'date_time', 
            headerName: 'Date', width: 100
        },
        { 
            field: 'attendance_status', 
            headerName: 'Anagkazo Live Attendance', width: 250
            //valueGetter: (params) =>`${params.row.attendance_status=="On Time"?"present":"absent"}`
        }
    ]

    useEffect(()=>{
        if (dateString == "Select Date") return;
        loadStudentAttn();
   
    },[dateString]);

    const handleDateChange = (obj) => {
        setDateString(obj.startDate.format("YYYY-MM-DD"));
      }

    const loadStudentAttn = () => {

        return axios.get(`${BASE_URL}/react_admin/admin/student_attn?date=${dateString}`)
                .then((response) => 
                {
                  setLoading(false);
                  console.log(response.data);
                  setattn_data(response.data);
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
                    <DateRangePicker 
                      initialSettings={{
                        singleDatePicker: true,
                        showDropdowns: true,
                        locale: {
                          format: 'D-MMM-YYYY'
                        }
                      }}
                      onApply={
                        (e, obj) => {
                            handleDateChange(obj);
                        }
                      }
                      >
                        <button>{dateString}</button>
                    </DateRangePicker>
                    <h3 className=" mb-0">Attendance of Students - {loading && <Spinner color="success" />}</h3>
                </CardHeader>
                <CardBody style={{ height: 700, width: '100%' }}>
                    <DataGrid 
                        rows={attn_data} 
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