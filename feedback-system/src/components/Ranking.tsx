import { useEffect, useState } from "react";
import "./styles/ranking.css";
import AOS from "aos";
import React from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { classes, sClass, teacher } from "./types";

const Ranking = () => {
  let [user, setUser] = useState("");
  let [nameset, setnames] = useState<classes>([]);
  let [teachers, setteachers] = useState<teacher[]>([]);
  let [tid, setTid] = useState<number[]>([0]);
  let [select, setSelect] = useState<number[]>([]);
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser(e.target.value);

    console.log(user);
  }
  let classRef = collection(db, "Teach");
  let teacherref = collection(db, "Teacher");

  useEffect(() => {
    let fn = async () => {
      await onSnapshot(classRef, (snapshot) => {
        const empArr: sClass[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as sClass;
          empArr.push(data);
        });
        setnames(empArr ?? []);
      });
    };
    fn();
    console.log(
      nameset?.find((e) => {
        e.CLASS === user;
      })
    );
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  let teacherquery = query(teacherref, where("T_ID", "in", tid));
  useEffect(() => {
    let tp = nameset?.find((el) => {
      return el.CLASS === user;
    });
    setTid(tp?.TEACHERS ?? [0]);
    // console.log(tid);
  }, [user]);

  useEffect(() => {
    setSelect([tid[0], 0]);
    let fn = async () => {
      await onSnapshot(teacherquery, (snapshot) => {
        const empArr: teacher[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as teacher;
          empArr.push(data);
        });
        console.log(empArr);
        setteachers(empArr);
      });
    };
    fn();
  }, [tid]);

  return (
    <main>
      <div className="criteria">
        <label htmlFor="browsers">SELECT THE CRITERIA</label>
        <br></br>
        <input type="text" list="browsers" onChange={handler}></input>

        <datalist id="browsers">
          {nameset?.map((ele, ind) => {
            return <option value={ele.CLASS} key={ind}></option>;
          })}
        </datalist>
      </div>
      {select.length == 0 || tid.length === 0 ? (
        <></>
      ) : (
        <>
          {teachers
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

      {user.length === 0 ? (
        <div></div>
      ) : (
        teachers
          .sort((x, y) => {
            return y.RESULT - x.RESULT;
          })
          .map((ele, ind) => {
            return (
              <div
                className="card"
                key={ind}
                onClick={() => {
                  let temp: Array<number> = [ele.T_ID, ind];
                  setSelect(temp);
                  console.log(select);
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
