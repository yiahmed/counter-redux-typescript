import React from "react";
import Image from "next/image";
import { Counter } from "@/components/shared/features/counter/Counter";

const Home = () => {
  return (
    <div className="App text-black">
      <header className="App-header flex flex-col justify-center items-center">
        <Image
          src={`${process.env.PUBLIC_URL ?? ""}/logo.svg`}
          className="App-logo py-7"
          alt="logo"
          width={300}
          height={100}
        />
        <Counter />
      </header>
    </div>
  );
};

export default Home;
