import React from "react";
import Image from "next/image";
import { Counter } from "@/components/shared/features/counter/Counter";

const Index = () => {
  return (
    <div className="App text-black">
      <header className="App-header flex flex-col justify-center items-center">
        <div className="animate-float">
          <Image
            src={`${process.env.PUBLIC_URL ?? ""}/logo.svg`}
            className="App-logo py-7"
            alt="logo"
            width={300}
            height={100}
          />
        </div>
        <Counter />
      </header>
    </div>
  );
};

export default Index;
//test
