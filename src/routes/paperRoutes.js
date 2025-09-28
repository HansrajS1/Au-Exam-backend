const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  getAll,
  getById,
  search,
  uploadPaper,
  updatePaper,
  deletePaper,
} = require('../controllers/paperController');

router.get('/', getAll);
router.get('/search', search);
router.get('/:id', getById);
router.post('/upload', upload.fields([{ name: 'preview' }, { name: 'file' }]), uploadPaper);
router.put('/:id', upload.fields([{ name: 'preview' }, { name: 'file' }]), updatePaper);
router.delete('/:id', deletePaper);

module.exports = router;
