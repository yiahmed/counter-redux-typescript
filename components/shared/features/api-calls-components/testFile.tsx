import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const GreetingContainer = ({ text, logo, flag }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/stats",
      params: { postseason: "true", "seasons[]": "2022", per_page: "100" },
      headers: { "Content-Type": "application/json" },
    };
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="w-1/2 border rounded shadow-lg h-1/2">
      <div className="flex w-full h-full">
        <div className="w-full h-full">
          <span className="flex flex-col items-center justify-center w-full h-full overflow-auto font-mono text-xl font-extrabold text-center">
            {data &&
              data.map((singleData, index) => {
                return (
                  <Link href={`/${singleData.player.id}`} key={index}>
                    {singleData.player.first_name +
                      " " +
                      singleData.player.last_name}
                  </Link>
                );
              })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GreetingContainer;