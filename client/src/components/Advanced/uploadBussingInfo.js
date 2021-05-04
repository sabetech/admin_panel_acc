import React, {useState} from 'react';
import HeaderPlain from 'components/Headers/Header_plain';
import { makeStyles } from '@material-ui/core/styles';
import {
  Row,Col, Card, CardHeader,
  CardBody,
  Container
  } from "reactstrap";
import * as XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {BASE_URL} from "config/baseUrl";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import { DataGrid } from '@material-ui/data-grid';

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

export default function UploadBussingInfo(){
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [dateString, setDateString] = useState("Click to Choose Bussing Date!");

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
    let bussingDataInfo = [];
    
    dataParse.forEach(value => {
      count++;
      if (count === 1) return;

      if (typeof value[1] === 'undefined') return;

      bussingDataInfo.push({
        id: count,
        index_number: value[1].substring(0, value[1].indexOf(" ")).trim(),
        st_attn: value[2],
        twn_attn: value[3]
      });
    });

    uploadToServer(bussingDataInfo);

  }

  const uploadToServer = async (bussingSpreadSheetData) => {
    setLoading(true);
    let formData = new FormData();
    
    formData.append('bussing_date', dateString);
    formData.append("bussingSpreadSheetData", JSON.stringify(bussingSpreadSheetData));

    //upload json to server
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/react_admin/admin/bussing_data/upload`,
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

  const renderOnGrid = (bussingInfo) => {
    setUploaded(true);
    setColumns([{
        field: 'name',
        headerName: 'Student Name',
        width: 220
      },
      {
          field: 'present',
          headerName: 'Present',
          width: 100
      },
      {
          field: 'number_bussed',
          headerName: 'Number Bussed',
          width: 150,
          type: 'number'
          
      }]);

      setRows(bussingInfo);

    }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
};

    return (
      <>
        <HeaderPlain title={"Upload Bussing Info Spreadsheet"}/>
        <Container className="mt--7" fluid>
          {!loading ? 
            <>
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
                          <Button variant="contained" color="primary" component="span" disabled={dateString === 'Click to Choose Bussing Date!'}>
                          Upload
                          </Button>
                      </label>
                    </Col>
                </Row>
              </>
            :
            <CircularProgress />
          }
            
            {uploaded &&
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
            message="Students have successfully been uploaded!"
          />
    </>
  )
}