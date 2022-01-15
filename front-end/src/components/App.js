import './styles/App.css';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection';
import DropdownList from './DropdownList';
import DataTable from './DataTable';
import DataChart from './DataChart';

const App = () => {

  // State array holding current farm data
  const [farmData, setFarmData] = useState([]);
  
  // States for dropdown menus. Used in hooks
  const [selectedFarm, setSelectedFarm] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('All');

  // Listing of all farms and metrics
  const [farms, setFarms] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // If no specific metric is chosen from the dropdown set multipleMetrix state True
  const [multipleMetrics, setMultipleMetrics] = useState (true);

  // State for showing/hiding chart
  // If a farm hasn't been chosen from dropdown menu chart is hidden
  const [showChart, setShowChart] = useState(false);

  // If multipleMetrics are True the chart needs a different data-structure for showing multiple metrics
  const [multipleMetricsData, setMultipleMetricsData] = useState([]);

  // Async function to fetch all data, push it into an array and set states correctly
  const getAll = async () => {
    const dbFarmData = await BackendConnection.getAll();
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
    setMultipleMetrics(true);
    setShowChart(false);
  }

  // Async function to fetch distinct metrictypes and farmnames
  // Saves them into arrays and sets into states
  const getDistinct = async () => {
    const dbNames = await BackendConnection.getDistinct('farmname');
    const dbTypes = await BackendConnection.getDistinct('metrictype');
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

  // Async function to fetch farm data based on name of the farm
  // Saves the data into array and sets states accordingly
  const getFarm = async (farm) => {
    const dbFarmData = await BackendConnection.searchFarm(farm);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    await setFarmData(farmDataArray);
    const dbMultipleChartData = await makeMultipleChartData(dbFarmData);
    await setMultipleMetricsData(dbMultipleChartData);
    setMultipleMetrics(true);
    setShowChart(true);
  }

  // Async function to fetch farm data based on the chosen type of metric
  // Saves the data into array and sets states accordingly
  const getMetric = async (metric) => {
    const dbFarmData = await BackendConnection.searchMetric(metric);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
    setMultipleMetrics(false);
    setShowChart(false);
  }

  // Async function to fetch farm date based on the chosen farm name and metric type
  // Saves the data into array and sets states accordingly
  const getFarmMetric = async (farm, metric) => {
    const dbFarmData = await BackendConnection.searchMetricFarm(metric,farm);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    await setFarmData(farmDataArray);
    setMultipleMetrics(false);
    setShowChart(true);
  }

  // Function to decide which fetch call to make based on chosen dropdown possibilities from farm-DropdownList
  function farmSelect(e){
    setSelectedFarm(e);
    // Sql friendly format
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

  // Function to decide which fetch call to make based on chosen dropdown possibilities from metric-DropdownList
  function metricSelect(e){
    setSelectedMetric(e);
    // Sql friendly format
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

  // When 'All'-metrictype and specific is selected, returns an array containing key-value pairs of all metric-types
  async function makeMultipleChartData (data) {
    let chartArray = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      switch (data[i].metrictype) {
        case 'pH':
          await chartArray.push(
            {pH: data[i].metricvalue}
          );
          break;
        case 'rainFall':
          await chartArray.push(
            {rainFall: data[i].metricvalue}
          );
          break;
        case 'temperature':
          await chartArray.push(
            {temperature: data[i].metricvalue}
          );
      }
    }
    console.log('array',chartArray);
    return chartArray;
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
          {showChart ?
            multipleMetrics?
              <DataChart
              data={multipleMetricsData}
              multipleMetrics={multipleMetrics}
              labels={metrics}
              /> :
              <DataChart
                data={farmData}
                multipleMetrics={multipleMetrics}
                labels={selectedMetric}
              /> :
          <p>Select a farm to show chart</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
