import { useEffect, useState } from "react";

interface Candidate {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  location?: string;
  email?: string;
  company?: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  if (!savedCandidates.length) return <p>No saved candidates.</p>;

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>GitHub Profile</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.login}>
              <td>
                <img
                  src={candidate.avatar_url}
                  alt={`${candidate.login}'s avatar`}
                  width="50"
                />
              </td>
              <td>{candidate.name || "Not available"}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || "Not available"}</td>
              <td>{candidate.email || "Not available"}</td>
              <td>{candidate.company || "Not available"}</td>
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
