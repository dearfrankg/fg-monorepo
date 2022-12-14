import Head from "next/head";
import Link from "next/link";

const styles = {
  main: { width: "50%", margin: "50px auto" },
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>testing antd with rtl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        <h1>Testing AntD with RTL</h1>

        <ul>
          {["select", "message", "msw"].map((component, i) => (
            <li key={i}>
              <Link href={`${component}`}>{component}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
