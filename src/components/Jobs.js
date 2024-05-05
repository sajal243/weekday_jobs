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

    const [filters, setFilters] = useState({
        jobType: '',
        minExp: "",
        minBasePay: "",
        role: "",
        company: "",
        location: ""
        // Add more filters as needed
      });

    // values for filters
    const minExp = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    const jobType = ["Remote", "Onsite"];
    const minBasePay = ["0", "10", "20", "30", "40", "50", "60", "70"];
    const role = ["frontend", "backend", "fullstack", "ios", "tech lead", "android", "designer", "product manager"];

    // calling api to fetch jobs
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

    // filter logic
    useEffect(()=>{
        const filtered = allJobs.filter(job=> {
            const filterJobType = filters.jobType.toLowerCase();
            const filterRole = filters.role.toLowerCase();
            const filterCompany = filters.company.toLowerCase();
            const filterLocation = filters.location.toLowerCase();
           
            let condn = true;

            if(parseInt(filters.minExp) > 0){
                condn = condn && parseInt(filters.minExp) <=  parseInt(job.minExp)
            }
            if(parseInt(filters.minBasePay) > 0){
                condn = condn && parseInt(filters.minBasePay) <= parseInt(job.minJdSalary)
            }
            if(filterRole !== ""){
                condn = condn && job.jobRole.toLowerCase().includes(filterRole);
            }
            if(filterCompany !== ""){
                condn = condn && job.companyName.toLowerCase().includes(filterCompany)
            }
            if(filterLocation !== ""){
                condn = condn && job.location.toLowerCase().includes(filterLocation)
            }
            if(filterJobType === "remote"){
                condn = condn && filterJobType === job.location.toLowerCase();
            }
            else if(filterJobType === "onsite"){
                if(job.location.toLowerCase() == "remote"){
                    condn = condn && false;
                }
                else{
                    condn = condn && true;
                }
            }

            return condn;

        })
        setFilteredJobs(filtered)
    }, [allJobs, filters])

    // infinite scrolling effect
    function handleScroll(){
        // console.log("window ",  window.innerHeight);
        // console.log("scrollTop ", document.documentElement.scrollTop );
        // console.log("offset height ", document.documentElement.offsetHeight);
        if( (window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight - 400)){
           setPage(page => page + 1)
           setLoading(false);
        }
    }

    // rendering the jobs
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