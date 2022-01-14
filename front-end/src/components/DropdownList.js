import React, {useState, useEffect} from 'react';
import {FormHelperText,FormControl,Select,InputLabel,MenuItem} from '@mui/material';

const DropdownList = ({data,label,helper,parentFunction}) => {

    const [selected, setSelected] = useState('All');
    
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