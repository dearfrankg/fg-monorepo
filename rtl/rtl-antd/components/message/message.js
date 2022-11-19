import { message, Space, Button } from "antd";

const DemoMessage = () => {
  const handleChange = (a, b) => {
    message.success("We have liftoff!");
  };

  return (
    <main style={{ margin: "50px auto", width: "50%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <h1>Demo: Message</h1>

        <Button size="large" type="primary" onClick={handleChange}>
          Message me
        </Button>
      </Space>
    </main>
  );
};

export default DemoMessage;
