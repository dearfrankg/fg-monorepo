import "antd/dist/antd.css";
import "../globals.css";
import { MDXProvider } from "@mdx-js/react";
import { Typography } from "antd";
import Highlight, { defaultProps } from "prism-react-renderer";

const code = ({ children, className }) => {
  const language = className.replace(/language-/, "");
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
const { Text } = Typography;

const Code = ({ children }) => <Text code>{children}</Text>;

const components = {
  Text,
  Code,
  code, // code inside ```js NOT <code>
};

export default function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
