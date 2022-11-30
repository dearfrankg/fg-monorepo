import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Link from "next/link";

const demoMap = {
  ex1: "home",
  ex2: "greet",
  ex3: "counter",
  ex4: "tree",
};

const Menu = ({ example, setExample }) => {
  const router = useRouter();

  return (
    <ul style={{ listStyle: "none", display: "flex", gap: 20 }}>
      {[1, 2, 3, 4].map((num) => {
        const href = `/example${num}`;
        const match = router.pathname === href;

        return (
          <li key={num}>
            <Link legacyBehavior href={href}>
              <a style={{ color: match ? "red" : "blue" }}>{demoMap[`ex${num}`]}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu {...pageProps} />
      <Component {...pageProps} />
    </>
  );
}
