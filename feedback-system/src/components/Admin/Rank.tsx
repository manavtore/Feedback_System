import {
  onSnapshot,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Teacher, classes, sClass, votes } from "./data/types";
import "../styles/style/rank.css";

type id_vote = {
  id: number;
  votes: number;
};

const Rank = () => {
  const [user, setUser] = useState("");
  const [tid, setTid] = useState<number[]>([0]);
  const [classVotes, setVotes] = useState<votes[]>();
  const [teachervotes, settvotes] = useState<id_vote[]>([]);
  const [val, setval] = useState<number[]>([]);
  const [tname, settname] = useState<string[]>([]);
  let [Class, setClass] = useState<classes>();
  let [selectTeacher, setTeacher] = useState<Teacher[]>();

  function handleClassSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(e.target.value);
    setUser(e.target.value);
  }
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
    // console.log("TOT VOTES", classVotes);
  }, [tid]);
  useEffect(() => {
    let tmp: id_vote[] = [];
    selectTeacher?.map((e) => {
      let t: id_vote = {
        id: 0,
        votes: 0,
      };
      let i = 0;
      classVotes
        ?.filter((el) => {
          return el.id == e.T_ID;
        })
        .map((ex, ind) => {
          i = ind;
          t.id = ex.id;
          t.votes =
            t.votes +
            ex.q0 +
            ex.q1 +
            ex.q2 +
            ex.q3 +
            ex.q4 +
            ex.q5 +
            ex.q6 +
            ex.q7;
        });
      // console.log(i);

      t.votes = t.votes / (i + 1);
      t.votes = (t.votes * 100) / 40;
      tmp.push(t);
    });
    settvotes(tmp);
  }, [classVotes]);

  return (
    <div>
      <div className="inp-ask">
        <label htmlFor="cars">ENTER THE CRITERIA</label>
        <br></br>
        <select
          name="class"
          id="class"
          onChange={handleClassSelection}
          value={user}
        >
          <option value="teacher">Select an option</option>
          {Class?.map((ele, ind) => {
            return (
              <option value={ele.CLASS} key={String(ind)}>
                {ele.CLASS}
              </option>
            );
          })}
        </select>
      </div>
      {teachervotes.length ? (
        <></>
      ) : (
        <>
          <div>
            {teachervotes?.map((e) => {
              return <h1>{e.votes}</h1>;
            })}
          </div>
        </>
      )}
      {teachervotes.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="cards-containers">
            {teachervotes
              .sort(function (x, y) {
                return y.votes - x.votes;
              })
              .map((e, i) => {
                return selectTeacher
                  ?.filter((el) => {
                    return el.T_ID === e.id;
                  })
                  .map((ex) => {
                    return (
                      <>
                        <div className="res-cards">
                          <div>{i + 1}</div>
                          <div className="img-name-teacher">
                            <img src={ex.url} />
                            <div>{ex.NAME}</div>
                          </div>
                          <div className="info-teacher">
                            <div>{ex.AWARDS}</div>
                            <div>EXPERIENCE :{ex.EXPERIENCE}</div>
                            <div>{ex.QUALIFICATION}</div>
                          </div>
                          <div>RESULT : {Math.round(e.votes)}</div>
                        </div>
                      </>
                    );
                  });
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Rank;
