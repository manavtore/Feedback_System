import { useState, useEffect } from "react";
import "../styles/style/comon.css";
import { Colors } from "chart.js";
// import Chart from "react-apexcharts";
import {
  Chart as ChartJS,
  BarElement,
  RadialLinearScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Teacher, classes, sClass, votes } from "./data/types";

export type classData = [singleClass];

export type singleClass = {
  CLASS: string;
  DEPARTMENT: string;
  TEACHERS: number[];
};

export type feed = {
  id: number;
  Votes: number[];
}[];

ChartJS.register(
  BarElement,
  ArcElement,
  Colors,
  // CategoryScale,
  RadialLinearScale,

  LinearScale
);

const Commondata = () => {
  const [user, setUser] = useState("");
  const [tid, setTid] = useState<number[]>([0]);
  const [classVotes, setVotes] = useState<votes[]>();
  const [val, setval] = useState<number[]>([]);
  const [tname, settname] = useState<string[]>([]);
  let [Class, setClass] = useState<classes>();
  let [selectTeacher, setTeacher] = useState<Teacher[]>();

  let classref = collection(db, "Teach");
  useEffect(() => {
    const fn = async () => {
      let unsub = await getDocs(classref);
      let data = unsub.docs.map((doc) => {
        return doc.data() as sClass;
      });
      setClass(data);
    };
    fn();
  }, []);

  // let teacherquery=query(collection(db,"Teacher"),where())
  useEffect(() => {
    var temp = Class?.find((ele) => ele.CLASS === user);
    setTid(temp?.TEACHERS ?? [0]);
  }, [user]);

  useEffect(() => {
    let teacherquery = query(
      collection(db, "Teacher"),
      where("T_ID", "in", tid ?? [0, 2])
    );
    let teacherFetch = async () => {
      let teachers = await onSnapshot(teacherquery, (snapshot) => {
        let data = snapshot.docs.map((e) => {
          return e.data() as Teacher;
        });
        let temp = data.map((e) => {
          return e.NAME;
        });
        settname(temp);
        setTeacher(data);
      });
    };
    teacherFetch();
    let voteref = query(collection(db, "Votes"), where("id", "in", tid));
    let voteFetch = async () => {
      await onSnapshot(voteref, (votes) => {
        let unsub = votes.docs.map((e) => {
          return e.data() as votes;
        });
        setVotes(unsub);
      });
    };
    voteFetch();
  }, [tid]);

  useEffect(() => {
    let tot = 0;
    let i = 0;

    let w: number[] = [];
    selectTeacher?.map((el) => {
      classVotes
        ?.filter((e) => {
          return e.id == el.T_ID;
        })
        .map((el) => {
          i = i + 1;
          tot =
            tot +
              el.q0 +
              el.q1 +
              el.q2 +
              el.q3 +
              el.q4 +
              el.q5 +
              el.q6 +
              el.q7 || 0;
        }) || [0];
      tot = tot / i;
      tot = (tot * 100) / 40;
      w.push(tot);
      tot = 0;
      i = 0;
      // console.log(to);
    });
    setval(w);
  }, [classVotes]);

  function handleClassSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setUser(e.target.value);
  }

  const data = {
    labels: tname,
    datasets: [
      {
        label: "",
        data: val,
        backgroundColor: [
          "rgb(342, 216, 216)",
          "rgb(45, 66, 89)",
          "rgb(84, 127, 189)",
          "rgb(92, 137, 132)",
          "rgb(255, 184, 76)",
          "rgb(255, 184, 76)",
        ],
        borderColor: "black",
        borderWidth: 2,
        maxBarThickness: 100,
      },
    ],
  };
  const datapie = {
    labels: tname,
    datasets: [
      {
        label: "",
        data: val,
        backgroundColor: [
          "rgb(147, 118, 224)",
          "rgb(255, 184, 76)",
          "rgb(229, 88, 7)",
          "rgb(92, 137, 132)",
          "rgb(44, 211, 225)",
        ],
        borderColor: "black",
        borderWidth: 1,
        maxBarThickness: 100,
        circular: true,
      },
    ],
  };

  const options = {};

  return (
    <>
      <div className="full-disp">
        <div className="inp-ask">
          <label htmlFor="cars">ENTER THE CRITERIA</label>
          <br></br>
          <select
            name="class"
            id="class"
            onChange={handleClassSelection}
            value={user}
          >
            <option value="">Select an option</option>
            {Class?.map((ele: any, ind: number) => {
              return (
                <option value={ele.CLASS} key={String(ind)}>
                  {ele.CLASS}
                </option>
              );
            })}
          </select>
        </div>

        {val.length > 0 && (
          <>
            <div className="table-center">
              {selectTeacher?.map((el, i) => {
                return (
                  <div key={i} className="tables">
                    <div className="table-element center">
                      {el?.NAME + ": "}
                    </div>
                    <div className="table-element center">
                      {Math.round(
                        val?.find((ele, ind) => {
                          return ind === i;
                        }) || 0
                      )}
                    </div>
                    <div className="table-element center">
                      {el?.TEACH.map((e: { CLASS: string; SUBJECT: any }) => {
                        if (e.CLASS === user) {
                          return e.SUBJECT;
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="common-graphs">
              <div className="common-graph">
                <div>RESULTS OF FEEDBACK FORM IN PERCENTAGE</div>
                <Bar data={data} options={options} />
              </div>
              <div className="pie">
                <h4>PIE CHART REPRESENTATION</h4>
                <Pie data={datapie} options={options} />
              </div>
            </div>
            <div className="center">
              <div className="avg">
                <div>
                  THE AVERAGE RATING OF THIS CLASS:{" "}
                  {Math.round(
                    val?.reduce((x, y) => {
                      return x + y;
                    }) / val.length
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Commondata;
// <>
//   <Chart
//     type="bar"
//     width={900}
//     height={700}
//     series={[
//       {
//         name: "TEACHER DATA",
//         data: classVotes ?? [],
//       },
//     ]}
//     options={{
//       title: {
//         text: "CHART MF",
//       },

//       colors: ["#f90000"],
//     }}
//   ></Chart>
// </>
