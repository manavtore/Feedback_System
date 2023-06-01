import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React from "react";
import { useState, useEffect } from "react";
import "./styles/portal.css";
import {
  collection,
  getDocs,
  onSnapshot,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { classes, qstns, sClass, teacher, votes } from "./types";

// import React from 'react'

const Portal = () => {
  //references
  let classRef = collection(db, "Teach");
  let teacherRef = collection(db, "Teacher");
  let voteref = collection(db, "Votes");
  //
  let rating = [5, 4, 3, 2, 1];
  let [res, setRes] = useState<votes>({
    id: 0,
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
  let [nameset, setnames] = useState<classes>([]);
  let [classdata, setc] = useState<sClass>();
  let [tData, settData] = useState<teacher[]>();
  let [teacherName, setName] = useState<string>();

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser(e.target.value);
  }

  function newHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    console.log(teacherName);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (res.id != 0) {
      if (
        Object.values(res).filter((e) => {
          return e === 0;
        }).length == 0
      ) {
        addDoc(voteref, res);
        alert("FEEDBACK SENT SUCCESSFULLY");
      } else {
        event.preventDefault();
        alert("PLEASE ENTER ALL FIELDS");
      }
    }
  };
  const ansHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    let td = tData
      ?.filter((e) => {
        return e.NAME === teacherName;
      })
      .map((ee) => {
        return ee.T_ID;
      }) || [0];
    setRes((oldn) => ({
      ...oldn,
      id: td[0],
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    let fn = async () => {
      await onSnapshot(classRef, (snapshot) => {
        const empArr: sClass[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as sClass;
          empArr.push(data);
        });
        setnames(empArr);
      });
    };
    fn();
  }, []);
  const classref = query(classRef, where("CLASS", "==", user));

  useEffect(() => {
    if (user) {
      let fn = async () => {
        await onSnapshot(classref, (snapshot) => {
          const empArr: sClass[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as sClass;
            empArr.push(data);
            setc(data);
            console.log(empArr);
          });
        });
      };
      fn();
    }
  }, [user]);

  const teacherref = query(
    teacherRef,
    where("T_ID", "in", classdata?.TEACHERS ?? [0])
  );
  useEffect(() => {
    console.log("hi");
    onSnapshot(teacherref, (snapshot) => {
      const empArr: teacher[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as teacher;
        empArr.push(data);
        console.table(empArr);
        settData(empArr);
      });
    });
  }, [classdata]);

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
          {nameset?.map((ele, ind) => {
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
      {tData?.filter((ele: teacher) => {
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
              <form onSubmit={(e) => handleSubmit(e)} className="grid-inner">
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
