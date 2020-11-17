import React, { useState, useEffect } from "react";
import "./index.css";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.netlify.app/api/react-tabs-project";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h5>Wait while we fetch your experience for you..</h5>;
      </section>
    );
  }
  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h3>Experience page</h3>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((item, index) => {
            const { company, id } = item;
            return (
              <button
                key={id}
                onClick={() => {
                  setValue(index);
                }}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((item, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{item}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}
