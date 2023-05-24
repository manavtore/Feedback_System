import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Teacher, classData } from "./Ranking";
import React from "react";
import { useState, useEffect } from "react";
import "./styles/portal.css";

type qstns = string[];

// import React from 'react'

const Portal = () => {
  let rating = [5, 4, 3, 2, 1];
  let [res, setRes] = useState({
    q0: 0,
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
  });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.table(res);
  };
  const ansHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setRes((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
    <main>
      <div className="criteria">
        <label htmlFor="browsers">SELECT YOUR CLASS</label>
        <br></br>
        <input type="text" list="browsers" onChange={handler}></input>

        <datalist id="browsers">
          {classData.data?.map((ele, ind) => {
            return <option value={ele.CLASS} key={ind}></option>;
          })}
        </datalist>
        <br></br>
        <br></br>
        <label htmlFor="teachers">SELECT THE TEACHER </label>
        <br></br>
        <input type="text" list="teachers" onChange={newHandler}></input>
        <datalist id="teachers">
          {tData?.map((ele) => {
            return <option value={ele.NAME} key={ele.T_ID}></option>;
          })}
        </datalist>
      </div>
      {tData?.filter((ele) => {
        return ele.NAME === teacherName;
      }).length == 0 || teacherName?.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="main-form">
            <h1>{teacherName}</h1>
            <div className="grid">
              <h5>SR.NO</h5>
              <h5>EXCELLENT</h5>
              <h5>GREAT</h5>
              <h5>VERY GOOD</h5>
              <h5>GOOD</h5>
              <h5>AVERAGE</h5>
            </div>
            {teacherName ? (
              <form onSubmit={handleSubmit} className="grid-inner">
                {Questions.data?.map((ele, index) => {
                  return (
                    <>
                      <div key={index} className="question">
                        {index + 1 + ". " + ele}
                      </div>
                      {rating.map((ele) => {
                        return (
                          <div>
                            <input
                              type="radio"
                              name={String("q" + index)}
                              value={String(ele)}
                              onChange={(e) => ansHandler(e)}
                            />
                          </div>
                        );
                      })}
                    </>
                  );
                })}
                <button className="submit">SUBMIT</button>
              </form>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Portal;
