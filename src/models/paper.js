const allowedKeys = [
  'college',
  'course',
  'description',
  'file_url',
  'preview_image_url',
  'semester',
  'subject',
  'user_email'
];

const sanitize = obj =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => allowedKeys.includes(key)));

const withDb = async (fn) => {
  const db = require('../config/db');
  try {
    return await fn(db);
  } catch (err) {
    console.error('DB Error:', err);
    throw err;
  }
};

const getAllPapers = () =>
  withDb(db => db('papers').select('*'));

const getPaperById = (id) =>
  withDb(db => db('papers').where({ id }).first());

const searchBySubject = (subject) =>
  withDb(db => db('papers').whereILike('subject', `%${subject}%`));

const insertPaper = (paper) =>
  withDb(db => db('papers').insert(sanitize(paper)).returning('*'));

const updatePaper = (id, paper) =>
  withDb(db => db('papers').where({ id }).update(sanitize(paper)).returning('*'));

const deletePaper = (id) =>
  withDb(db => db('papers').where({ id }).del());

module.exports = {
  getAllPapers,
  getPaperById,
  searchBySubject,
  insertPaper,
  updatePaper,
  deletePaper,
};
