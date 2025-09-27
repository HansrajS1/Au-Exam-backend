const db = require('../config/db');

const getAllPapers = () => db('papers').select('*');
const getPaperById = id => db('papers').where({ id }).first();
const searchBySubject = subject => db('papers').whereILike('subject', `%${subject}%`);
const insertPaper = paper => db('papers').insert(paper).returning('*');
const updatePaper = (id, paper) => db('papers').where({ id }).update(paper).returning('*');
const deletePaper = id => db('papers').where({ id }).del();

module.exports = {
  getAllPapers,
  getPaperById,
  searchBySubject,
  insertPaper,
  updatePaper,
  deletePaper,
};
