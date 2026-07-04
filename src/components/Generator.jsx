import React, { useState } from 'react';

const Generator = ({ onSave }) => {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('HealthTech');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const industries = ['HealthTech', 'EdTech', 'FinTech', 'AgriTech', 'RetailTech', 'CleanTech'];

  const handleGenerate = () => {
    setLoading(true);
    setStep(4);
    // Mocking AI Delay
    setTimeout(() => {
      const demoResult = {
        name: industry + " AI Pro",
        tagline: "The future of " + industry,
        description: "A revolutionary platform using AI to solve core " + industry + " problems.",
        scores: { market: 85, feasibility: 78, uniqueness: 92 }
      };
      setResult(demoResult);
      setLoading(false);
    }, 3000);
  };

  return (
    <section id="generator">
      <div className="step-progress">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className={`step-circle ${step >= n ? 'active' : ''}`}>{n}</div>
        ))}
      </div>

      {step === 1 && (
        <div className="step-content active">
          <h3>Select Industry</h3>
          <div className="industry-grid">
            {industries.map(ind => (
              <div key={ind} className={`ind-tile ${industry === ind ? 'sel' : ''}`} onClick={() => setIndustry(ind)}>
                {ind}
              </div>
            ))}
          </div>
          <button className="btn-step-next" onClick={() => setStep(2)}>Next Step →</button>
        </div>
      )}

      {step === 4 && (
        <div className="step-content active">
          {loading ? (
            <div className="gen-loading">Generating...</div>
          ) : (
            result && (
              <div className="idea-result-wrap">
                <h2>{result.name}</h2>
                <p>{result.description}</p>
                <button className="btn-action primary" onClick={() => onSave(result)}>Save to Dashboard</button>
                <button className="btn-action secondary" onClick={() => setStep(1)}>Reset</button>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Generator;