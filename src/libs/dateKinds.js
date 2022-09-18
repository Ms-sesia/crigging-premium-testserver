export default (date) => {
  const yearMonth = date.match(/\d{4}-\d{2}/)[0];
  const workDate = new Date(date);
  const selectedDayOfMonth = workDate.getDate();
  const first = new Date(workDate.getFullYear() + "/" + (workDate.getMonth() + 1) + "/01");
  const monthFirstDateDay = first.getDay(); //몇요일 [0 - 6] [Sun - Sat]
  const week = Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);
  const yearMonthDay = date.match(/\d{4}-\d{2}-\d{2}/)[0];

  return {
    week,
    yearMonth,
    yearMonthDay,
  };
};
