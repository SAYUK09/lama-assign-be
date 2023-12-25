const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initializeDBConnection = require("./db/dbconnect");
const User = require("./model/user.model");
const Project = require("./model/project.model");
const Description = require("./model/description.model");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

initializeDBConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    console.log("enter", req.body);
    const { name, email } = req.body;
    const user = new User({
      name,
      email,
    });
    const result = await user.save();
    console.log(result, "result");
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/projects", async (req, res) => {
  try {
    const { name, userId } = req.body;
    const project = new Project({
      name,
      user: userId,
    });

    const result = await project.save();

    console.log(result, "result");
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const userId = req.query.userId;

    const projects = await Project.find({ user: userId }).populate({
      path: "descriptions",
      populate: {
        path: "project",
        select: "name",
      },
    });

    console.log(projects, "get projects");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/descriptions", async (req, res) => {
  try {
    const descriptionId = req.query.descriptionId;

    const description = await Description.findById(descriptionId);

    res.status(200).json({ description });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch("/descriptions", async (req, res) => {
  const descriptionId = req.query.descriptionId;
  console.log(req.body, "WTH");

  try {
    const updatedDescription = await Description.findByIdAndUpdate(
      descriptionId,
      { $set: { description: req.body.description } },
      { new: true }
    );

    if (!updatedDescription) {
      return res.status(404).json({ message: "Description not found" });
    }

    res.status(200).json({ description: updatedDescription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/descriptions", async (req, res) => {
  try {
    const { name, description, projectId, userId } = req.body;

    const newDescription = new Description({
      title: name,
      description,
      project: projectId,
      status: "Done",
    });

    const savedDescription = await newDescription.save();

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.descriptions.push(savedDescription._id);

    const updatedProject = await project.save();

    const projects = await Project.find({ user: userId }).populate(
      "descriptions"
    );

    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/descriptions", async (req, res) => {
  const descriptionId = req.query.descriptionId;

  try {
    const description = await Description.findById(descriptionId);
    if (!description) {
      return res.status(404).json({ message: "Description not found" });
    }

    await Project.updateOne(
      { descriptions: descriptionId },
      { $pull: { descriptions: descriptionId } }
    );

    await Description.findByIdAndDelete(descriptionId);

    res
      .status(200)
      .json({ message: "Description deleted successfully", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
