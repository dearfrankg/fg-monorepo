import React, { useState, useReducer } from "react";
import { service } from "./service";
import { Button as AntButton, Space } from "antd";

const resources = {
  components: {
    CenterAndSpace: ({ children }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "center",
        }}
      >
        <Space direction="vertical" size="large">
          {children}
        </Space>
      </div>
    ),

    Button: ({ clickHandler, buttonClicked, title, isMissingUrl }) => {
      const buttonText = buttonClicked ? "Ok" : title;

      return (
        <AntButton onClick={clickHandler} disabled={buttonClicked || isMissingUrl}>
          {buttonText}
        </AntButton>
      );
    },

    Greeting: ({ show, greeting }) => {
      if (!show) return null;

      return <h1>{greeting}</h1>;
    },

    Error: ({ show, isMissingUrl }) => {
      if (!show) return null;

      const errorMessage = isMissingUrl ? "Missing url prop" : "Oops, failed to get greeting ";

      return <p role="alert">{errorMessage}</p>;
    },
  },

  fetchGreeting: async ({ use, url, dispatch, setButtonClicked }) => {
    const method = use === "axios" ? "getWithAxios" : "getWithFetch";

    service[method]({
      url,
      success: ({ data: { greeting } }) => {
        dispatch({ type: "SUCCESS", greeting });
        setButtonClicked(true);
      },
      failure: (error) => {
        dispatch({ type: "ERROR", error });
      },
    });
  },

  greetingReducer: (state, action) => {
    switch (action.type) {
      case "SUCCESS": {
        return {
          error: null,
          greeting: action.greeting,
        };
      }
      case "ERROR": {
        return {
          error: action.error,
          greeting: null,
        };
      }
      default: {
        return state;
      }
    }
  },

  getHandle: ({ url, dispatch, setButtonClicked }) => ({
    fetchGreetingWithAxios: () => fetchGreeting({ use: "axios", url, dispatch, setButtonClicked }),

    fetchGreetingWithFetch: () => fetchGreeting({ use: "fetch", url, dispatch, setButtonClicked }),
  }),

  initialState: {
    error: null,
    greeting: null,
  },
};

const { fetchGreeting, getHandle } = resources;
const { CenterAndSpace, Button, Greeting, Error } = resources.components;

export default function Greet({ url = "/greeting" }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [{ error, greeting }, dispatch] = useReducer(
    resources.greetingReducer,
    resources.initialState
  );

  const handle = getHandle({ url, dispatch, setButtonClicked });

  const isMissingUrl = !url;

  const button1Props = {
    clickHandler: handle.fetchGreetingWithAxios,
    buttonClicked,
    isMissingUrl,
    title: "Load greeting with axios",
  };

  const button2Props = {
    ...button1Props,
    clickHandler: handle.fetchGreetingWithFetch,
    title: "Load greeting with fetch",
  };

  return (
    <main>
      <CenterAndSpace>
        <h1>Greet Component</h1>
        <Button {...button1Props} />
        <Button {...button2Props} />
        <Greeting {...{ show: greeting, greeting }} />
        <Error {...{ show: error || isMissingUrl, isMissingUrl }} />
      </CenterAndSpace>
    </main>
  );
}
