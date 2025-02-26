const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
const multer = require("multer")

dotenv.config();
cloudinary.config({
  cloud_name: "dxuxtyf8v",
  api_key: '451424149786771',
  api_secret: "l9xCKxj-iciA_wNzqA6TT7zSiz8",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book_images", 
    format: async (req, file) => "png", 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
