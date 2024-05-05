import React from 'react'

const JobsCard = ({data}) => {
  return (
    <div className='jobs_card'>
        <div className='job_info'>
            {data?.logoUrl? <img alt='company_logo' src={data?.logoUrl} /> : "" }
            <div className='comp_role_loc'>
                {data?.companyName ? <div className='company'><a href={data?.jdLink} target='_blank' rel="noreferrer">{data?.companyName}</a></div> : "" }
                {data?.jobRole ? <div className='job_name'>{data?.jobRole}</div> : "" }
                {data?.location? <div className='location'>{data?.location}</div> : "" }
            </div>
        </div>

        {(data?.minJdSalary || data?.maxJdSalary ) ?  
          <div className='salary_range'>
            <div>Estimated Salary: <span>{data?.salaryCurrencyCode}{data?.minJdSalary} - {data?.salaryCurrencyCode}{data?.maxJdSalary}K</span></div>
        </div>    : ""
        }
      

        {data?.jobDetailsFromCompany ? 
        <div className='job_desc'>
            <div className='about'>About Company:</div>
            <div className='about'>About us</div>
            <div className='desc'>
               <p> {data?.jobDetailsFromCompany}</p>
               <div className='full_desc_cta'><a href={data?.jdLink} target='_blank' rel="noreferrer">View Job</a></div>
            </div>
        </div> : "" }
        
        
        {(data?.minExp) ? 
            <div className='job_exp'>
            <div className='min_exp'>Minimum Experience</div>
            <div className='min_exp_val'>{(data?.minExp)? data?.minExp: "0" }</div>
        </div> : ""
        }
        
    </div>
  )
}

export default JobsCard