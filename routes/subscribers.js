const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

const getSubsciber = require("../middleware/middleware");

// GET
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by id
router.get("/:id", getSubsciber, (req, res) => {
  res.send(res.subscriber);
});

// POST
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH
router.patch("/:id", getSubsciber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", getSubsciber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: `Deleted Subscriber ${res.subscriber.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
