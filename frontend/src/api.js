export async function fetchRepos(keyword, page = 1, perPage = 9) {
  const res = await fetch(
    `http://localhost:5000/api/repos?q=${keyword}&page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}
