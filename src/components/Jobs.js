import React, { useEffect, useState } from 'react'
import JobsCard from './JobsCard';
import Filter from "./Filter";

const Jobs = () => {

    const [allJobs, setAllJobs] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [filteredJobs, setFilteredJobs] = useState([]);
    // const [filter, setFilter] = useState("");
    const [filters, setFilters] = useState({
        jobType: '',
        minExp: "",
        // Add more filters as needed
      });

    const minExp = ["0", "1", "2", "3", "4", "5", "20"];

    useEffect(()=>{
        const fetchData = () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                limit: 10,
                offset: page
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body : body,
            }

            fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then(respone => {
                if(!respone.ok){
                    throw new Error("Something went wrong !");
                }

                return respone.json();
            })
            .then(respData => {
                // console.log(respData["jdList"].length)

                setAllJobs(allJobs => [...allJobs, ...respData["jdList"]])
                setLoading(false)
            })
            .catch((error =>{
                console.log("Error in fetching data ---", error);
                setLoading(false);
            }));
        } 

        fetchData(); //fetching jobs data

        // infinte scrolling effect 

        window.addEventListener("scroll", handleScroll);

    }, [page]);

    useEffect(()=>{
        const filtered = allJobs.filter(job=> {
           if(filters.minExp === 0 || filters.minExp === "") {
            return job;
           } 
           return parseInt(filters.minExp) <=  parseInt(job.minExp) 
        })
        setFilteredJobs(filtered)
    }, [allJobs, filters])

    function handleScroll(){
        // console.log("window ",  window.innerHeight);
        // console.log("scrollTop ", document.documentElement.scrollTop );
        // console.log("offset height ", document.documentElement.offsetHeight);
        if( (window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight - 400)){
           setPage(page => page + 1)
           setLoading(false);
        }
    }

  return (
    <>
    <Filter filter={"minExp"} setFilters={setFilters} options = {minExp} label="Min. Exp"/>
    <div className='jobs_div'>
        {
            filteredJobs.map((job, i)=>{
               return <JobsCard data = {job} key={i} />
            })
        }
    </div>
    {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
    </>
  )
}

export default Jobs