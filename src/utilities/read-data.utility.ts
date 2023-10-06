import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

export const readExcelFile = (file: File, clean: boolean) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result as string;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const containFieldName = validateFieldName(jsonData);

      if (containFieldName) {
        const filterData = clean ? filterDuplicates(jsonData, "Name") : jsonData;
        addTimesWon(filterData);
       
        toast.success("uploaded file", {
          style: {
            background: "#52525b",
            color: "#fff",
          },
        });
        resolve(filterData);
      } else {
        toast.error("Missing field 'name'", {
          style: {
            background: "#52525b",
            color: "#fff",
          },
        });
        reject(new Error("Missing field 'name'"));
      }
    };

    reader.readAsBinaryString(file);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addTimesWon(json: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json.forEach((element: any) => {
    element.timesWon = 0;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterDuplicates(data: any[], fieldName: string) {
  const uniqueNames: { [key: string]: boolean } = {};
  return data.filter((item) => {
    const fieldValue = item[fieldName].toLowerCase().trim()
    if (!uniqueNames[fieldValue]) {
      uniqueNames[fieldValue] = true;
      return true;
    }
    return false;
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateFieldName = (json: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return json.every((item: any) =>
    Object.prototype.hasOwnProperty.call(item, "Name")
  );
};
