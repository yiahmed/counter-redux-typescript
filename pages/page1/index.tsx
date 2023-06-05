import axios from "axios";
import PlayerData from "@/components/shared/features/api-calls-components/playerData";
import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

const Card: React.FC = () => {
  const subtitleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const subtitle = subtitleRef.current;
    if (subtitle) {
      const words = subtitle.innerText.split(" ");
      subtitle.innerHTML = words
        .map(
          (word, index) =>
            `<span class="card-subtitle-word" style="transition-delay: ${
              index * 40
            }ms">${word} </span>`
        )
        .join("");
    }
  }, []);

  return (
    <div className="card border-blue-500 w-56 aspect-w-10 aspect-h-16 cursor-pointer relative">
      <div className="card-content bg-gradient-to-b from-blue-800 via-pink-500 to-yellow-300 transition-transform duration-350 ease hover:bg-gradient-to-b hover:from-blue-700 hover:via-pink-400 hover:to-yellow-200">
        <h3 className="card-title text-white font-medium text-6xl">
          I know exactly what I'm doing
        </h3>
        <h4
          ref={subtitleRef}
          className="card-subtitle text-white font-medium text-3xl mt-8"
        ></h4>
      </div>
      <i className="card-icon fa-solid fa-hat-witch text-white opacity-50 text-7xl absolute left-4 bottom-4 transition-colors duration-250"></i>
    </div>
  );
};

const Links: React.FC = () => (
  <>
    <a id="source-link" className="meta-link top-14" href="" target="_blank">
      <i className="fa-solid fa-link text-indigo-500 h-5 leading-5"></i>
      <span className="text-white font-mono">Source</span>
    </a>
    <a id="yt-link" className="meta-link top-4" href="" target="_blank">
      <i className=" text-red-500 h-5 leading-5"></i>
      <span>3 min tutorial</span>
    </a>
  </>
);

const App: React.FC = () => (
  <div className="bg-gray-900 min-h-screen grid place-items-center">
    <Card />
    <Links />
  </div>
);

export default App;
