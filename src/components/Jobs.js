import React, { useEffect, useState } from 'react'
import JobsCard from './JobsCard';
import Filter from "./Filter";
import { Search } from '@mui/icons-material';
import TextBased from './TextBased';

const Jobs = () => {

    const [allJobs, setAllJobs] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [filteredJobs, setFilteredJobs] = useState([]);
    // const [filter, setFilter] = useState("");
    const [filters, setFilters] = useState({
        jobType: '',
        minExp: "",
        minBasePay: "",
        role: "",
        company: "",
        location: ""
        // Add more filters as needed
      });

    const minExp = ["0", "1", "2", "3", "4", "5", "20"];
    const jobType = ["Remote", "Onsite"];
    const minBasePay = ["0", "10", "20", "30", "40", "50", "60", "70"];
    const role = ["frontend", "backend", "fullstack", "ios", "tech lead", "android", "designer", "product manager"];

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
            const filterJobType = filters.jobType.toLowerCase();
            const filterRole = filters.role.toLowerCase();
            const filterCompany = filters.company.toLowerCase();
            const filterLocation = filters.location.toLowerCase();

            if(parseInt(filters.minExp) > 0){
                return parseInt(filters.minExp) <=  parseInt(job.minExp) 
            }
            if(parseInt(filters.minBasePay) > 0){
                return parseInt(filters.minBasePay) <= parseInt(job.minJdSalary)
            }
            if(filterRole !== ""){
                return job.jobRole.toLowerCase().includes(filterRole);
            }
            if(filterCompany !== ""){
                return job.companyName.toLowerCase().includes(filterCompany)
            }
            if(filterLocation !== ""){
                return job.location.toLowerCase().includes(filterLocation)
            }


            if(filterJobType === "remote" || filterJobType === "hybrid"){
                console.log("2222222");
                return filterJobType === job.location.toLowerCase();
            }
            else if(filterJobType !== "onsite" && filterJobType !== ""){
                    if(job.location.toLowerCase() !== "remote" || job.location.toLowerCase() !== "hybrid"){
                        console.log("11111111111");
                        return true;
                    }
                    else{
                        console.log("3333333333");
                        return false;
                    }
            }
            return job;

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
    <div className='filter_dropdown'>
        <Filter filter={"minExp"} setFilters={setFilters} options = {minExp} label="Min. Exp"/>
        <Filter filter={"jobType"} setFilters={setFilters} options = {jobType} label="Job Type"/>
        <Filter filter={"minBasePay"} setFilters={setFilters} options = {minBasePay} label="Min. Pay"/>
        <Filter filter={"role"} setFilters={setFilters} options = {role} label="Roles"/>
        <TextBased label ="Company" filter={"company"} setFilters={setFilters}/>
        <TextBased label ="Location" filter={"location"} setFilters={setFilters}/>
    </div>
    <div className='jobs_div'>
        { filteredJobs && 
            filteredJobs.map((job, i)=>{
               return <JobsCard data = {job} key={i} />
            })
        } 
    </div>
    {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
    {!isLoading && !filteredJobs.length && <h1 style={{textAlign: "center", marginTop: "4px"}}> <Search/> No data Found</h1>}
    </>
  )
}

export default Jobs