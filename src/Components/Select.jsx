import React, { useEffect, useState } from "react";

export default function Select({ value, onChange, _options, placeholder }) {
    // console.log(_options);

    const [options,setOptions] = useState([..._options])
    const [toggle,setToggle] = useState(false)
    var flag = false
    useEffect(()=>{
        console.log(_options);
        if(_options.length && !flag){
            flag = true
            setOptions([..._options])
        }
    },[_options])
    function movetoSelected(i){
        var opts = [...options]
        const sltd = opts.splice(i,1)
        onChange([...value,...sltd])
        setOptions([...opts])
    }
    function removeFromSelected(i){
        var vals = [...value]
        const sltd = vals.splice(i,1)
        setOptions([...options,...sltd])
        onChange([...vals])
    }
    function handleTogggle(){
        setToggle((prv)=> !prv)
    }
    function search(val){
        if(val == ''){
            let resultArray = _options.filter(item => !value.includes(item));
            setOptions(resultArray)
            return
        }
        const array = options.filter(item => {
            if (typeof item === 'string') {
                return item.includes(val);
            } else if (typeof item === 'number') {
                return item.toString().includes(val);
            }
        })
        setOptions(array)
    }
    return (
    <div className="fil-field">
      <span className="values">
        {value.map((e, i) => {
          return (
            <span key={i} className="selected-opt">
              {e} <span onClick={()=>removeFromSelected(i)} className="cls-btn">&times;</span>
            </span>
          );
        })}
        <input type="text" onChange={(e)=>search(e.target.value)} placeholder={!value?.length ? placeholder : ""} />
      </span>
      <button className="cls-btn">&times;</button>
      <div className="divider"></div>
      <div className="caret" onClick={handleTogggle}>
        <svg
          fill="currentColor"
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>
      {
        toggle &&
        <ul>
            {options.length ? (
            options.map((e, i) => {
                return <li onClick={() => movetoSelected(i)}>{e}</li>;
            })
            ) : (
            <li>Nothing to show</li>
            )}
        </ul>
      }
    </div>
  );
}
