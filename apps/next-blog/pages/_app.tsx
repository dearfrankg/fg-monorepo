import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "tailwindcss/tailwind.css";
import { MdxComponentsProvider } from "../context/mdxContext";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MdxComponentsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MdxComponentsProvider>
  );
}

export default MyApp;
