import { readExcelFile } from "../utilities";
import { toast } from "react-hot-toast";

export const uploadMembers = (file: File) => {
  const extension = file.name.split(".").pop()?.toLocaleLowerCase();
  if (extension === "xlsx") {
    return readExcelFile(file);
  } else {
    toast.error("Invalid File", {
      style: {
        background: "#52525b",
        color: "#fff",
      },
    });
  }
};
