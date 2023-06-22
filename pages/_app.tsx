import React, { useState, useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
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
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </Provider>
  );
};

export default MyApp;
