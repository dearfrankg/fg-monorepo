import { useState, useEffect } from "react";
import { message, Alert, Space, Button } from "antd";
import { getFolders, createFolder } from "./services/services";

const resources = {
  sideEffects: {
    useGetData: (set) => {
      useEffect(() => {
        utils.getData(set);
      }, []);
    },
  },

  handle: {
    createFolder: () => utils.createFolder(),
  },

  utils: {
    getData: async (set) => {
      await getFolders()
        .then(({ data }) => {
          set({ folders: data });
        })
        .catch((error) => {
          set({ error: "could not contact api" });
        });
    },

    createFolder: async (set) => {
      return await createFolder()
        .then(({ data }) => {
          message.success(data);
          utils.getData(set);
        })
        .catch((error) => {
          message.error("Oops something went wrong");
        });
    },
  },

  initialState: {
    folders: null,
    error: "",
  },
};

const { sideEffects, handle, utils, initialState } = resources;

const DemoMsw = () => {
  const [state, setState] = useState(initialState);
  const { folders, error } = state;
  const set = (newState) => setState((_state) => ({ ..._state, ...newState }));

  sideEffects.useGetData(set);

  const handle = {
    createFolder: () => {
      utils.createFolder(set);
    },
  };

  const show = {
    error: !!error,
    loading: !error && folders === null,
    folders: !!folders,
  };

  return (
    <main style={{ margin: "50px auto", width: "50%" }}>
      <h1>Demo: msw (mock service worker)</h1>
      <p>Because we do not have a real api this will ony work while testing.</p>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {show.error && (
          <Alert type="error" message={error} showIcon>
            {error}
          </Alert>
        )}

        {show.loading && <div>Loading...</div>}

        <button size="large" type="primary" onClick={handle.createFolder}>
          Create &rdquo;d&rdquo; folder
        </button>

        {show.folders && <div data-testid="folder-list">{folders.map((f) => f).join(",")}</div>}
      </Space>
    </main>
  );
};

export default DemoMsw;
