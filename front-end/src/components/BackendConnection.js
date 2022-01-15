import axios from 'axios';

//const baseUrl = 'http://localhost:8000/api/';
const baseUrl = 'https://dev-academy-2022-tonisalminen.herokuapp.com/api/';

// Axios get-function for fetching all data from the sql-database
const getAll = async () => {
    const result = await axios.get(`${baseUrl}farmdata`);
    return result.data;
}

// Axios get-function for fetching distinct values of column from the sql-database
const getDistinct = async (column) => {
    const result = await axios.get(`${baseUrl}distinct?column=${column}`);
    return result.data;
}

// Axios get-function for fetching all data from the sql-database based on farm name
const searchFarm = async (farmname) => {
    const result = await axios.get(`${baseUrl}searchfarm?farmname=${farmname}`);
    return result.data;
}

// Axios get-function for fetching all data from the sql-database based on metric type
const searchMetric = async (metrictype) => {
    const result = await axios.get(`${baseUrl}searchmetric?metrictype=${metrictype}`);
    return result.data;
}

// Axios get-function for fetching all data from the sql-database based on farm name and metric type
const searchMetricFarm = async (metrictype, farmname) => {
    const result = await axios.get(`${baseUrl}searchfarmmetric?farmname=${farmname}&metrictype=${metrictype}`);
    return result.data;
}

const obj = {
    getAll,
    getDistinct,
    searchFarm,
    searchMetric,
    searchMetricFarm
};

export default obj;