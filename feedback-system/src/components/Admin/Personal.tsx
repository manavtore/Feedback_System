import {
  Unsubscribe,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Suggestion, Teacher, votes } from "./data/types";

import "../styles/style/personal.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  ArcElement,
  Legend,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Tooltip,
  Legend
);

const Personal = () => {
  const options = {};

  let maxKey = "";
  let maxVal = -Infinity;
  function handleClassSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setuser(eval(e.target.value));
  }

  const [user, setuser] = useState<number>(0);
  const [sumVotes, setSumVotes] = useState<votes[]>([]);
  const [Teacherlist, settechr] = useState<Teacher[]>([]);
  let [Result, setresult] = useState<votes>({
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
  let [suggestion_data, setSugdata] = useState<Suggestion[]>([]);
  let [maxkeyval, setmaxkeyval] = useState<(string | number)[]>([]);

  let teacherref = collection(db, "Teacher");
  useEffect(() => {
    const fn = async () => {
      let unsub = await onSnapshot(teacherref, (snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return doc.data() as Teacher;
        });
        settechr(data);
      });
    };
    fn();
  }, []);
  let wait: Unsubscribe;
  useEffect(() => {
    let temp: votes[] = [];
    let voteQuery = query(collection(db, "Votes"), where("id", "==", user));
    let fetchFn = async () => {
      wait = await onSnapshot(voteQuery, (snapshot) => {
        let data = snapshot.docs.map((e) => {
          temp.push(e.data() as votes);
          return e.data() as votes;
        });
        setSumVotes(temp);
      });
    };
    fetchFn();
  }, [user]);
  useEffect(() => {
    let result: votes = {
      id: 0,
      q0: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
    };
    sumVotes.map((x, ind) => {
      result.id = x.id;
      result.q0 = result.q0 + x.q0;
      result.q1 = result.q1 + x.q1;
      result.q2 = result.q2 + x.q2;
      result.q3 = result.q3 + x.q3;
      result.q4 = result.q4 + x.q4;
      result.q5 = result.q5 + x.q5;
      result.q6 = result.q6 + x.q6;
      result.q7 = result.q7 + x.q7;
    });
    result.q0 = (result.q0 * 20) / sumVotes.length;
    result.q1 = (result.q1 * 20) / sumVotes.length;
    result.q2 = (result.q2 * 20) / sumVotes.length;
    result.q3 = (result.q3 * 20) / sumVotes.length;
    result.q4 = (result.q4 * 20) / sumVotes.length;
    result.q5 = (result.q5 * 20) / sumVotes.length;
    result.q6 = (result.q6 * 20) / sumVotes.length;
    result.q7 = (result.q7 * 20) / sumVotes.length;
    setresult(result);
  }, [sumVotes]);

  useEffect(() => {
    for (const [key, value] of Object.entries(Result).slice(1)) {
      let tp = [];
      if (value > maxVal) {
        maxVal = value;
        maxKey = key;
        tp.push(maxKey);
        tp.push(maxVal);
        setmaxkeyval(tp);
      }
    }
    console.log(Object.entries(Result));
  }, [Result]);

  const data = {
    labels: Object.keys(Result).slice(1),
    datasets: [
      {
        label: "",
        data: Object.values(Result).slice(1),
        backgroundColor: [
          "rgb(147, 118, 224)",
          "rgb(232, 147, 207)",
          "rgb(243, 188, 200)",
          "rgb(246, 255, 166)",
          "rgb(6, 141, 169)",
          "rgb(126, 23, 23)",
          "rgb(229, 88, 7)",
        ],
        borderColor: "black",
        borderWidth: 1,
        maxBarThickness: 100,
      },
    ],
  };
  const datapie = {
    labels: Object.keys(Result).slice(1),
    datasets: [
      {
        label: "",
        data: Object.values(Result).slice(1),
        backgroundColor: [
          "rgb(190, 90, 131)",
          "rgb(255, 184, 76)",
          "rgb(0, 159, 189)",
          "rgb(249, 217, 73)",
          "rgb(252, 79, 0)",
          "rgb(33, 0, 98)",
          "rgb(199, 233, 176)",
          "rgb(178, 164, 255)",
        ],
        borderColor: "black",
        borderWidth: 1,
        maxBarThickness: 100,
      },
    ],
  };
  return (
    <div className="full-disp">
      <div className="inp-ask">
        <label htmlFor="teacher">ENTER THE CRITERIA</label>
        <br></br>
        <select
          name="class"
          id="class"
          onChange={handleClassSelection}
          value={user}
        >
          <option value="0">Select an option</option>
          {Teacherlist?.map((ele, ind) => {
            return (
              <option value={ele.T_ID} key={String(ind)}>
                {ele.NAME}
              </option>
            );
          })}
        </select>
      </div>
      <div></div>
      {Result.id <= 0 ? (
        <></>
      ) : (
        <>
          <div className="center">
            <div className="card-disp">
              <div>
                {Teacherlist?.filter((e) => {
                  return e.T_ID === user;
                }).map((el) => {
                  return (
                    <>
                      <img src={el.url} className="face" />
                      <div>NAME: {el.NAME}</div>
                    </>
                  );
                })}
              </div>
              <div>
                <span>
                  CUMMULATIVE RATING:
                  {parseFloat(
                    String(
                      Object.values(Result)
                        .slice(1)
                        .reduce((a, b) => a + b) / 8
                    )
                  )}
                </span>
              </div>
              <span>QUESTION NUMBER WITH HIGHEST VOTES: {maxkeyval[0]}</span>
              <div>RATING ON THIS QUESTION:{maxkeyval[1]}</div>
            </div>
          </div>
          <div className="graphs">
            <div className="bar-graph">
              <span>QUESTION VS PERCENTAGE OF VOTES</span>
              <Bar data={data} options={options} />
            </div>
            <div className="doughnut">
              <span>DOUGHNUT CHART OF QUESTION VS VOTES</span>
              <Doughnut data={datapie} options={options} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Personal;
