import { useState } from "react";
import { Select, Space } from "antd";

const options = [
  { label: "🐱", value: "cat" },
  { label: "🐶", value: "dog" },
];

const DemoSelect = () => {
  const [selection, setSelection] = useState([]);

  const handleChange = (a, b) => {
    // console.log("a, b: ", a, b);
    setSelection(b.map((o) => o.label));
  };

  return (
    <main style={{ margin: "50px auto", width: "50%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <h1>Demo: Select</h1>

        <Select
          data-testid="myselect"
          options={options}
          mode="multiple"
          allowClear
          style={{
            width: "90%",
          }}
          placeholder="Choose primary pet"
          size="large"
          onChange={handleChange}
        />

        <h2 data-testid="selection">Selection: {JSON.stringify(selection)}</h2>
      </Space>
    </main>
  );
};

export default DemoSelect;
