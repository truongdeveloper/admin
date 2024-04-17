//Viết hàm nhần vào mã quyền trả về 1 là Quản trị 2 là CỘng tác viên 3 là người dùng
export const conversionPermission = (permission: number): string => {
  switch (permission) {
    case 1:
      return "Quản trị";
    case 2:
      return "Cộng tác viên";
    case 3:
      return "Người dùng";
    default:
      return "";
  }
};

export const conversionStatusAccount = (status: number): string => {
  switch (status) {
    case 1:
      return "Hoạt động";
    case 0:
      return "Khóa";
    default:
      return "Không xác định";
  }
};
