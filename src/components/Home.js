import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [anwers, setAnwers] = useState();
  useEffect(() => {
    const fetchApi = () => {
      axios
        .get(`https://recruitingmonk-v2.azurewebsites.net/qna`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
          setAnwers(res.data.answers);
        });
    };
    fetchApi();
  }, []);

  return (
    <div className="main">
      {data.map((data) => {
        return (
          <div>
          <div className="qna">
            <div className="first">
              <p className="date">Asked: {data.date.slice(0,10)}</p>
              {data.labels[0]!==""?(<p className="labels">In : {data.labels.map((label)=>{
                return(<span>{label},</span>)
              })}</p>):<></>}
            </div>
            <h4 className="quiz">{data.question}</h4>
            {/* <div dangerouslySetInnerHTML={{ __html: data.desc }}></div> */}
            <p>
              {data.answers.length >= 1?(data.answers.map((answer) => {
                return (
                  <div className="ans"
                    dangerouslySetInnerHTML={{ __html: answer.content }}
                  ></div>
                );
              })
        ):<div className="ans">No Answers Found</div>
              
              }
            </p>
          
          </div>
          <hr className="seperator"/>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
