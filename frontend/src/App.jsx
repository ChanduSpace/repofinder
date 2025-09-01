import { useState } from "react";
import { fetchRepos } from "./api";
import SearchForm from "./components/SearchForm";
import RepoCard from "./components/RepoCard";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 9;

  const handleSearch = async (newKeyword, newPage = 1) => {
    if (!newKeyword.trim()) return;
    setLoading(true);
    try {
      const data = await fetchRepos(newKeyword, newPage, perPage);
      setRepos(data.items);
      setKeyword(newKeyword);
      setPage(newPage);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <h1> RepoFinder</h1>
      </header>

      {/* Search + Results */}
      <main className="container">
        <SearchForm onSearch={handleSearch} />

        {loading && <p className="loading">🔍 Searching GitHub...</p>}

        <div className="repo-grid">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Pagination */}
        {!loading && repos.length > 0 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => handleSearch(keyword, page - 1)}
            >
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => handleSearch(keyword, page + 1)}
            >
              Next →
            </button>
          </div>
        )}

        {!loading && repos.length === 0 && (
          <p className="empty">✨ Start searching to discover GitHub repos!</p>
        )}
      </main>
    </div>
  );
}

export default App;
