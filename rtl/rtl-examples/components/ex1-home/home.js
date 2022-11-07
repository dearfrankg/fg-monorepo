import Head from "next/head";
import { Typography } from "antd";

const { Text } = Typography;

const Center = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export default function Home() {
  return (
    <Center>
      <Head>
        <title>tlr examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>React Testing Library Examples</h1>

        <Text code>cd app_dir; yarn test</Text>
      </main>
    </Center>
  );
}
