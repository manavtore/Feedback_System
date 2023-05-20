import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Teacher, classData } from "./Ranking";

import { useState, useEffect } from "react";

type qstns = string[];

// import React from 'react'

const Portal = () => {
  let rating = ["*", "**", "***", "****", "*****"];
  let [user, setUser] = useState("");
  let [tData, settData] = useState<Teacher>();
  let [teacherName, setName] = useState<string>();
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser(e.target.value);
  }

  function newHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    console.log(teacherName);
  }

  let classData = useQuery<classData>(["classdata"], async () => {
    let res = await axios.get("src/components/classNteacher.json");
    return res.data;
  });

  let Teachers = useQuery<Teacher>(["teacher"], async () => {
    let res = await axios.get("src/components/teacherData.json");
    return res.data;
  });

  useEffect(() => {
    let temp = classData.data?.find((ele) => {
      return ele.CLASS === user;
    });
    let temp2 = Teachers.data?.filter((ele) => {
      return temp?.TEACHERS.includes(ele.T_ID);
    });
    settData(temp2);
    console.log(tData);
  }, [classData.data, user]);

  let Questions = useQuery<qstns>(["questions"], async () => {
    let data = await axios.get("src/components/Questionarrie.json");
    return data.data;
  });

  return (
    <div>
      <div>
        <label htmlFor="browsers">SELECT YOUR CLASS</label>
        <input type="text" list="browsers" onChange={handler}></input>
      </div>

      <datalist id="browsers">
        {classData.data?.map((ele, ind) => {
          return <option value={ele.CLASS} key={ind}></option>;
        })}
      </datalist>
      <label htmlFor="teachers">SELECT THE TEACHER </label>
      <input type="text" list="teachers" onChange={newHandler}></input>
      <datalist id="teachers">
        {tData?.map((ele) => {
          return <option value={ele.NAME} key={ele.T_ID}></option>;
        })}
      </datalist>

      <hr></hr>
      <hr></hr>
      {teacherName ? (
        <div>
          <form action="">
            <h3>NAME:{teacherName}</h3>
            {Questions.data?.map((ele, ind) => {
              return (
                <>
                  <div key={ind}>{ele}</div>
                  {rating.map((ele) => {
                    return (
                      <div>
                        <input type="radio" name="rating" />
                        <label> {ele}</label>
                      </div>
                    );
                  })}
                  <button>SUBMIT</button>
                </>
              );
            })}
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Portal;
