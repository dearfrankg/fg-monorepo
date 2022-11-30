import { Tree as AntTree } from "antd";
import React from "react";

const { DirectoryTree, TreeNode } = AntTree;

const treeData = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "0-0", key: "0-0-0" },
      { title: "0-1", key: "0-0-1" },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "1-0", key: "0-1-0" },
      { title: "1-1", key: "0-1-1" },
    ],
  },
];

const Center = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
    {children}
  </div>
);

const Tree = () => {
  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const treeProps = {
    multiple: false,
    defaultExpandAll: false,
    onSelect: onSelect,
    onExpand: onExpand,
    treeData,
  };

  return (
    <Center>
      <main>
        <h1>Tree Component</h1>

        <DirectoryTree {...treeProps} />
      </main>
    </Center>
  );
};

export default Tree;
