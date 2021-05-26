import React, {useState, useEffect} from 'react';
import Header from "components/Headers/Header.js";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {BASE_URL} from "../../config/baseUrl";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

const columns = [
    { id: 'con_rep', label: 'Con Rep', minWidth: 170, align: 'center' },
    { id: 'constituency', label: 'Constituency', minWidth: 100, align: 'center' },
    { id: 'constituency_population', label: 'Population', minWidth: 100, align:'center' }
]

const useStyles2 = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export default function Constituency(){
    const classes = useStyles2();
    const [constituencies, setConstituencies] = useState([]);
    let unmounted = false;

    useEffect(() => {
        loadConstituencies();
    },[]);

    const loadConstituencies = () => {
        return axios.get(`${BASE_URL}/react_admin/admin/constituencies`)
                .then((response) => 
                {
                  if (unmounted) return;
                  
                  console.log(response.data);
                  setConstituencies(response.data);
      
                });
    }


    return (
        <>
            <Header />
            <TableContainer component={Paper}>
                <Table className={classes.container} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                component="th" scope="row"
                                >
                                    {column.label}
                                </TableCell>
                             )
                            )
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            constituencies.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" align={'center'}>
                                        {item.region_head}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align={'center'}>
                                        {item.region_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align={'center'}>
                                        {item.area_population}
                                    </TableCell>
                                </TableRow>
                                )
                            )
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}