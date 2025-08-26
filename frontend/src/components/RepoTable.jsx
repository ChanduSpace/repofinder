import { Table } from "antd";

const RepoTable = ({ repos, total, page, perPage, onPageChange }) => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Link",
      dataIndex: "html_url",
      key: "html_url",
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Stars", dataIndex: "stars", key: "stars" },
  ];

  return (
    <Table
      dataSource={repos}
      columns={columns}
      rowKey="_id"
      pagination={{
        current: page,
        pageSize: perPage,
        total: total,
        showSizeChanger: true,
        onChange: (newPage, newPageSize) => {
          onPageChange(newPage, newPageSize);
        },
      }}
    />
  );
};

export default RepoTable;
