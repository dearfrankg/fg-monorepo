import { useState } from "react";
import { Select, Space } from "antd";

const options = [
  { label: "😼", value: "cat" },
  { label: "🐶", value: "dog" },
];

const DemoSelect = () => {
  const [selection, setSelection] = useState([]);

  return (
    <main style={{ margin: "50px auto", width: "50%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <h1>Demo: Select</h1>

        <Select
          options={options}
          mode="multiple"
          allowClear
          style={{
            width: "90%",
          }}
          placeholder="Choose primary pet"
          size="large"
          onChange={setSelection}
        />

        <h2 data-testid="selection">Selection: {JSON.stringify(selection)}</h2>
      </Space>
    </main>
  );
};

export default DemoSelect;
