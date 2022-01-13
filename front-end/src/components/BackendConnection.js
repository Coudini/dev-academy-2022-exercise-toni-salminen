import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/';
//const baseUrl = 'https://_.herokuapp.com/api?';

const getAll = async () => {
    const result = await axios.get(`${baseUrl}farmdata`);
    return result.data;
}

const getDistinct = async () => {
    const result = await axios.get(`${baseUrl}distinct`);
    return result.data;
}

const search = async (farmname) => {
    const result = await  axios.get(`${baseUrl}search?farmname=${farmname}`);
    return result.data;
}



const obj = {
    getAll,
    getDistinct,
    search
};

export default obj;