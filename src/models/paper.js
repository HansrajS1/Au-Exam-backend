const db = require("../config/db");
const { allowedPaperKeys } = require("../utils/dtoMapper");




const sanitize = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedPaperKeys.includes(key))
  );

const getAllPapers = (limit = 30, offset = 0) =>
  db("papers")
    .select("*")
    .orderBy("id", "desc")
    .limit(limit)
    .offset(offset);

const getPaperById = (id) =>
  db("papers")
    .where({ id })
    .first();

const searchBySubject = (subject, limit = 30, offset = 0) =>
  db("papers")
    .whereILike("subject", `%${subject}%`)
    .orderBy("id", "desc")
    .limit(limit)
    .offset(offset);

const insertPaper = (paper) =>
  db("papers")
    .insert(sanitize(paper))
    .returning("*");

const updatePaper = (id, paper) =>
  db("papers")
    .where({ id })
    .update(sanitize(paper))
    .returning("*");

const deletePaper = (id) =>
  db("papers")
    .where({ id })
    .del();

const countAllPapers = () =>
  db("papers")
    .count("* as total")
    .first();

const countSearchResults = (subject) =>
  db("papers")
    .whereILike("subject", `%${subject}%`)
    .count("* as total")
    .first();

module.exports = {
  getAllPapers,
  getPaperById,
  searchBySubject,
  insertPaper,
  updatePaper,
  deletePaper,
  countAllPapers,
  countSearchResults,
};
