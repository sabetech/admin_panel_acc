import React, { useEffect, useState } from "react";
import {
    Container, Card, CardHeader, CardBody, Spinner
  } from "reactstrap";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    
  } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField, Checkbox, List, ListItem, ListItemText, MenuItem, Grid, Menu} from '@material-ui/core';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Header from "components/Headers/Header.js";
import {BASE_URL} from "../../config/baseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const streams = [
    '9 Months Program',
    '18 Months Program',
    '36 Months Program'
  ];

export default function MinistrySkills(){
    const classes = useStyles();
    const [ministrySkills, setMinistrySkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [schClasses, setSchClasses] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

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
        
        //loadMinistrySkills();

        return () => {
            unmounted = true;
          }    
    },[]);

    const getSchClasses = () => {
        //get classes
    }

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
                    <span>
                    <h3 className=" mb-0">Ministry Skills - {loading && <Spinner color="success" />}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                        <div className={classes.root} style={{ width: 250 }}>
                        <List component="nav" aria-label="Device settings">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Class"
                                onClick={handleClickListItem}
                            >
                            <ListItemText primary="Class" secondary={streams[selectedIndex]} />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {streams.map((option, index) => (
                            <MenuItem
                                key={option}
                                // disabled={index === 0}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                        </div>
                        </Grid>

                        <Grid item xs={3}>
                    <div className={classes.root} style={{ width: 250 }}>
                        <List component="nav" aria-label="Device settings">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Stream"
                                onClick={handleClickListItem}
                            >
                            <ListItemText primary="Stream" secondary={streams[selectedIndex]} />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {streams.map((option, index) => (
                            <MenuItem
                                key={option}
                                // disabled={index === 0}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                        </div>
                        </Grid>
                        </Grid>

                    </span>
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