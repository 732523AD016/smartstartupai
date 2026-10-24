const mongoose = require("mongoose");

const startupPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  title: { type: String, required: true, trim: true },
  idea: { type: String, required: true, trim: true },
  industry: { type: String, default: "" },
  targetMarket: { type: String, default: "" },
  businessPlan: { type: String, default: "" },
  marketAnalysis: { type: String, default: "" },
  revenueModel: { type: String, default: "" },
  growthStrategy: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("StartupPlan", startupPlanSchema);
