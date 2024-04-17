export default function convertDate(dateString: any) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Đảm bảo rằng ngày và tháng có dạng số kép (vd: 05, 06)
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // return `${formattedDay}/${formattedMonth}/${year}`
  return {
    day: formattedDay,
    month: formattedMonth,
    year: year,
    formattedDate: `${formattedDay}/${formattedMonth}/${year}`,
  };
}
