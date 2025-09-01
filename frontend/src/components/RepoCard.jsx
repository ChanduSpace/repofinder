import "./RepoCard.css";

function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.full_name}
        </a>
      </h3>
      <p>{repo.description || "No description available."}</p>
      <div className="repo-stats">
        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      </div>
    </div>
  );
}

export default RepoCard;
