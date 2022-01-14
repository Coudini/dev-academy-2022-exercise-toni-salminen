import './styles/App.css';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection';
import DropdownList from './DropdownList';
import DataTable from './DataTable';

const App = () => {

  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('All');

  const [farms, setFarms] = useState([]);
  const [metrics, setMetrics] = useState([]);
  
  const getAll = async () => {
    const dbFarmData = await BackendConnection.getAll();
    console.log('getAll:', dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
  }

  const getDistinct = async () => {
    const dbNames = await BackendConnection.getDistinct('farmname');
    const dbTypes = await BackendConnection.getDistinct('metrictype');
    console.log('distinct:',dbNames,dbTypes)
    let metricTypes = [];
    let farmNames = [];
    for (let i = 0; i < dbTypes.length; i++) {
      await metricTypes.push(dbTypes[i].metrictype)
    }
    for (let i = 0; i < dbNames.length; i++) {
      await farmNames.push(dbNames[i].farmname)
    }
    setFarms(farmNames);
    setMetrics(metricTypes);
  }

  //by farm
  const getFarm = async (e) => {
    const dbFarmData = await BackendConnection.searchFarm(e);
    console.log('search:',dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
  }

  const getMetric = async (e) => {

  }

  const getFarmMetric = async (e) => {
    
  }
  




  function farmSelect(e){
    setSelectedFarm(e);
    if (e=='All'){
      if (selectedMetric == 'All') {
        getAll();
      } else {
        //search by all farms with metric
      }
    } else {
      if (selectedMetric == 'All') {
        let sqlName = (e).replace(/'/g, "''");
        //search all metrics with farm
        getFarm(sqlName);
      } else {
        //search by metric and name
      }
    }
  }


  function metricSelect(e){
    setSelectedMetric(e);
    if (e=='All') {

    }
  }







  useEffect(() => {
      getAll();
      getDistinct();
  }, []);


  return (
    <div className="App">
      <div className="topBar">
        <DropdownList
          data={['All', ...farms]}
          label={'Farm'}
          helper={'Select Farm'}
          parentFunction={farmSelect}/>
        <DropdownList
          data={['All', ...metrics]}
          label={'Metric'}
          helper={'Select Metric'}
          parentFunction={metricSelect}/>
        

      </div>
      <div className="container">
        <div className="table">
          <DataTable
            columns={['Date', 'Metric', 'Value']}
            rows={farmData}
          />
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
