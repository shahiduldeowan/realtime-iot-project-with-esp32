import { Router } from "express";
import { imageCaptured, imageCapturedAsABase64, uploadImageFromEsp32 } from "../controllers/imageControllers.js";
import { getDeviceIp } from "../controllers/iotDeviceInfo.js";
import { upload, uploadImage } from "../middlewares/multerMiddlewares.js";

const router = Router();

router.route("/capture").post(uploadImage.single("image"), imageCaptured);
router.route("/capture/base64").post(imageCapturedAsABase64);
router.route("/upload").post(upload.single("imageFile"), uploadImageFromEsp32);
router.route("/device-ip").post(getDeviceIp);

export default router;

