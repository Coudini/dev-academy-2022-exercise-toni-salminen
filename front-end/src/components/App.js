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
  const getFarm = async (farm) => {
    const dbFarmData = await BackendConnection.searchFarm(farm);
    console.log('searchfarm:',farm,dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
  }

  // by metric (crud.js search())
  const getMetric = async (metric) => {
    const dbFarmData = await BackendConnection.searchMetric(metric);
    console.log('searchmetric:',metric, dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
  }

  // by farm and metric (make new to crud.js)
  const getFarmMetric = async (farm, metric) => {
    const dbFarmData = await BackendConnection.searchMetricFarm(metric,farm);
    console.log('searchfarmmetric:',metric,farm, dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
  }
  




  function farmSelect(e){
    setSelectedFarm(e);
    let sqlName = (e).replace(/'/g, "''");
    if (e=='All'){
      if (selectedMetric == 'All') {
        getAll();
      } else {
        getMetric(selectedMetric);
      }
    } else {
      if (selectedMetric == 'All') {
        getFarm(sqlName);
      } else {
        getFarmMetric(sqlName, selectedMetric);
      }
    }
  }

  function metricSelect(e){
    setSelectedMetric(e);
    let sqlName = (selectedFarm).replace(/'/g, "''");
    if (e=='All') {
      if (selectedFarm == 'All') {
        getAll();
      } else {
        getFarm(sqlName);
      }
    } else {
      if (selectedFarm == 'All') {
        getMetric(e);
      } else {
        getFarmMetric(sqlName, e);
      }
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
