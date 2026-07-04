import React from "react";
import "./Pricing.css";

function Pricing() {
  return (
    <div className="pricing-container">

      <h1 className="heading">Pricing Plans</h1>

      <div className="pricing-grid">

        <div className="price-card">
          <h2>Free</h2>
          <h3>$0 / month</h3>

          <ul>
            <li>Basic Dashboard</li>
            <li>1 Project</li>
            <li>Email Support</li>
          </ul>

          <button className="btn">Start Free</button>
        </div>


        <div className="price-card popular">
          <h2>Pro</h2>
          <h3>$19 / month</h3>

          <ul>
            <li>Unlimited Projects</li>
            <li>Advanced Analytics</li>
            <li>Priority Support</li>
          </ul>

          <button className="btn">Get Pro</button>
        </div>


        <div className="price-card">
          <h2>Enterprise</h2>
          <h3>Custom Pricing</h3>

          <ul>
            <li>Unlimited Users</li>
            <li>Custom Integrations</li>
            <li>Dedicated Support</li>
          </ul>

          <button className="btn">Contact Sales</button>
        </div>

      </div>

    </div>
  );
}

export default Pricing;