function calculateEndDate(startDate: string, durationMonths: number) {
  const date = new Date(startDate);

  date.setMonth(date.getMonth() + durationMonths);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;

  const endDate = `${year}-${formattedMonth}-${formattedDay}`;
  return endDate;
}

export default calculateEndDate;
