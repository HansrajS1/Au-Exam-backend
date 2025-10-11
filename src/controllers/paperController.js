import * as Paper from '../models/paper.js';
import { uploadFile } from '../config/cloudinary.js';
import { toCamelCase, toSnakeCase, allowedPaperKeys } from '../utils/dtoMapper.js';

const sanitize = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedPaperKeys.includes(key))
  );

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const offset = (page - 1) * limit;

    const papers = await Paper.getAllPapers(limit, offset);
    const count = await Paper.countAllPapers();

    res.json({
      papers: papers.map(toCamelCase),
      total: count.total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const paper = await Paper.getPaperById(req.params.id);
    paper
      ? res.json(toCamelCase(paper))
      : res.status(404).send('Paper not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const search = async (req, res) => {
  try {
    const subject = req.query.subject || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const offset = (page - 1) * limit;

    const results = await Paper.searchBySubject(subject, limit, offset);
    const count = await Paper.countSearchResults(subject);

    res.json({
      papers: results.map(toCamelCase),
      total: count.total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadPaper = async (req, res) => {
  try {
    if (!req.files?.file?.[0] || !req.files?.preview?.[0]) {
      return res.status(400).json({ error: 'Missing file or preview upload' });
    }

    let raw;
    try {
      raw = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON in data field' });
    }

    delete raw.id;

    raw.fileUrl = await uploadFile(req.files.file[0], 'papers');
    raw.previewImageUrl = await uploadFile(req.files.preview[0], 'preview');
    raw.userEmail = raw.userEmail || req.user?.email || 'unknown@user.com';

    const snakeRaw = toSnakeCase(raw);
    const dto = sanitize(snakeRaw);

    const [saved] = await Paper.insertPaper(dto);
    res.status(201).json(toCamelCase(saved));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePaper = async (req, res) => {
  try {
    let raw;
    try {
      raw = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON in data field' });
    }

    const id = req.params.id;

    if (req.files?.file?.[0]) {
      raw.fileUrl = await uploadFile(req.files.file[0], 'papers');
    }

    if (req.files?.preview?.[0]) {
      raw.previewImageUrl = await uploadFile(req.files.preview[0], 'preview');
    }

    raw.userEmail = raw.userEmail || req.user?.email || 'unknown@user.com';

    const snakeRaw = toSnakeCase(raw);
    const dto = sanitize(snakeRaw);

    const [updated] = await Paper.updatePaper(id, dto);
    updated
      ? res.json(toCamelCase(updated))
      : res.status(404).send('Paper not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePaper = async (req, res) => {
  try {
    const deleted = await Paper.deletePaper(req.params.id);
    deleted
      ? res.send('Paper deleted')
      : res.status(404).send('Paper not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
