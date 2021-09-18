import React, {useState} from 'react';
import HeaderPlain from 'components/Headers/Header_plain';
import { makeStyles } from '@material-ui/core/styles';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import * as XLSX from 'xlsx';
import {BASE_URL} from "config/baseUrl";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import {
    Row,Col, Card, CardHeader,
    CardBody,
    Container
    } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function UploadCenterServiceInfo(){
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [dateString, setDateString] = useState("Click to choose Bacenta/Center Service Date");
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleDateChange = (obj) => {
        setDateString(obj.startDate.format("YYYY-MM-DD"));
    }

    const selectFile = (event) => {
        var files = event.target.files, f = files[0];
        var reader = new FileReader();
        
        reader.onload = function (event) {
            var data = event.target.result;
            let readedData = XLSX.read(data, {type: 'binary', cellDates: true});
            readSheet1(readedData);
            
        };
        reader.readAsBinaryString(f);
      }
    
      const readSheet1 = (readedData) => {
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
            
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        let count = 0;
        let centerServiceInfo = [];
        
        dataParse.forEach(value => {
          count++;
          if (count === 1) return;
    
          if (typeof value[1] === 'undefined') return;
    
          if (typeof value[2] === 'undefined') value[2] = 0;
          if (typeof value[3] === 'undefined') value[3] = 0;

          if (typeof value[4] === 'undefined') return;

          centerServiceInfo.push({
            id: count,
            index_number: value[4].substring(0, value[4].indexOf(" ")).trim(), //get index from spreadsheet column
            //index_number: value[4].toString().trim(),
            st_attn: (value[5] === "") ? 0 : value[5],
            twn_attn: (value[6] === "") ? 0 : value[6]
          });
        });
    
        uploadToServer(centerServiceInfo);
    
      }

      const uploadToServer = async (centerServiceSpreadSheetData) => {
        setLoading(true);
        let formData = new FormData();
        
        formData.append('center_service_date', dateString);
        formData.append("centerServiceSpreadSheetData", JSON.stringify(centerServiceSpreadSheetData));
    
        //upload json to server
        const response = await axios({
          method: "POST",
          url: `${BASE_URL}/react_admin/admin/center_service/upload`,
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          data: formData
        });
    
        console.log(response.data);
        
        await renderOnGrid(response.data);
        setLoading(false);
        setOpen(true);
    
      }

      const renderOnGrid = (centerServiceInfo) => {
        setUploaded(true);
        setColumns([{
            field: 'name',
            headerName: 'Student Name',
            width: 250
          },
          {
            field: 'center_name',
            headerName: 'Center',
            width: 200
          },
          {
              field: 'number_of_souls',
              headerName: 'Attendance',
              width: 180,
              type: 'number'
          },
          {
              field: 'date_of_service',
              headerName: 'Date',
              width: 180      
          }
        ]);
    
          setRows(centerServiceInfo);
    
       }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <>
          <HeaderPlain title={"Upload Center Service Spreadsheet"}/>
          <Container className="mt--7" fluid>
          {!loading ? <>
                <Row>
                  <Col lg="6" xl="3">
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
                  </Col>
                </Row>
                <Row>
                    <Col lg="6" xl="3">
                      <input
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          className={classes.input}
                          id="contained-button-file"
                          type="file"
                          onChange={selectFile}
                          
                          
                      />
                      <label htmlFor="contained-button-file">
                          <Button variant="contained" 
                            color="primary" 
                            component="span" 
                            style={{marginTop: 10, float: 'right'}}
                            disabled={dateString === 'Click to choose Bacenta/Center Service Date'}>
                                Upload
                          </Button>
                      </label>
                    </Col>
                </Row>
                </>
                :
            <CircularProgress />
            }
            {
                uploaded &&
                    <div style={{ height: 700, width: '100%' }}>
                    <Card className="shadow">
                        <CardHeader className=" bg-transparent">
                            <h3 className=" mb-0">Uploaded Bussing Info {dateString}</h3>
                        </CardHeader>
                        <CardBody style={{ height: 700, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={50}/>
                        </CardBody>
                    </Card>
                </div>
            }
          
          </Container>
          <Snackbar 
            open={open} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            autoHideDuration={6000} 
            onClose={handleClose} 
            message="Center Service Data has been uploaded!"
          />
        </>
    );
}