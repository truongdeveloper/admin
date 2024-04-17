function conversionStatusPost(status: number) {
  switch (status) {
    case 0:
      return "Ẩn";
    case 1:
      return "Đã duyệt";
    case 2:
      return "Đang chờ duyệt";
    default:
      return "Đang chờ duyệt";
  }
}

export { conversionStatusPost };
