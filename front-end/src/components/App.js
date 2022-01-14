import logo from '../logo.svg';
import './styles/App.css';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection'

import { useParams } from "react-router-dom";

const App = () => {

  const [farmData, setFarmData] = useState([]);
  const [testData, setTestData] = useState("test");

  const getAll = async () => {
    const x = await BackendConnection.getAll();
    console.log(x);
    //setTestData(String(x[0].farmname));
  }
  const getDistinct = async () => {
    const x = await BackendConnection.getDistinct();
    console.log(x);
  }
  const search = async () => {
    const x = await BackendConnection.search('test');
    console.log('x:',x);
  }

  return (
    <div className="App">
      <Button 
        variant="contained"
        onClick={()=>getAll()}>
          getAll
      </Button>
      <Button 
        variant="contained"
        onClick={()=>getDistinct()}>
          getDistinct
      </Button>
      <Button 
        variant="contained"
        onClick={()=>search()}>
          search
      </Button>
      <p>test</p>
      <div>
        {testData}
      </div>
    </div>
  );
}

export default App;
