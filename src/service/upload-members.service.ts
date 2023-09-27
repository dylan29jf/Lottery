import { readExcelFile } from "../utilities";
import { toast } from "react-hot-toast";

export const uploadMembers = async (file: File) => {
  const extension = file.name.split(".").pop()?.toLocaleLowerCase();
  if (extension === "xlsx") {
    try {
      return await readExcelFile(file);
    } catch (error) {
      return null;
    }
  } else {
    toast.error("Invalid File", {
      style: {
        background: "#52525b",
        color: "#fff",
      },
    });
  }

  return null;
};
