import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";



const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024 //5MB
  }
})



router.post('/',
verifyToken, [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night type is required and must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;


      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        console.log(b64)
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        console.log(dataURI)
        const res = await cloudinary.v2.uploader.upload(dataURI);
        console.log(res)
        return res.url;
      })

      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId; 

      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel)
    } catch (e) {
      console.log(`Error creating in hotel : ${e}`)
      res.status(501).json({ message: 'Something went wrong' })
    }
  })

  export default router;