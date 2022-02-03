import React, { useEffect, useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
}

const getJobs = async () => {
  try {
    let response = await fetch(`http://localhost:3000`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    getJobs().then((newJobs: any) => {
      console.log(newJobs);
      setJobs(newJobs.result);
    });
  }, []);

  return (
    <div>
      {jobs.map((job) => {
        return (
          <div>
            <h2>{job.title}</h2>;<small>{job.company}</small>;
            <small>{job.location}</small>;<a href={job.link}> join company! </a>
            ;
          </div>
        );
      })}
    </div>
  );
}

export default App;
