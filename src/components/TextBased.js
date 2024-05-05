import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

const TextBased = ({label, filter, setFilters}) => {

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchText)
            setFilters(prevFilters => ({
                ...prevFilters, [filter]: searchText
            }));
        }, 700);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText, filter, setFilters]);

    function handleTextBasedFilter(e){
        // console.log(e.target.value);
        // setFilters(prevFilters => ({
        //     ...prevFilters, [filter]: e.target.value
        // }));
        
        setSearchText(e.target.value);
    }

  return (
    <div>
       <TextField id="outlined-basic" label={label} variant="outlined" value={searchText} onChange={handleTextBasedFilter} /> 
    </div>
  )
}

export default TextBased