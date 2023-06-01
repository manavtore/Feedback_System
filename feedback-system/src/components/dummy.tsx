import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";

const Dummy = () => {
  const ref = collection(db, "Teach");
  const q = query(ref, where("CLASS", "==", "SY IT A"));
  useEffect(() => {
    let fn = async () => {
      const data = await onSnapshot(q, (snap) => {
        console.log(
          snap.docs.map((ele) => {
            return ele.data();
          })
        );
      });

    };

    fn();
  }, []);

  return <div>dummy</div>;
};

export default Dummy;
