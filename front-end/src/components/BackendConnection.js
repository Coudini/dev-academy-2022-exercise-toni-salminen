import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/';
//const baseUrl = 'https://_.herokuapp.com/api?';

const getAll = async () => {
    const result = await axios.get(`${baseUrl}farmdata`);
    return result.data;
}

const getDistinct = async (column) => {
    const result = await axios.get(`${baseUrl}distinct?column=${column}`);
    return result.data;
}

const searchFarm = async (farmname) => {
    const result = await axios.get(`${baseUrl}searchfarm?farmname=${farmname}`);
    return result.data;
}

const searchMetric = async (metrictype) => {
    const result = await axios.get(`${baseUrl}searchmetric?metrictype=${metrictype}`);
    return result.data;
}

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