const express = require("express");
const StartupPlan = require("../models/StartupPlan");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  try {
    const plans = await StartupPlan.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch plans" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, idea } = req.body;

    if (!title?.trim() || !idea?.trim()) {
      return res.status(400).json({
        success: false, message: "Title and idea are required"
      });
    }

    const plan = await StartupPlan.create({
      user: req.userId,
      title: title.trim(),
      idea: idea.trim(),
      industry: req.body.industry || "",
      targetMarket: req.body.targetMarket || "",
      businessPlan: req.body.businessPlan || "",
      marketAnalysis: req.body.marketAnalysis || "",
      revenueModel: req.body.revenueModel || "",
      growthStrategy: req.body.growthStrategy || ""
    });

    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create plan" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const plan = await StartupPlan.findOne({
      _id: req.params.id, user: req.userId
    });

    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({ success: true, plan });
  } catch {
    res.status(400).json({ success: false, message: "Invalid plan ID" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const allowed = [
      "title", "idea", "industry", "targetMarket",
      "businessPlan", "marketAnalysis", "revenueModel", "growthStrategy"
    ];
    const updates = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const plan = await StartupPlan.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({ success: true, plan });
  } catch {
    res.status(400).json({ success: false, message: "Could not update plan" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const plan = await StartupPlan.findOneAndDelete({
      _id: req.params.id, user: req.userId
    });

    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({ success: true, message: "Plan deleted" });
  } catch {
    res.status(400).json({ success: false, message: "Could not delete plan" });
  }
});

module.exports = router;
