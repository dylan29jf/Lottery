import * as XLSX from "xlsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportExcelFile = (winners: any) => {
  const workbook = XLSX.utils.book_new();

  // Crear una hoja de Excel a partir de los datos
  const sheet = XLSX.utils.json_to_sheet(winners);

  // Agregar la hoja al libro de Excel
  XLSX.utils.book_append_sheet(workbook, sheet, "Winners");

  // Convertir el libro de Excel a un objeto de blob
  const excelBlob = new Blob(
    [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
    {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  // Crear una URL de descarga para el objeto de blob
  const downloadUrl = URL.createObjectURL(excelBlob);

  // Crear un elemento de enlace temporal para descargar el archivo
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `Winners_${new Date().toDateString}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
