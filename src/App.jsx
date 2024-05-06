import { PostFetch } from "./utils/postFetch";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Filter from "./Components/Filter";
import "./App.css";
import "./styles/job-listing.css";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import JobCard from "./Components/JobCard";
function App() {
  const { filter } = useSelector((state) => state.filter);
  const [jobs, setJobs] = useState([]);
  const [loading,setLoading] = useState(false)

  var postbody = {
    limit: 10,
    offset: 0,
  };
  var listNumber;
  const fetchdata = async () => {
    setLoading(true)
    const apicall = await PostFetch("getSampleJdJSON", postbody);
    setJobs(apicall?.jdList);
    setLoading(false)
    listNumber = apicall.totalCount;
  };

  useEffect(() => {
    // Function to load initial content
    fetchdata();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      // calling next api
      if (postbody.offset < listNumber) {
        postbody = {
          limit: 10,
          offset: postbody.offset + 10,
        };
        setLoading(true)
        const apicall = await PostFetch("getSampleJdJSON", postbody);
        setJobs((prv) => [...prv, ...apicall?.jdList]);
        setLoading(false)
      }
    }
  };
  return (
    <div className="page">
      <Filter />
      <div className="job-listing">
        {jobs.map((job) => {
          if(
            (filter.companies.includes(job.companyName) || !filter.companies.length) && 
            (filter.locations.includes(job.location) || !filter.locations.length) &&
            (filter.minBasePay<job.minJdSalary || !filter.minBasePay.length) &&
            (filter.experience.includes(job.minExp) || !filter.experience.length) &&
            (filter.roles?.includes(job.jobRole) || !filter.roles?.length) &&
            (filter.worktype.includes(job.location) || filter.worktype.includes('On-Site') || !filter.worktype.length)
          ){

            return <JobCard job={job} />;
          }
        })}
      </div>
      {
        loading && 
        <div className="loading">Loading...</div>
      }
    </div>
  );
}

export default App;
