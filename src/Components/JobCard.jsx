import { Card } from "@mui/material";
import React, { useState } from "react";

export default function JobCard({ job }) {
    const [showmore,setShowmore] = useState(false)
    function toggle(e){
        e.target.parentNode.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables smooth scrolling
        })
        if(showmore){
            setTimeout(()=>{
                setShowmore(prv=> !prv)
            },[500])
        } else{
            
            setShowmore(prv=> !prv)
        }

    }
  return (
    <Card className="job-card">
      <div className="header">
        <div>
          <img src={job.logoUrl} alt="" />
        </div>
        <div>
          <h5>{job.companyName}</h5>
          <p>{job.jobRole}</p>
          <p className="location">{job.location}</p>
        </div>
      </div>
      <p className="salary">
        Estimated Salary: {job.salaryCurrencyCode}{" "}
        {job.minJdSalary ? job.minJdSalary : 0} - {job.maxJdSalary}
      </p>
      <div className="more-det">
        <p>About Company:</p>
        <p className="about">About us</p>
        <div className={`desc ${!showmore?'line-clamp':''}`}>
          {job.jobDetailsFromCompany}
          <p className={`show-more ${!showmore?'aboslute':''}`} onClick={toggle}>{showmore?'Show Less':'Show More'}</p>
        </div>
      </div>
      <div className="apply-det">
        <p>Minimum Experience</p>
        <p className="exp">{job.minJdSalary?job.minJdSalary:0} years</p>
        <a href={job.jdLink} className="apply-btn"><span>⚡</span>Easy Apply</a>
      </div>
    </Card>
  );
}
