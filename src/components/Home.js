import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero-section">
        <h1 className="title">Build Your Next Startup 🚀</h1>

        <p className="subtitle">
          Launch ideas faster with our powerful platform designed for creators,
          developers, and entrepreneurs.
        </p>

        <div className="buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-box">
          <h2>10K+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-box">
          <h2>120+</h2>
          <p>Startups Launched</p>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <p>Customer Satisfaction</p>
        </div>
      </div>

    </div>
  );
}

export default Home;