import jsPDF from "jspdf";
import "jspdf-autotable";

const generateMedicinePDF = (medicines) => {
    const document = new jsPDF();

    const tableColumn = [
        "medName",
        "medCategory",
        "medEffects",
        "quantity",
        "company",
        "storeBox",
        "purchasePrice",
        "salePrice",
        "expDate",
    ];
    const tableRows = [];
if(medicines && medicines.length > 0) {
    medicines.forEach((medicine) => {
        const dataRow = [
            medicine.medName,
            medicine.medCategory,
            medicine.medEffects,
            medicine.quantity,
            medicine.company,
            medicine.storeBox,
            medicine.purchasePrice,
            medicine.salePrice,
            medicine.expDate.slice(0,10),
        ];
        tableRows.push(dataRow);
    });
    document.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");

        const dateStr =
        date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
        // ticket title. and margin-top + margin-left
        document.text("Detail Order Report", 14, 15);
        // we define the name of our PDF file.
        document.save(`report_${dateStr}.pdf`);
}

}

export default generateMedicinePDF;