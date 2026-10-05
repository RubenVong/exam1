const express = require("express");
const router = express.Router();
const Course = require("../model/courseModel");

// Endpoint: GET all orders
router.get("/", async function (req, res) {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: GET specific order
router.get("/:id", async function (req, res) {
  try {
    const courses = await Course.findById(req.params.id);
    if (!courses) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: POST new order
router.post("/", async function (req, res) {
  try {
    const { courseNo } = req.body;
    if (!courseNo) {
      return res.status(400).json({ success: false, error: 'Field "courseNo" is required.' });
    }

    const insertId = await Course.create(req.body);
    const newCourse = await Course.findById(insertId);

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
