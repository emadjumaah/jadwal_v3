export const periods = {
  day: "day",
  month: "month",
  year: "year",
};

export const getCurrentDMY = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return { day, month, year };
};

export const getPreviousDMY = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const pday = yesterday.getDate();

  const month = new Date();
  month.setMonth(month.getMonth() - 1);
  const pmonth = month.getMonth() + 1;

  const year = new Date();
  year.setFullYear(year.getFullYear() - 1);
  const pyear = year.getFullYear();

  return { pday, pmonth, pyear };
};

export const getPastPreviousDMY = () => {
  const pyesterday = new Date();
  pyesterday.setDate(pyesterday.getDate() - 2);
  const ppday = pyesterday.getDate();

  const month = new Date();
  month.setMonth(month.getMonth() - 2);
  const ppmonth = month.getMonth() + 1;

  const year = new Date();
  year.setFullYear(year.getFullYear() - 2);
  const ppyear = year.getFullYear();

  return { ppday, ppmonth, ppyear };
};

export const getStartPeriod = (period: any) => {
  let start: any;
  let num: any;

  const date = new Date();

  if (period === periods.day) {
    start = new Date();
    start.setHours(0, 0, 0, 0);
    num = start.getDate();
  }
  if (period === periods.month) {
    const year = date.getFullYear();
    const month = date.getMonth();
    start = new Date(year, month, 1);
    start.setHours(0, 0, 0, 0);
    num = start.getMonth() + 1;
  }
  if (period === periods.year) {
    start = new Date(date.getFullYear(), 0, 1, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    num = start.getFullYear();
  }
  return { start, num };
};

export const getLastYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const pyear1 = new Date(year - 1, 0, 1);
  const pyear = pyear1.getFullYear();
  return pyear;
};

export const getTarseedDates = (time?: any) => {
  const date = time ? new Date(time) : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const startThisYear = new Date(year, 0, 1, 0, 0, 0, 0);
  const startThisMonth = new Date(year, month, 1, 0, 0, 0, 0);
  const startThisDay = new Date(year, month, day, 0, 0, 0, 0);

  const pday1 = new Date(year, month, day - 1);
  const pmonth1 = new Date(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1,
    1
  );
  const pyear1 = new Date(year - 1, 0, 1);

  const ppday1 = new Date(year, month, day - 2);
  const ppmonth1 = new Date(
    month < 2 ? year - 1 : year,
    month === 0 ? 10 : month === 1 ? 11 : month - 2,
    1
  );
  const ppyear1 = new Date(year - 2, 0, 1);

  const pday = pday1.getDate();
  const pdayMonth = pday1.getMonth();
  const pdayYear = pday1.getFullYear();

  const pmonth = pmonth1.getMonth();
  const pmonthYear = pmonth1.getFullYear();

  const pyear = pyear1.getFullYear();

  const ppday = ppday1.getDate();
  const ppdayMonth = ppday1.getMonth();
  const ppdayYear = ppday1.getFullYear();

  const ppmonth = ppmonth1.getMonth();
  const ppmonthYear = ppmonth1.getFullYear();

  const ppyear = ppyear1.getFullYear();

  const startDay = new Date(pday1);
  startDay.setHours(0, 0, 0, 0);
  const endDay = new Date(pday1);
  endDay.setHours(23, 59, 59, 999);

  const y = pmonth1.getFullYear();
  const m = pmonth1.getMonth();
  const startMonth = new Date(y, m, 1, 0, 0, 0, 0);
  const endMonth = new Date(y, m + 1, 0, 23, 59, 59, 999);

  const yy = pyear1.getFullYear();
  const startYear = new Date(yy, 0, 1, 0, 0, 0, 0);
  const endYear = new Date(yy, 11, 31, 23, 59, 59, 999);

  return {
    day,
    month,
    year,
    pday,
    pmonth,
    pyear,
    ppday,
    ppmonth,
    ppyear,
    startThisYear,
    startThisMonth,
    startThisDay,
    startDay,
    endDay,
    startMonth,
    endMonth,
    startYear,
    endYear,
    pdayMonth,
    pdayYear,
    pmonthYear,
    ppdayMonth,
    ppdayYear,
    ppmonthYear,
  };
};
export const getStartLastMooth = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const pmonth = new Date(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1,
    1
  );

  const y = pmonth.getFullYear();
  const m = pmonth.getMonth();
  const startMonth = new Date(y, m, 1, 0, 0, 0, 0);

  return startMonth;
};
export const getNextDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
export const getStartThisYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const pyear1 = new Date(year - 1, 0, 1);
  const pyear = pyear1.getFullYear();
  const startThisYear = new Date(year, 0, 1, 0, 0, 0, 0);

  return { startThisYear, pyear };
};

export const getTarseedYear = (time: any) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);
  const pyear1 = new Date(year - 1, 1, 2);
  const pyear = pyear1.getFullYear();

  return {
    year,
    pyear,
    start,
    end,
  };
};

