import toast from "react-hot-toast";
import Axios from "./Axios";

const UploadImageService = async (file, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/upload", file);
    setLoading(false);
    toast.success("Image uploaded successfully");
    return data;
  } catch (error) {
    console.error("Image Upload Error:", error.response?.data || error.message);
    toast.error("Image Upload Error");
    setLoading(false);
    throw error;
  }
};
export default UploadImageService;
