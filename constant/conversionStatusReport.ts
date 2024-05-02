export const conversionStatusReport = (status: number | undefined) => {
  switch (status) {
    case 0:
      return "Chưa xử lý";
    case 1:
      return "Đã xử lý";
    default:
      return "Không xác định";
  }
};
