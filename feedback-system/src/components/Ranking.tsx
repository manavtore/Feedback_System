import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/ranking.css";
import AOS from "aos";
import React from 'react';

export type classData = [singleClass];

export type singleClass = {
  CLASS: string;
  DEPARTMENT: string;
  TEACHERS: number[];
};

export type Teacher = {
  RESULT: number;
  url: string;
  NAME: string;
  DEPARTMENT: string;
  T_ID: number;
  QUALIFICATION: string;
  EXPERIENCE: string;
  AWARDS: string;
}[];

const Ranking = () => {
  let [user, setUser] = useState("");
  let [tid, setTid] = useState<number[]>([]);
  let [select, setSelect] = useState<number[]>([]);
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser(e.target.value);
    console.log(user);
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
    AOS.init();
  }, []);

  useEffect(() => {
    let temp = classData.data?.find((ele) => {
      return ele.CLASS === user;
    });
    setTid(temp?.TEACHERS ?? []);

    // setSelect([...temp?.TEACHERS]);
  }, [classData.data, user]);

  return (
    <main>
      <div className="criteria">
        <label htmlFor="browsers">SELECT THE CRITERIA</label>
        <br></br>
        <input type="text" list="browsers" onChange={handler}></input>

        <datalist id="browsers">
          {classData.data?.map((ele, ind) => {
            return <option value={ele.CLASS} key={ind}></option>;
          })}
        </datalist>
      </div>

      {select.length == 0 || tid.length === 0 ? (
        <></>
      ) : (
        <>
          {Teachers.data
            ?.filter((ele) => {
              return ele.T_ID === select[0];
            })
            .map((ele) => {
              return (
                <div className="main-display" data-aos="fade-right">
                  <div className="data">
                    <span>{select[1] + 1}</span>
                    <div className="img-name">
                      <img src={ele.url} width={100}></img>
                      <div className="name">{ele.NAME}</div>
                    </div>
                    <div className="qualities">
                      <div>{ele.QUALIFICATION}</div>
                      <div>{"EXPERIENCE: " + ele.EXPERIENCE}</div>
                      <div>{ele.AWARDS}</div>
                    </div>
                  </div>
                  <div className="result">{"RESULT : " + ele.RESULT}</div>
                </div>
              );
            })}
        </>
      )}

      {Teachers.isLoading ? (
        <div>Loading...</div>
      ) : (
        Teachers.data
          ?.filter((ele) => {
            return tid.includes(ele.T_ID);
          })
          .map((ele, ind) => {
            return (
              <div
                className="card"
                key={ind}
                onClick={() => {
                  let temp: Array<number> = [ele.T_ID, ind];
                  setSelect(temp);
                }}
              >
                <div className="card-body">
                  <div>{ind + 1}</div>
                  <img src={ele.url} width={70}></img>
                  <div>
                    <div className="name">{ele.NAME}</div>
                    <div className="department">
                      {ele.DEPARTMENT + " DEPARTMENT"}
                    </div>
                  </div>
                </div>
                <div className="result">{"RESULT " + ele.RESULT}</div>
              </div>
            );
          })
      )}
    </main>
  );
};

export default Ranking;
