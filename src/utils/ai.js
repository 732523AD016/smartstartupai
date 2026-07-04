const CLAUDE_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';
 
/**
 * Call Claude API
 * @param {string} prompt
 * @param {number} maxTokens
 * @returns {Promise<string>}
 */
export const callClaude = async (prompt, maxTokens = 1200) => {
  const res = await fetch(CLAUDE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error('API call failed');
  const data = await res.json();
  return data.content[0].text;
};
 
/**
 * Parse key: value lines from AI response
 */
export const parseKeyValue = (text, key) => {
  const match = text.match(new RegExp(key + ':\\s*([^\\n]+)'));
  return match ? match[1].trim() : '';
};
 
/**
 * Generate startup idea prompt
 */
export const buildIdeaPrompt = (industry, audience, features) => `
Generate a creative, specific AI startup idea for the ${industry} industry.
Target audience: ${audience}
AI features to use: ${features}
 
Reply ONLY in this exact format (no extra text):
NAME: [startup name]
TAGLINE: [one punchy line]
DESCRIPTION: [2-3 sentences about the product]
PROBLEM: [1-2 sentences about the core problem]
SOLUTION: [2-3 sentences about the AI-powered solution]
REVENUE: [how it makes money]
MARKET: [TAM estimate with number]
GROWTH: [growth strategy in 1-2 sentences]
SCORE_MARKET: [number 0-100]
SCORE_FEASIBILITY: [number 0-100]
SCORE_UNIQUENESS: [number 0-100]
TAGS: #tag1 #tag2 #tag3 #tag4
 
Be creative and specific. Avoid generic ideas. Focus on real underserved markets.
`.trim();
 
/**
 * Generate business plan prompt
 */
export const buildBizPlanPrompt = (idea) => `
Create a detailed business plan for "${idea.name}" — ${idea.tagline}.
Industry: ${idea.industry}
Problem: ${idea.problem}
Solution: ${idea.solution}
 
Reply ONLY in valid JSON format (no markdown, no backticks):
{
  "problem": "detailed problem analysis with stats",
  "solution": "detailed solution with technical approach",
  "market": "market analysis with TAM SAM SOM breakdown",
  "competitors": "competitive landscape and our differentiation",
  "revenue": "detailed revenue model with pricing tiers",
  "growth": "phase-by-phase growth strategy"
}
`.trim();
 
/**
 * Demo fallback ideas by industry
 */
export const getDemoIdea = (industry, audience) => {
  const demos = {
    HealthTech: {
      name: 'VernacularMD',
      tagline: 'AI doctor in your native language',
      description: 'Hyperlocal AI healthcare assistant enabling rural patients to describe symptoms and get preliminary diagnosis in 22 Indian languages via voice.',
      problem: 'Rural patients cannot communicate medical symptoms in English, causing delayed and incorrect diagnoses.',
      solution: 'Voice-powered AI diagnostic tool supporting local languages with intelligent triage, specialist referrals, and follow-up tracking.',
      revenue: '₹99/consultation fee + hospital API licensing + insurance partnerships',
      market: '$4.2B rural healthcare TAM India',
      growth: 'Partner with ASHA workers as distribution. State health dept MoUs for scale.',
      scores: { market: 85, feasibility: 78, uniqueness: 91 },
      tags: ['#HealthTech', '#NLP', '#Rural', '#India'],
    },
    EdTech: {
      name: 'SkillBridge AI',
      tagline: 'Career coach for first-gen graduates',
      description: 'Personalized AI career intelligence platform bridging the gap between first-generation college graduates and professional employment.',
      problem: 'First-gen graduates lack professional networks and career guidance, reducing employment outcomes by 40%.',
      solution: 'AI mentor providing personalized career paths, resume review, mock interviews, and job matching using behavioral analysis.',
      revenue: 'Freemium $9/mo + placement success fee + B2B employer partnerships',
      market: '$6B career coaching market globally',
      growth: 'Partner with tier-2 engineering colleges and government skilling programs.',
      scores: { market: 80, feasibility: 82, uniqueness: 76 },
      tags: ['#EdTech', '#CareerTech', '#AI', '#India'],
    },
    FinTech: {
      name: 'CreditDNA',
      tagline: 'Alternative credit scoring using AI',
      description: 'AI-powered credit underwriting platform that assesses creditworthiness using alternative data for the 400M unbanked Indians.',
      problem: '400M Indians lack formal credit history, excluding them from financial products.',
      solution: 'ML models analyzing utility payments, mobile usage, and behavioral data to create credit scores without traditional history.',
      revenue: 'Per-assessment fee ₹50 + SaaS licensing to NBFCs and banks',
      market: '$28B digital lending market India',
      growth: 'NBFC partnerships for immediate distribution. RBI sandbox participation.',
      scores: { market: 92, feasibility: 72, uniqueness: 84 },
      tags: ['#FinTech', '#CreditTech', '#ML', '#India'],
    },
    AgriTech: {
      name: 'AgriSense',
      tagline: 'Crop disease detection via smartphone',
      description: 'Computer vision AI that detects 50+ crop diseases from smartphone photos and recommends treatment in local language within seconds.',
      problem: 'Farmers lose 25% of crops annually due to late or incorrect disease detection and treatment.',
      solution: 'Mobile CV model trained on 2M crop images. Offline-capable with WhatsApp integration for rural connectivity.',
      revenue: 'Freemium + insurance partnerships + agri-input company advertising',
      market: '$8.3B precision farming TAM India',
      growth: 'Krishi Vigyan Kendra partnerships + state agriculture department MoUs.',
      scores: { market: 78, feasibility: 85, uniqueness: 80 },
      tags: ['#AgriTech', '#CV', '#Farmers', '#B2C'],
    },
  };
 
  return {
    ...(demos[industry] || demos.HealthTech),
    industry,
    audience,
  };
};