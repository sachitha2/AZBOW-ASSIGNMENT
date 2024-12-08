import multer, { StorageEngine } from "multer";
import path from "path";

// Test-specific Mock StorageEngine
class MockStorage implements StorageEngine {
  _handleFile(req: any, file: any, cb: any) {
    req.file = {
      filename: "mock-image.jpg",
      path: "/uploads/images/mock-image.jpg",
    };
    cb(null, { path: req.file.path, size: 1234 });
  }

  _removeFile(req: any, file: any, cb: any) {
    cb(null);
  }
}

const storage =
  process.env.NODE_ENV === "test"
    ? new MockStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/images/");
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}${ext}`;
          cb(null, uniqueName);
        },
      });

const upload = multer({ storage });

export default upload;