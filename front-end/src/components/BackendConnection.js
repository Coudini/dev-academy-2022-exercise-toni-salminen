import axios from 'axios';

const baseUrl = 'http://localhost:8000/';
//const baseUrl = 'https://_.herokuapp.com/api?';

const getAll = async () => {
    const result = await axios.get(`${baseUrl}farmdata`);
    console.log(result.data)
    return result.data;
}

const obj = {
    getAll
};

export default obj;