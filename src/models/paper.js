const db = require('../config/db');

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

const getAllPapers = () => db('papers').select('*');

const getPaperById = id => db('papers').where({ id }).first();

const searchBySubject = subject =>
  db('papers').whereILike('subject', `%${subject}%`);

const insertPaper = paper =>
  db('papers').insert(sanitize(paper)).returning('*');

const updatePaper = (id, paper) =>
  db('papers').where({ id }).update(sanitize(paper)).returning('*');

const deletePaper = id => db('papers').where({ id }).del();

module.exports = {
  getAllPapers,
  getPaperById,
  searchBySubject,
  insertPaper,
  updatePaper,
  deletePaper,
};
