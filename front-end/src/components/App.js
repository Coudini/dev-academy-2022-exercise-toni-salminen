import logo from '../logo.svg';
import './styles/App.css';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import BackendConnection from './BackendConnection'

const App = () => {

  const [testData, setTestData] = useState(null);

  return (
    <div className="App">
      <Button 
        variant="contained"
        onClick={()=>console.log("klikattu")}>
          Hello World
      </Button>
      <p>testData:{testData}</p>
    </div>
  );
}

export default App;
