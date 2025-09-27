const Paper = require("../models/paper");
const { uploadFile } = require("../config/cloudinary");

const allowedKeys = [
  "college",
  "course",
  "description",
  "file_url",
  "preview_image_url",
  "semester",
  "subject",
  "user_email"
];

const sanitize = obj =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => allowedKeys.includes(key)));

const getAll = async (req, res) => {
  try {
    const papers = await Paper.getAllPapers();
    res.json(papers);
  } catch (err) {
    console.error("getAll error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const paper = await Paper.getPaperById(req.params.id);
    paper ? res.json(paper) : res.status(404).send("Paper not found");
  } catch (err) {
    console.error("getById error:", err);
    res.status(500).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const results = await Paper.searchBySubject(req.query.subject);
    res.json(results);
  } catch (err) {
    console.error("search error:", err);
    res.status(500).json({ error: err.message });
  }
};

const uploadPaper = async (req, res) => {
  try {
    if (!req.files?.file?.[0] || !req.files?.preview?.[0]) {
      return res.status(400).json({ error: "Missing file or preview upload" });
    }

    const raw = JSON.parse(req.body.data);
    delete raw.id; // prevent duplicate key error

    raw.file_url = await uploadFile(req.files.file[0], "papers");
    raw.preview_image_url = await uploadFile(req.files.preview[0], "preview");

    const dto = sanitize(raw);
    const [saved] = await Paper.insertPaper(dto);
    res.status(201).json(saved);
  } catch (err) {
    console.error("uploadPaper error:", err);
    res.status(500).json({ error: err.message });
  }
};

const updatePaper = async (req, res) => {
  try {
    const id = req.params.id;
    const raw = JSON.parse(req.body.data);

    if (req.files?.file?.[0]) {
      raw.file_url = await uploadFile(req.files.file[0], "papers");
    }

    if (req.files?.preview?.[0]) {
      raw.preview_image_url = await uploadFile(req.files.preview[0], "preview");
    }

    const dto = sanitize(raw);
    const [updated] = await Paper.updatePaper(id, dto);
    updated ? res.json(updated) : res.status(404).send("Paper not found");
  } catch (err) {
    console.error("updatePaper error:", err);
    res.status(500).json({ error: err.message });
  }
};

const deletePaper = async (req, res) => {
  try {
    const deleted = await Paper.deletePaper(req.params.id);
    deleted
      ? res.send("Paper deleted")
      : res.status(404).send("Paper not found");
  } catch (err) {
    console.error("deletePaper error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  search,
  uploadPaper,
  updatePaper,
  deletePaper,
};
