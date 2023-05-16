import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export type classData = [singleClass];

export type singleClass = {
  CLASS: string;
  DEPARTMENT: string;
  TEACHERS: number[];
};

export type Teacher = { NAME: string; DEPARTMENT: string; T_ID: number }[];

const Ranking = () => {
  let [user, setUser] = useState("");
  let [tid, setTid] = useState<number[]>([]);
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
    let temp = classData.data?.find((ele) => {
      return ele.CLASS === user;
    });
    setTid(temp?.TEACHERS ??[]);
    console.log(
      Teachers.data?.filter((ele) => {
        return tid.includes(ele.T_ID);
      })
    );
  }, [classData.data, user]);

  return (
    <div>
      <label htmlFor="browsers">SELECT YOUR CLASS</label>
      <input type="text" list="browsers" onChange={handler}></input>

      <datalist id="browsers">
        {classData.data?.map((ele, ind) => {
          return <option value={ele.CLASS} key={ind}></option>;
        })}
      </datalist>
      <hr></hr>
      <h3>RANKINGS ARE</h3>
      {Teachers.isLoading ? (
        <div>Loading...</div>
      ) : (
        Teachers.data
          ?.filter((ele) => {
            return tid.includes(ele.T_ID);
          })
          .map((ele, ind) => {
            return <div key={ind}>{ele.NAME}</div>;
          })
      )}
    </div>
  );
};

export default Ranking;
