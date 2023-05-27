import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Layout from "../components/layout";
import "css/globals.css";
import { Provider } from "react-redux";
import { store } from "@/components/store";
import axios from "axios";
import { useAppSelector } from "@/components/hooks";



const MyApp = ({ Component, pageProps }: AppProps) => {
 

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
