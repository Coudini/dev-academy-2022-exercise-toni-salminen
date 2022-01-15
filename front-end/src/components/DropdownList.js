import React, {useState, useEffect} from 'react';
import {FormHelperText,FormControl,Select,InputLabel,MenuItem} from '@mui/material';

// Component for listing all available distinct farm names and metric types
const DropdownList = ({data,label,helper,parentFunction}) => {

    // State variable holding selected variable
    const [selected, setSelected] = useState('All');
    
    // function to execute on Select onChange -function
    // Sets 'selected' state and calls the parent function received as hook
    function handleClick(e) {
        setSelected(e.target.value);
        parentFunction(e.target.value);
    }
    
    return(
        <div className="dropdownList">
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected}
                    label={label}
                    onChange={(e)=>handleClick(e)}
                >
                {data.map(v =>
                    <MenuItem value={v}>{v}</MenuItem>)}
            </Select>
            <FormHelperText>{helper}</FormHelperText>
            </FormControl>  
        </div>
    )
}

export default DropdownList;