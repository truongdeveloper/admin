// const jsonData = {
//   nam: "2024",
//   noiDung: [
//     {
//       thang: "4",
//       soLuong: "30",
//       thanhTien: "1500000",
//     },
//     {
//       thang: "5",
//       soLuong: "3",
//       thanhTien: "150000",
//     },
//   ],
// };
const ConnversionStatistion = (jsonData: any) => {
  const data = Array.from({ length: 12 }, () => 0);
  const thanhTienData = Array.from({ length: 12 }, () => 0);

  jsonData.noiDung.forEach((item: any) => {
    const month = parseInt(item.thang);
    const quantity = parseInt(item.soLuong);
    const thanhTien = parseInt(item.thanhTien);
    data[month - 1] = quantity;
    thanhTienData[month - 1] = thanhTien;
  });

  return [
    {
      name: "bài đăng",
      data: data,
    },
    {
      name: "thành tiền",
      data: thanhTienData,
    },
  ];
};

export default ConnversionStatistion;
