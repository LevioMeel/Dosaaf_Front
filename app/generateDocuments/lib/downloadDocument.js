export function downloadDocument(blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "graphUchetDriveGenerated.docx";
    a.click();
}