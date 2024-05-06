import React, { useEffect, useState } from "react";
import "../styles/filter.css";
import Select from "./Select";
import { PostFetch } from "../utils/postFetch";
export default function Filter() {
  const [exp, setExp] = useState([]);
  const [comp, setComp] = useState([]);
  const [loc, setLoc] = useState([]);
  const [rols, setRols] = useState([]);
  const [MinBas, setMinBas] = useState([]);
  const [workty, setWorkty] = useState([]);
  
  const [wholedata, setWholeData] = useState([]);
  const [fileterOp, setFilterOP] = useState({
    companies: [],
    locations: [],
    roles: [],
    minBasePay: [],
  });
  var postbody = {
    limit: 1000,
    offset: 0,
  };
  var companies = [],
    locations = [],
    techStacks = [],
    roles = [],
    minBasePay = [];
  var minExp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var worktype = ["Remote", "On-Site"];
  var totaldata;
  var dataCount;
  useEffect(() => {
    const fetchdata = async () => {
      const apicall = await PostFetch("getSampleJdJSON", postbody);
      totaldata = apicall?.jdList;
      dataCount = apicall.totalCount;
      totaldata.forEach((e) => {
        !companies.includes(e.companyName) && e.companyName
          ? companies.push(e.companyName)
          : null;
        !locations.includes(e.location) && e.location
          ? locations.push(e.location)
          : null;
        !roles.includes(e.jobRole) && e.jobRole ? roles.push(e.jobRole) : null;
        !minBasePay.includes(e.minJdSalary) && e.minJdSalary
          ? minBasePay.push(e.minJdSalary)
          : null;
      });
      setFilterOP({
        companies: companies.sort((a, b) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();

          if (aLower < bLower) return -1;
          if (aLower > bLower) return 1;
          return 0;
        }),
        locations: locations.sort((a, b) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();

          if (aLower < bLower) return -1;
          if (aLower > bLower) return 1;
          return 0;
        }),
        roles: roles.sort((a, b) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();

          if (aLower < bLower) return -1;
          if (aLower > bLower) return 1;
          return 0;
        }),
        minBasePay: minBasePay.sort((a, b) => a - b),
      });
    };
    fetchdata();
  }, []);

  return (
    <div className="filter">
      <Select
        placeholder={"Roles"}
        _options={fileterOp.roles}
        value={rols}
        onChange={setRols}
      />
      <Select
        placeholder={"Experience"}
        _options={minExp}
        value={exp}
        onChange={setExp}
      />

      <Select
        placeholder={"Work Type"}
        _options={worktype}
        value={workty}
        onChange={setWorkty}
      />
      <Select
        placeholder={"Locations"}
        _options={fileterOp.locations}
        value={loc}
        onChange={setLoc}
      />

      <Select
        placeholder={"Min Base pay"}
        _options={fileterOp.minBasePay}
        value={MinBas}
        onChange={setMinBas}
      />
      <Select
        placeholder={"Companies"}
        _options={fileterOp.companies}
        value={comp}
        onChange={setComp}
      />
    </div>
  );
}
