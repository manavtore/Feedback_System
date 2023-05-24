import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type imgArr = [image];
import "./styles/imageinfo.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import React from 'react';

type image = {
  url: string;
  id: number;
  text: string;
  name: string;
};
const ImageInfo = () => {
  let op = useQuery<imgArr>(["images"], async () => {
    let res = await axios.get("src/components/images.json");
    return res.data;
  });
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div>
        <h4>HERE’S WHAT PEOPLE SAY ABOUT FEEDBACKS</h4>
        <div className="imginfo">
          {op.data?.map((ele, index) => (
            <div
              key={index}
              className="testimonials"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <img src={ele.url} key={ele.id} alt="Image1" width={150} />
              <div className="flex">
                <div key={index}>{ele.text}</div>
                <div className="name">{ele.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageInfo;
