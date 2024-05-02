export const conversionStatusPayment = (status: string | undefined) => {
  switch (status?.trim()) {
    case "00": {
      return "Thành công";
    }
    default: {
      return "Thất bại";
    }
  }
};

export const conversionTypePayment = (type: number | undefined) => {
  switch (type) {
    case 0: {
      return "Bài đăng";
    }
    case 1: {
      return "Mua gói";
    }
    default: {
      return "Không xác định";
    }
  }
};
