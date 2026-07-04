import React from "react";

const StartupSection = () => {
  return (
    <section className="startup-section">

      <div className="startup-box">

        <h2>Ready to Build Your Next Big Startup?</h2>

        <p>
          Join thousands of creators using our platform to launch ideas.
        </p>

        <button className="explore-btn">
          Explore Platform
        </button>

        {/* Pricing */}

        <div className="pricing-box">

          <h3>Pricing Plans</h3>

          <p>Free Plan - $0/month</p>
          <p>Pro Plan - $19/month</p>
          <p>Enterprise - Contact us</p>

        </div>

        {/* Team */}

        <div className="team-box">

          <h3>Meet the Team</h3>

          <p>Alex - CEO</p>
          <p>Riya - CTO</p>
          <p>Sam - Developer</p>

        </div>

      </div>

    </section>
  );
};

export default StartupSection;