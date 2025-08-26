import { useState, useEffect } from "react";
import { Layout, Typography, message } from "antd";
import SearchForm from "./components/SearchForm";
import RepoTable from "./components/RepoTable";
import { searchRepos, getRepos } from "./api";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [repos, setRepos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const fetchRepos = async (pageNo = 1, pageSize = perPage) => {
    try {
      const res = await getRepos(pageNo, pageSize);
      setRepos(res.data.data);
      setTotal(res.data.total);
      setPage(res.data.page);
      setPerPage(res.data.perPage);
    } catch {
      message.error("Failed to fetch repos");
    }
  };

  const handleSearch = async (keyword) => {
    try {
      await searchRepos(keyword, 1, perPage);
      fetchRepos(1, perPage);
    } catch {
      message.error("Search failed");
    }
  };

  const handlePageChange = (newPage, newPageSize) => {
    fetchRepos(newPage, newPageSize);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "10px" }}>
        <Title level={3}>GitHub Repo Search</Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <SearchForm onSearch={handleSearch} />
        <RepoTable
          repos={repos}
          total={total}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      </Content>
    </Layout>
  );
}

export default App;
