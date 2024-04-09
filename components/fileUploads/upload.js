const multer = require('multer');
const util = require('util');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type;

    // const dest = path.join(process.env.UPLOADS, type);
    const dest = path.join("fileUploads", type);
    // Ensure that the destination directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const type = req.body.type;

    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

const uploads = multer({
  storage,
}).single('imageUrl');

const FileUploads = util.promisify(uploads);

module.exports = FileUploads;
