import { Input, Button, Form } from "antd";

const SearchForm = ({ onSearch }) => {
  const onFinish = (values) => {
    onSearch(values.keyword);
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item
        name="keyword"
        rules={[{ required: true, message: "Please enter a keyword" }]}
      >
        <Input placeholder="Enter keyword" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
