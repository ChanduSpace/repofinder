function RepoTable({ repos }) {
  if (!repos || repos.length === 0) {
    return <p>No repositories found.</p>;
  }

  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <div key={repo.id} className="repo-item">
          <h3>{repo.full_name}</h3>
          <p>⭐ {repo.stargazers_count}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View Repo
          </a>
        </div>
      ))}
    </div>
  );
}

export default RepoTable;
