import React, { useState} from 'react'
import {Select, MenuItem, InputLabel, FormControl, IconButton} from "@mui/material"
import { Clear as ClearIcon } from '@mui/icons-material';

const Filter = ({filter, setFilters, options, label}) => {
    console.log(filter)

    const [selectedOption, setSelectedOption] = useState("");

    function handleFilterChange(e){
        setFilters(prevFilters => ({
            ...prevFilters, [filter]: e.target.value
        }));
        setSelectedOption(e.target.value)
    }

    const handleClear = () => {
        setFilters(prevFilters => ({
            ...prevFilters, [filter]: ''
        }));
        setSelectedOption('');
    };

  return (
    <div className="filters">
        <FormControl>
            <InputLabel id={`${label}-label`} className='inp_label'>{label}</InputLabel>
            <Select 
                className='custom-select'
                labelId={`${label}-label`} 
                value={selectedOption}
                onChange={handleFilterChange}
                label={label}
                endAdornment={
                    selectedOption && (
                      <IconButton className='close_icon' onClick={handleClear} size="large">
                        <ClearIcon />
                      </IconButton>
                    )
                }

            >
                {options.map((option, i)=>{
                return <MenuItem key={i} value={option} selected>{option}</MenuItem>
                })}
            </Select>
        </FormControl>
    </div>
  )
}

export default Filter