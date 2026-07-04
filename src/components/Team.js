import React from "react";
import "./Team.css";

function Team() {
  return (
    <div className="team-container">

      <h1 className="heading">Meet Our Team</h1>

      <div className="team-grid">

        <div className="team-card">
          <img src="https://i.pravatar.cc/200?img=1" alt="team" />
          <h2>Alex Chen</h2>
          <p>CEO & Founder</p>
        </div>

        <div className="team-card">
          <img src="https://i.pravatar.cc/200?img=2" alt="team" />
          <h2>Riya Sharma</h2>
          <p>CTO</p>
        </div>

        <div className="team-card">
          <img src="https://i.pravatar.cc/200?img=3" alt="team" />
          <h2>Sam Wilson</h2>
          <p>Lead Developer</p>
        </div>

        <div className="team-card">
          <img src="https://i.pravatar.cc/200?img=4" alt="team" />
          <h2>Emma Lee</h2>
          <p>Product Designer</p>
        </div>

      </div>

    </div>
  );
}

export default Team;