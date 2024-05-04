import { PostFetch } from "./utils/postFetch";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [jobs, setJobs] = useState([]);
  var postbody = {
    limit: 10,
    offset: 0,
  };
  useEffect(() => {
    const fetchdata = async () => {
      const apicall = await PostFetch("getSampleJdJSON",postbody);
      setJobs(apicall?.jdList)
    };
    fetchdata()
  },[]);
  return <>
    {
      jobs.map(e=>{
        return(
          <div>{e.jobRole}</div>
        )
      })
    }
  </>;
}

export default App;
