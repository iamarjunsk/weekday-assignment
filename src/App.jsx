import { PostFetch } from "./utils/postFetch";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Filter from "./Components/Filter";
import "./App.css";
import { useSelector } from "react-redux";
function App() {
  const { filter } = useSelector((state) => state.filter);
  console.log({filter});
  const [jobs, setJobs] = useState([]);
  var postbody = {
    limit: 10,
    offset: 0,
  };
  useEffect(() => {
    const fetchdata = async () => {
      const apicall = await PostFetch("getSampleJdJSON", postbody);
      setJobs(apicall?.jdList);
    };
    fetchdata();
  }, []);
  return (
    <div className="page">
      <Filter />
    </div>
  );
}

export default App;
