import fs from "fs";
import { emitSocketEvent } from "../socket/index.js";

const imageCaptured = (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {

      console.log("No image captured");
      return res
        .status(400)
        .json({
          success: false,
          message: "No image captured",
        });
    }

    console.log("Image captured successfully", req.file?.path);
    return res
      .status(200)
      .json({
        success: true,
        message: "Image captured successfully",
        image: req.file.path,
      });
  } catch (error) {

    console.log(error);
    return res
      .status(error.status || 500)
      .json({
        success: false,
        message: error.message,
      });
  }
}

const imageCapturedAsABase64 = (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      console.log("No image captured");
      return res
        .status(400)
        .json({
          success: false,
          message: "No image captured",
        });
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = `public/images/${uniqueSuffix}.png`;
    fs.writeFileSync(filePath, buffer);

    console.log("Image captured successfully", filePath);

    return res
      .status(200)
      .json({
        success: true,
        message: "Image captured successfully",
        image: filePath,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({
        success: false,
        message: error.message,
      });
  }
};

const uploadImageFromEsp32 = (req, res) => {
  try {
    if (!req.file) {
      console.log("No image uploaded!");
      return res
        .status(400)
        .json({
          success: false,
          message: "No image uploaded!",
        });
    }

    // console.log("Image uploaded successfully", req.file?.path);

    const base64Image = fs.readFileSync(req.file?.path, { encoding: "base64" });

    fs.unlinkSync(req.file?.path);

    emitSocketEvent(req, "live-image", base64Image);

    return res
      .status(200)
      .json({
        success: true,
        message: "Image uploaded successfully",
        image: req.file.path,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({
        success: false,
        message: error.message,
      });
  }
}

export { imageCaptured, imageCapturedAsABase64, uploadImageFromEsp32 };

