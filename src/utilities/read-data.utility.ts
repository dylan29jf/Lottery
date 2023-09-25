import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

export const readExcelFile = (file: File) => {
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = e.target?.result as string;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    const containFieldName = validateFieldName(jsonData);

    if (containFieldName) {
      return jsonData;
    } else {
      toast.error("Missing field 'name'", {
        style: {
          background: "#52525b",
          color: "#fff",
        },
      });
    }
  };

  reader.readAsBinaryString(file);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateFieldName = (json: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return json.every((item: any) =>
    Object.prototype.hasOwnProperty.call(item, "name")
  );
};
