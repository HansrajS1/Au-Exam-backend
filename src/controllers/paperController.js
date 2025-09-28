const Paper = require("../models/paper");
const { uploadFile } = require("../config/cloudinary");
const path = require("path");

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

const sanitize = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => allowedKeys.includes(key)));

const toSnakeCase = (raw) => ({
  college: raw.college,
  course: raw.course,
  semester: raw.semester,
  subject: raw.subject,
  description: raw.description,
  file_url: raw.fileUrl,
  preview_image_url: raw.previewImageUrl,
  user_email: raw.userEmail
});

const toCamelCase = (row) => ({
  id: row.id,
  college: row.college,
  course: row.course,
  semester: row.semester,
  subject: row.subject,
  description: row.description,
  fileUrl: row.file_url,
  previewImageUrl: row.preview_image_url,
  userEmail: row.user_email
});

const getAll = async (req, res) => {
  try {
    const papers = await Paper.getAllPapers();
    res.json(papers.map(toCamelCase));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const paper = await Paper.getPaperById(req.params.id);
    paper ? res.json(toCamelCase(paper)) : res.status(404).send("Paper not found");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const results = await Paper.searchBySubject(req.query.subject);
    res.json(results.map(toCamelCase));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadPaper = async (req, res) => {
  try {
    if (!req.files?.file?.[0] || !req.files?.preview?.[0]) {
      return res.status(400).json({ error: "Missing file or preview upload" });
    }

    let raw;
    try {
      raw = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: "Invalid JSON in data field" });
    }

    delete raw.id;

    raw.fileUrl = await uploadFile(req.files.file[0], "papers");
    raw.previewImageUrl = await uploadFile(req.files.preview[0], "preview");
    raw.userEmail = raw.userEmail || req.user?.email || "unknown@user.com";

    const snakeRaw = toSnakeCase(raw);
    const dto = sanitize(snakeRaw);

    const [saved] = await Paper.insertPaper(dto);
    res.status(201).json(toCamelCase(saved));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePaper = async (req, res) => {
  try {
    let raw;
    try {
      raw = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: "Invalid JSON in data field" });
    }

    const id = req.params.id;

    if (req.files?.file?.[0]) {
      raw.fileUrl = await uploadFile(req.files.file[0], "papers");
    }

    if (req.files?.preview?.[0]) {
      raw.previewImageUrl = await uploadFile(req.files.preview[0], "preview");
    }

    raw.userEmail = raw.userEmail || req.user?.email || "unknown@user.com";

    const snakeRaw = toSnakeCase(raw);
    const dto = sanitize(snakeRaw);

    const [updated] = await Paper.updatePaper(id, dto);
    updated ? res.json(toCamelCase(updated)) : res.status(404).send("Paper not found");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePaper = async (req, res) => {
  try {
    const deleted = await Paper.deletePaper(req.params.id);
    deleted ? res.send("Paper deleted") : res.status(404).send("Paper not found");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  search,
  uploadPaper,
  updatePaper,
  deletePaper
};
