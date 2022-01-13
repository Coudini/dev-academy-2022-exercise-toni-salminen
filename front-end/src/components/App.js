import logo from '../logo.svg';
import './styles/App.css';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection'

const App = () => {

  const [testData, setTestData] = useState("");

  const testi = async () => {
    const x = await BackendConnection.getAll();
    setTestData(String(x[0].farmname));
  }

  return (
    <div className="App">
      <Button 
        variant="contained"
        onClick={()=>testi()}>
          Hello World
      </Button>
      <p>test</p>
      <div>
        {testData}
      </div>
    </div>
  );
}

export default App;
