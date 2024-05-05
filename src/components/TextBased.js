import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

// component to form all text based filters
const TextBased = ({label, filter, setFilters}) => {

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilters(prevFilters => ({
                ...prevFilters, [filter]: searchText
            }));
        }, 700);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText, filter]);

    function handleTextBasedFilter(e){
        // setFilters(prevFilters => ({
        //     ...prevFilters, [filter]: e.target.value
        // }));
        
        setSearchText(e.target.value);
    }

  return (
    <div>
       <TextField id="outlined-basic" className='text_filter' label={label} variant="outlined" value={searchText} onChange={handleTextBasedFilter} /> 
    </div>
  )
}

export default TextBased