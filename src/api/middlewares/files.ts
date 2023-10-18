import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, "../../../uploads"));
  },
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(" ", "_")}`);
  },
});

export const fileMulter = multer({ storage });
