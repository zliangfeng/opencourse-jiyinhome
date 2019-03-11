export const formatBarcode = (barcode) =>
    (barcode &&
        barcode.length === 12 &&
        `${barcode.slice(0, 4)} ${barcode.slice(4, 10)} ${barcode.slice(10)}`) ||
    barcode;
