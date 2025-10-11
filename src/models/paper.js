import db from '../config/db.js';
import { allowedPaperKeys } from '../utils/dtoMapper.js';

const sanitize = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedPaperKeys.includes(key))
  );

export const getAllPapers = (limit = 30, offset = 0) =>
  db('papers')
    .select('*')
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

export const getPaperById = (id) =>
  db('papers')
    .where({ id })
    .first();

export const searchBySubject = (subject, limit = 30, offset = 0) =>
  db('papers')
    .whereILike('subject', `%${subject}%`)
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

export const insertPaper = (paper) =>
  db('papers')
    .insert(sanitize(paper))
    .returning('*');

export const updatePaper = (id, paper) =>
  db('papers')
    .where({ id })
    .update(sanitize(paper))
    .returning('*');

export const deletePaper = (id) =>
  db('papers')
    .where({ id })
    .del();

export const countAllPapers = () =>
  db('papers')
    .count('* as total')
    .first();

export const countSearchResults = (subject) =>
  db('papers')
    .whereILike('subject', `%${subject}%`)
    .count('* as total')
    .first();

    