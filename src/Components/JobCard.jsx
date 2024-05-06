import { Card } from "@mui/material";
import React, { useState } from "react";

export default function JobCard({ job }) {
    // State to manage whether to show more details or not
    const [showmore,setShowmore] = useState(false)
    
    // Function to toggle show more/less details
    function toggle(e){
        // Scroll to the top of the card when toggling to show more/less
        e.target.parentNode.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        // Toggle showmore state after a delay of 500ms
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
          {/* Display company logo */}
          <img src={job.logoUrl} alt="" />
        </div>
        <div>
          {/* Display company name, job role, and location */}
          <h5>{job.companyName}</h5>
          <p>{job.jobRole}</p>
          <p className="location">{job.location}</p>
        </div>
      </div>
      {/* Display estimated salary range */}
      <p className="salary">
        Estimated Salary: {job.salaryCurrencyCode}{" "}
        {job.minJdSalary ? job.minJdSalary : 0} - {job.maxJdSalary}
      </p>
      <div className="more-det">
        <p>About Company:</p>
        <p className="about">About us</p>
        <div className={`desc ${!showmore?'line-clamp':''}`}>
          {/* Display job details from the company */}
          {job.jobDetailsFromCompany}
          {/* Show more/less button */}
          <p className={`show-more ${!showmore?'aboslute':''}`} onClick={toggle}>{showmore?'Show Less':'Show More'}</p>
        </div>
      </div>
      <div className="apply-det">
        <p>Minimum Experience</p>
        {/* Display minimum experience required */}
        <p className="exp">{job.minJdSalary?job.minJdSalary:0} years</p>
        {/* Button to apply */}
        <a href={job.jdLink} className="apply-btn"><span>⚡</span>Easy Apply</a>
      </div>
    </Card>
  );
}