export const getTarseedMonth = (time: any) => {
  const date = new Date(time);
  const month = date.getMonth();
  const year = date.getFullYear();
  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const pmonth1 = new Date(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1,
    1
  );
  const pmonth = pmonth1.getMonth();
  const pmonthYear = pmonth1.getFullYear();
  return {
    month,
    year,
    pmonth,
    pmonthYear,
    start,
    end,
  };
};

export const getTarseedDay = (time: any) => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const pday1 = new Date(year, month, day - 1);
  const start = new Date(year, month, day, 0, 0, 0, 0);
  const end = new Date(year, month, day, 23, 59, 59, 999);
  const pday = pday1.getDate();
  const pdayMonth = pday1.getMonth();
  const pdayYear = pday1.getFullYear();
  return {
    day,
    month,
    year,
    start,
    end,
    pday,
    pdayMonth,
    pdayYear,
  };
};

export const getMonthsArray = function (s: any, e: any) {
  for (
    var b: any = [], c: any = [], d = new Date(s);
    d <= e;
    d.setDate(d.getDate() + 1)
  ) {
    b.push({ m: d.getMonth(), y: d.getFullYear() });
    c.push({ y: d.getFullYear() });
  }

  const mapmonth: any = {};
  const months: any = [];
  b.forEach((el: any) => {
    if (!mapmonth[JSON.stringify(el)]) {
      mapmonth[JSON.stringify(el)] = true;
      months.push(el);
    }
  });

  const mapyear: any = {};
  const years: any = [];
  c.forEach((el: any) => {
    if (!mapyear[JSON.stringify(el)]) {
      mapyear[JSON.stringify(el)] = true;
      years.push(el);
    }
  });
  return { months, years };
};
export const getDaysMonthsArray = function (s: any, e: any) {
  for (
    var a: any = [], b: any = [], c: any = [], d = new Date(s);
    d <= e;
    d.setDate(d.getDate() + 1)
  ) {
    a.push({ d: d.getDate(), m: d.getMonth(), y: d.getFullYear() });
    b.push({ m: d.getMonth(), y: d.getFullYear() });
    c.push({ y: d.getFullYear() });
  }
  const days: any = a;
  days.pop();
  const mapmonth: any = {};
  const months: any = [];
  b.forEach((el: any) => {
    if (!mapmonth[JSON.stringify(el)]) {
      mapmonth[JSON.stringify(el)] = true;
      months.push(el);
    }
  });
  months.pop();
  const mapyear: any = {};
  const years: any = [];
  c.forEach((el: any) => {
    if (!mapyear[JSON.stringify(el)]) {
      mapyear[JSON.stringify(el)] = true;
      years.push(el);
    }
  });
  years.pop();
  return { days, months, years };
};

export const getListDaysMonthsYears = (time: any) =>
  getDaysMonthsArray(new Date(time), new Date());

export const getLastPeriodInfo = (period: any) => {
  if (period === periods.day) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const month = yesterday.getMonth() + 1; //months from 1-12
    const day = yesterday.getDate();
    const year = yesterday.getFullYear();

    const start = new Date(yesterday.setHours(0, 0, 0, 0));
    const end = new Date(yesterday.setHours(23, 59, 59, 999));
    return { day, month, year, start, end };
  }
  if (period === periods.month) {
    const lastmonth = new Date();
    lastmonth.setMonth(lastmonth.getMonth() - 1);
    const month = lastmonth.getMonth() + 1; //months from 1-12
    const year = lastmonth.getFullYear();
    const start = new Date(year, lastmonth.getMonth(), 1);
    const end = new Date(year, lastmonth.getMonth() + 1, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { month, year, start, end };
  }
  if (period === periods.year) {
    const lastyear = new Date();
    lastyear.setFullYear(lastyear.getFullYear() - 1);
    const year = lastyear.getFullYear();
    const start = new Date(year, 0, 1, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const end = new Date(year, 11, 31, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { year, start, end };
  }
};

export const getStartEndPeriod = (period: any, date = new Date()) => {
  let start: any;
  let end: any;
  let num: any;

  if (period === periods.day) {
    start = new Date();
    start.setHours(0, 0, 0, 0);
    end = new Date();
    end.setHours(23, 59, 59, 999);
    num = start.getDate();
  }
  if (period === periods.month) {
    const year = date.getFullYear();
    const month = date.getMonth();
    start = new Date(year, month, 1);
    end = new Date(year, month + 1, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    num = start.getMonth() + 1;
  }
  if (period === periods.year) {
    start = new Date(date.getFullYear(), 0, 1, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end = new Date(date.getFullYear(), 11, 31, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    num = start.getFullYear();
  }
  return { start, end, num };
};

export const getYMD = (time: any) => {
  const date = time ? new Date(time) : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return { year, month, day };
};

export const uuidv4 = () => {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const decompressEvents = (events: any) => {
  if (events) {
    const data = JSON.parse(events);
    const { event, times } = data;
    if (event && times) {
      const readyEvents = times.map((evt: any) => {
        return {
          ...event,
          startDate: evt.startDate,
          endDate: evt.endDate,
        };
      });
      return readyEvents;
    } else {
      return [];
    }
  }
};
