import React, { useEffect, useState } from 'react'
import JobsCard from './JobsCard';

const Jobs = () => {

    const [allJobs, setAllJobs] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                limit: 10,
                offset: 0
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

    }, []);

  return (
    <>
    <div className='jobs_div'>
        {
            allJobs.map((job, i)=>{
               return <JobsCard data = {job} key={i} />
            })
        }
    </div>
    {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
    </>
  )
}

export default Jobs