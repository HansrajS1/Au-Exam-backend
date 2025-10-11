import express from 'express';
import multer from 'multer';
import {
  getAll,
  getById,
  search,
  uploadPaper,
  updatePaper,
  deletePaper,
} from '../controllers/paperController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAll);
router.get('/search', search);
router.get('/:id', getById);
router.post(
  '/upload',
  upload.fields([{ name: 'preview' }, { name: 'file' }]),
  uploadPaper
);
router.put(
  '/:id',
  upload.fields([{ name: 'preview' }, { name: 'file' }]),
  updatePaper
);
router.delete('/:id', deletePaper);

export default router;
