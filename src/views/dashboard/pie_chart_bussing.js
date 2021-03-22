import React, {useState, useEffect} from "react";
import {
    
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    FormGroup,
    Label,
    Input,
    Nav,
    Row
  } from "reactstrap";
import classnames from "classnames";

import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";

import { Pie } from "react-chartjs-2";

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const PieChartBussing = () => (
  <>
    <div className='header'>
      <h1 className='title'>Pie Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Pie.js'
        >
          Github Source
        </a>
      </div>
    </div>
    <Pie data={data} />
  </>
)

export default PieChartBussing