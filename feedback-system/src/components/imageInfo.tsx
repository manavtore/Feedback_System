import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type imgArr = [image];

type image = {
  url: string;
  id: number;
};
const ImageInfo = () => {
  let op = useQuery<imgArr>(["images"], async () => {
    let res = await axios.get("src/components/images.json");
    return res.data;
  });
  return (
    <>
      <div className="center">
        <div className="imginfo">
          {op.data?.map((ele, index) => {
            return (
              <>
                <div key={index}>
                  <img src={ele.url} key={ele.id} alt="Image1" width={310} />
                  <span key={index}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi debitis quisquam libero a aspernatur asperiores,
                    quaerat sunt ipsam laudantium, unde temporibus vero vitae
                    magnam reiciendis perferendis atque perspiciatis dolorum
                    similique optio, deserunt vel nam consequatur dicta itaque!
                    Quam accusantium illo impedit assumenda magnam, et in
                    aliquid, voluptates non omnis aut, fugiat sequi vitae
                    provident ad sint maiores doloribus ab esse.
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageInfo;
