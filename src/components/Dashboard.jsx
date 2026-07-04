import React from "react";

function Dashboard({ ideas }) {
  return (
    <section id="dashboard">
      <div className="stepper-header">
        <span className="eyebrow">User Control Center</span>
        <h2>Your Dashboard</h2>
      </div>
      
      <div className="dash-grid" style={{display: 'block'}}>
        <h3>Saved AI Concepts ({ideas.length})</h3>
        {ideas.length === 0 ? (
          <p style={{marginTop: '20px', color: 'var(--muted)'}}>No ideas generated yet, macha!</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="card" style={{marginTop: '15px'}}>
              <h4 style={{color: 'var(--accent)'}}>{idea.name}</h4>
              <p>{idea.tagline}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Dashboard;