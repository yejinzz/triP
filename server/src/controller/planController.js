const Plan = require("../models/planModel");

exports.getAllPlan = async (req, res) => {
  // const userId = new ObjectId(req.params.id);
  try {
    // .exec() 를 뒤에 붙여줘야 실제로 데이터베이스에 요청이 됩니다.
    const planList = await Plan.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    // console.log(planList);
    res.status(200).json(planList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlan = async (req, res) => {
  console.log(req.params.planId);
  try {
    // .exec() 를 뒤에 붙여줘야 실제로 데이터베이스에 요청이 됩니다.
    const planList = await Plan.findOne({ _id: req.params.planId }).exec();
    console.log(planList);
    res.status(200).json(planList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPlan = async (req, res) => {
  const { startDate, endDate, destination, schedules } = req.body;

  const plan = new Plan({
    userId: req.user._id,
    startDate,
    endDate,
    destination,
    schedules,
  });

  try {
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.patchPlan = async (req, res) => {
  const planId = req.params.planId;
  try {
    await Plan.updateOne({ _id: planId }, { $set: req.body });
    const findPlan = await Plan.findOne({
      _id: planId,
    }).exec();
    console.log(findPlan);
    return res.status(200).json(findPlan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  const planId = req.params.planId;
  try {
    await Plan.deleteOne({ _id: planId });
    res.status(201).send("삭제됨");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
