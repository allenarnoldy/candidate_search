import { useEffect, useState } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

interface Candidate {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  location?: string;
  email?: string;
  company?: string;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const fetchNextCandidate = async () => {
    try {
      const userList = await searchGithub();
      if (userList.length) {
        const randomUser = userList[Math.floor(Math.random() * userList.length)];
        const detailedCandidate = await searchGithubUser(randomUser.login);
        setCandidate(detailedCandidate);
      } else {
        setCandidate(null);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setCandidate(null);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      setSavedCandidates((prev) => [...prev, candidate]);
      localStorage.setItem("savedCandidates", JSON.stringify([...savedCandidates, candidate]));
      fetchNextCandidate();
    }
  };

  const rejectCandidate = () => {
    fetchNextCandidate();
  };

  useEffect(() => {
    fetchNextCandidate();
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  if (!candidate) return <p>No more candidates to display.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <div className="profile-container" style={{ display: "flex", alignContent: "center" }}>
          <img
            src={candidate.avatar_url}
            alt={`${candidate.login}'s avatar`}
            width="150"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
        </div>
          <a
            href={candidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              textDecoration: "none",
              
            }}
          >
            {candidate.login}
          </a>
        <p>Name: {candidate.name || "Not available"}</p>
        <p>Location: {candidate.location || "Not available"}</p>
        <p>Email: {candidate.email || "Not available"}</p>
        <p>Company: {candidate.company || "Not available"}</p>
      </div>
      <button onClick={rejectCandidate} className='button3'>-</button>
      <button onClick={saveCandidate} className='button2'>+</button>
    </div>
  );
};

export default CandidateSearch;
