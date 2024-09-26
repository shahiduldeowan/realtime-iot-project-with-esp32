import { emitSocketEvent } from "../socket/index.js";

const getDeviceIp = (req, res) => {
  try {
    const { ip } = req.body;

    emitSocketEvent(req, "ip", ip);

    return res.status(200).json({
      success: true,
      message: "successfully get device ip"
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

export { getDeviceIp };

