import React, {useState} from 'react';
import {
    Container,
    Row,Col, Card, CardHeader,
    CardBody
  } from "reactstrap";
import Header_Plain from 'components/Headers/Header_plain';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as XLSX from 'xlsx';
import moment from 'moment';
import axios from 'axios';
import {BASE_URL} from "config/baseUrl";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default function UploadStudents(){
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const readSheet1 = (readedData) => {
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
            
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        let count = 0;
        let studentDataInfo = [];
        
        dataParse.forEach(value => {
          count++;
          if (count === 1) return;

          studentDataInfo.push({
              id : count,
              index_number: value[getExcelCellIndex('Admission No.', dataParse[0])],
              name: value[getExcelCellIndex('First Name', dataParse[0])] +" "+value[getExcelCellIndex('Last Name', dataParse[0])],
              date_of_birth: moment(value[getExcelCellIndex('Date of Birth', dataParse[0])]).format("YYYY-MM-DD"),
              country: value[getExcelCellIndex('Country', dataParse[0])],
              gender: value[getExcelCellIndex('Gender', dataParse[0])],
              phone: value[getExcelCellIndex('Phone', dataParse[0])],
              pastors_name: value[getExcelCellIndex('Pastors Name', dataParse[0])],
              pastors_phone: value[getExcelCellIndex('Pastor Phone Number', dataParse[0])],
              class: value[getExcelCellIndex('Batch', dataParse[0])]
          })
        });

        uploadToServer(studentDataInfo);

    }

    const getExcelCellIndex = (row_name, header_row) => {
        return header_row.indexOf(row_name);
    }

    const renderOnGrid = (studentSpreadSheetInfo) => {
        setUploaded(true);

        setColumns([{
            field: 'index_number',
            headerName: 'Index',
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 150
         },
         {
            field: 'class',
            headerName: 'Class'
         },
         {
             field: 'date_of_birth',
             headerName: 'Date of Birth'
         },
         {
             field: 'country',
             headerName: 'Country'
         },
         {
             field: 'gender',
             headerName: 'Gender'
         },
         {
             field: 'phone',
             headerName: 'Phone'
         },
         {
             field: 'pastors_name',
             headerName: 'Pastors Name',
             width: 150
         },
         {
             field: 'pastors_phone',
             headerName: 'Pastors Phone'
         },
         {
             field: 'marital_status',
             headerName: 'Marital Status'
         },
         {
             field: 'occupation',
             headerName: 'Occupation'
         },
         {
             field: 'email_address',
             headerName: 'Email Address'
         },
         {
             field: 'denomination',
             headerName: 'Denomination'
         }
        ]);

        setRows(studentSpreadSheetInfo);
    }

    const uploadToServer = async (studentSpreadSheetData) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("studentSpreadSheetData", JSON.stringify(studentSpreadSheetData));
        
        //upload json to server
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/react_admin/admin/students/upload`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            data: formData
        });

        console.log(response);
        await renderOnGrid(response.data);
        setLoading(false);
        setOpen(true);
        
    }

    return (
        <>
        <Header_Plain />
        <Container className="mt--7" fluid>
            
            {!loading ? 
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
                        <Button variant="contained" color="primary" component="span">
                        Upload
                        </Button>
                    </label>
                    <input accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                        className={classes.input} id="icon-button-file" type="file"
                        onChange={selectFile} 
                        />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload excel file" component="span">
                            <CloudUploadIcon />
                        </IconButton>
                    </label>
                </Col>
            </Row>
            :
            <CircularProgress />
            }
            
            {uploaded &&
             <div style={{ height: 700, width: '100%' }}>
                <Card className="shadow">
                    <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0">Uploaded Students</h3>
                    </CardHeader>
                    <CardBody style={{ height: 700, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={50}/>
                    </CardBody>
                </Card>
            </div>}
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
    );
}