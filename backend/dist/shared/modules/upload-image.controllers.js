const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(null, "./shared/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "." + ext);
    },
});
router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    res.status(201).json({
        url: url + "/shared/images/" + req.file.filename,
    });
});
router.delete("/:file", (req, res, next) => {
    const file = req.params.file;
    const path = "./shared/images/" + file;
    try {
        fs.unlinkSync(path);
    }
    catch (err) {
        console.error(err);
    }
});
module.exports = router;
//# sourceMappingURL=upload-image.controllers.js.map