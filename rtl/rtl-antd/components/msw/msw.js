import { useState, useEffect } from "react";
import { message, Alert, Space, Button } from "antd";
import { getFolders, createFolder } from "./services/services";

const resources = {
  utils: {
    getData: async (set) => {
      await getFolders()
        .then((res) => {
          const { data } = res;
          set({ folders: data });
        })
        .catch((error) => {
          set({ error: "Oops, could not get folders" });
        });
    },

    createFolder: async (set) => {
      await createFolder()
        .then(({ data }) => {
          message.success(data);
          utils.getData(set);
        })
        .catch((error) => {
          set({ error: "Oops, could not create folder" });
        });
    },
  },

  components: {
    Main: ({ children }) => <main style={{ margin: "50px auto", width: "50%" }}>{children}</main>,

    Header: () => (
      <header>
        <h1>Demo: msw (mock service worker)</h1>
        <p>Because we do not have a real api this will ony work while testing.</p>
      </header>
    ),

    VerticalSpacing: ({ children, show }) => (
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {!show.error && children}
      </Space>
    ),

    ErrorMessage: ({ show, state }) => {
      if (!show.error) {
        return null;
      }

      return <Alert type="error" message={state.error} showIcon />;
    },

    LoadingMessage: ({ show }) => {
      if (!show.loading) {
        return null;
      }

      return <div>Loading...</div>;
    },

    CreateFolderButton: ({ handle }) => (
      <Button size="large" type="primary" onClick={handle.createFolder}>
        Create &rdquo;d&rdquo; folder
      </Button>
    ),

    FolderList: ({ show, state }) => {
      if (!show.folders) {
        return null;
      }

      return <div data-testid="folder-list">{state.folders.map((f) => f).join(",")}</div>;
    },
  },

  getHandle: (set) => ({
    createFolder: () => utils.createFolder(set),
  }),

  sideEffects: {
    useGetData: (set) => {
      useEffect(() => {
        utils.getData(set);
      }, []);
    },
  },

  initialState: {
    folders: null,
    error: "",
  },
};

const { sideEffects, getHandle, utils, initialState } = resources;
const {
  Main,
  Header,
  VerticalSpacing,
  ErrorMessage,
  LoadingMessage,
  CreateFolderButton,
  FolderList,
} = resources.components;

const DemoMsw = () => {
  const [state, setState] = useState(initialState);
  const set = (newState) => setState((_state) => ({ ..._state, ...newState }));

  sideEffects.useGetData(set);

  const handle = getHandle(set);

  const show = {
    error: !!state.error,
    loading: !state.error && state.folders === null,
    folders: !!state.folders,
  };

  return (
    <Main>
      <Header />

      <ErrorMessage {...{ show, state }} />

      <VerticalSpacing {...{ show }}>
        <LoadingMessage {...{ show }} />

        <CreateFolderButton {...{ handle }} />

        <FolderList {...{ show, state }} />
      </VerticalSpacing>
    </Main>
  );
};

export default DemoMsw;
