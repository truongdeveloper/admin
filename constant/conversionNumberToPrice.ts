function transformPriceToString(value: any) {
  if (value == null) return "--";
  let valuePrice;
  if (typeof value === "number") {
    valuePrice = Math.round(value).toString();
  } else {
    return "Liên hệ";
  }
  let soThu1 = valuePrice.slice(0, 1);
  let soThu2 = valuePrice.slice(1, 2);
  let soThu3 = valuePrice.slice(2, 3);
  let soThu4 = valuePrice.slice(3, 4);

  switch (valuePrice.length) {
    // Giá thỏa thuận
    case 1:
      return "Liên hệ";
    // Tiền triệu
    case 7:
      return soThu1 + (Number(soThu2) > 0 ? "," + soThu2 : "") + " Triệu";
    // Tiền chục triệu
    case 8:
      return (
        soThu1 + soThu2 + (Number(soThu3) > 0 ? "," + soThu3 : "") + " Triệu"
      );
    // Tiền Trăm Triệu
    case 9:
      return (
        soThu1 +
        soThu2 +
        soThu3 +
        (Number(soThu4) > 0 ? "," + soThu4 : "") +
        " Triệu"
      );
    // Tiền Tỷ
    case 10:
      return soThu1 + (Number(soThu2) > 0 ? "," + soThu2 : "") + " Tỷ";
    // Tiền Chục Tỷ
    case 11:
      return soThu1 + soThu2 + (Number(soThu3) > 0 ? "," + soThu3 : "") + " Tỷ";
    // Tiền Trăm tỷ
    case 12:
      return (
        soThu1 +
        soThu2 +
        soThu3 +
        (Number(soThu4) > 0 ? "," + soThu4 : "") +
        " Tỷ"
      );
    case 6:
      return "0," + soThu1 + soThu2 + " Triệu";

    default:
      return "Liên hệ";
  }
}

export default transformPriceToString;
