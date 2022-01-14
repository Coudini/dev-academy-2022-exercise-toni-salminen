import logo from '../logo.svg';
import './styles/App.css';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection';
import DropdownList from './DropdownList';

const App = () => {

  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('All');

  /*
  const getAll = async () => {
    const x = await BackendConnection.getAll();
    console.log(x);
  }
  const getDistinct = async () => {
    const x = await BackendConnection.getDistinct();
    console.log(x);
  }
  const search = async () => {
    const x = await BackendConnection.search('test');
    console.log('x:',x);
  }
  */

  function farmSelect(e){
    setSelectedFarm(e);
  }
  function metricSelect(e){
    setSelectedMetric(e);
  }

  return (
    <div className="App">
      <div className="topBar">
        <DropdownList
          data={['All','1','2','3']}
          label={'Farm'}
          helper={'Select Farm'}
          parentFunction={farmSelect}/>
        <DropdownList
          data={['All','1','2','3']}
          label={'Metric'}
          helper={'Select Metric'}
          parentFunction={metricSelect}/>
        

      </div>
      <div className="container">
        <div className="table">
          table
        </div>
        <div className="graph">
          graph
        </div>
      </div>

      {/* 
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
      */}
      
    </div>
  );
}

export default App;
