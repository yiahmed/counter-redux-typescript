import { AppProps } from "next/app";
import Layout from "../components/layout";
import "css/globals.css";
import { Provider } from "react-redux";
import { store } from "@/components/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
