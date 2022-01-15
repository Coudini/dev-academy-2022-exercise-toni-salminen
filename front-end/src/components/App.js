import './styles/App.css';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection';
import DropdownList from './DropdownList';
import DataTable from './DataTable';
import DataChart from './DataChart';

const App = () => {

  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('All');

  const [farms, setFarms] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // state; if single farm is selected: show chart
  const [multipleMetrics, setMultipleMetrics] = useState (true);
  //const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [multipleMetricsData, setMultipleMetricsData] = useState([]);


  const getAll = async () => {
    const dbFarmData = await BackendConnection.getAll();
    console.log('getAll:', dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
    setMultipleMetrics(true);
    setShowChart(false);
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
    await setFarmData(farmDataArray);
    //const dbChartData = await makeChartData(farmDataArray);
    //setChartData(dbChartData);
    const dbMultipleChartData = await makeMultipleChartData(dbFarmData);
    await setMultipleMetricsData(dbMultipleChartData);
    setMultipleMetrics(true);
    setShowChart(true);
  }

  // by metric
  const getMetric = async (metric) => {
    const dbFarmData = await BackendConnection.searchMetric(metric);
    console.log('searchmetric:',metric, dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    setFarmData(farmDataArray);
    setMultipleMetrics(false);
    setShowChart(false);
  }

  // by farm and metric (make new to crud.js)
  const getFarmMetric = async (farm, metric) => {
    const dbFarmData = await BackendConnection.searchMetricFarm(metric,farm);
    console.log('searchfarmmetric:',metric,farm, dbFarmData);
    let farmDataArray = [];
    for (let i = 0; i < dbFarmData.length; i++) {
      await farmDataArray.push(dbFarmData[i]);
    }
    await setFarmData(farmDataArray);
    //const dbChartData = await makeChartData(farmDataArray);
    //setChartData(dbChartData);
    setMultipleMetrics(false);
    setShowChart(true);
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
