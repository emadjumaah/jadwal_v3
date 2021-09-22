import { Account, Branch, Closing, Kaid } from "../models";
import { accountType, raseedType } from "../constant";
import {
  getLastYear,
  getListDaysMonthsYears,
  getTarseedDates,
  getTarseedDay,
  getTarseedMonth,
  getTarseedYear,
  periods,
} from "./time";

const getPreviousBalance = async ({
  accCode,
  accType,
  period,
  branch,
  pday,
  pdayMonth,
  pdayYear,
  pmonth,
  pmonthYear,
  pyear,
}: any) => {
  let startBalance = 0;
  let startBalanceType = accType;
  const option =
    period === periods.day
      ? {
          day: pday,
          month: pdayMonth,
          year: pdayYear,
        }
      : period === periods.month
      ? {
          month: pmonth,
          year: pmonthYear,
        }
      : period === periods.year
      ? {
          year: pyear,
        }
      : {};
  const closDoc: any = await Closing.findOne({
    closingPeriod: period,
    branch,
    ...option,
  });
  if (closDoc) {
    const { data } = closDoc;
    const accs = data.filter((da: any) => da.accCode === accCode);
    if (accs?.length > 0) {
      startBalance = accs?.[0]?.endBalance;
      startBalanceType = accs?.[0]?.endBalanceType;
    }
    return { startBalance, startBalanceType };
  } else {
    return { startBalance, startBalanceType };
  }
};

const tarseedHesab = async ({
  account,
  start,
  end,
  period,
  pday,
  pdayMonth,
  pdayYear,
  pmonth,
  pmonthYear,
  pyear,
  branch,
}: any) => {
  const { code, accType } = account;
  const { startBalance, startBalanceType } = await getPreviousBalance({
    accCode: code,
    accType,
    branch,
    period,
    pday,
    pdayMonth,
    pdayYear,
    pmonth,
    pmonthYear,
    pyear,
  });

  const raseed: any = await Kaid.aggregate([
    {
      $match: {
        accCode: code,
        branch,
        opTime: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: null,
        debit: { $sum: "$debit" },
        credit: { $sum: "$credit" },
      },
    },
  ]);
  const debit = raseed?.[0]?.debit ? raseed?.[0]?.debit : 0;
  const credit = raseed?.[0]?.credit ? raseed?.[0]?.credit : 0;

  const isDebit = debit > credit;

  const periodBalance = isDebit ? debit - credit : credit - debit;
  const periodBalanceType = isDebit
    ? raseedType.DEBIT
    : debit === credit
    ? accType
    : raseedType.CREDIT;

  const isSameType = startBalanceType === periodBalanceType;
  const isStartBig = startBalance > periodBalance;

  const endBalance = isSameType
    ? startBalance + periodBalance
    : isStartBig
    ? startBalance - periodBalance
    : periodBalance - startBalance;

  const endBalanceType = isSameType
    ? startBalanceType
    : isStartBig
    ? startBalanceType
    : periodBalanceType;

  return {
    startBalance,
    startBalanceType,
    periodBalance,
    periodBalanceType,
    endBalance,
    endBalanceType,
  };
};

const calculateDay = async ({ branch, time }: any) => {
  const { day, month, year, pday, pdayMonth, pdayYear, start, end } =
    getTarseedDay(time);
  const accounts = await Account.find({ branch });
  const data = await Promise.all(
    accounts.map(async (acc: any) => {
      const {
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      } = await tarseedHesab({
        account: acc,
        start,
        end,
        period: periods.day,
        pday,
        pdayMonth,
        pdayYear,
        branch,
      });
      return {
        accId: acc._id,
        accCode: acc.code,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accType: acc.accType,
        parent: acc.parent,
        parentAr: acc.parentAr,
        parentcode: acc.parentcode,
        closedAcc: acc.closedAcc,
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      };
    })
  );
  await Closing.findOneAndUpdate(
    {
      closingPeriod: periods.day,
      day,
      month,
      year,
      branch,
    },
    {
      branch,
      data,
      closingPeriod: periods.day,
      day,
      month,
      year,
    },
    { upsert: true, new: true }
  );
};

const calculateMonth = async ({ branch, time }: any) => {
  const { start, end, month, year, pmonth, pmonthYear } = getTarseedMonth(time);
  const accounts = await Account.find({ branch });
  const data = await Promise.all(
    accounts.map(async (acc: any) => {
      const {
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      } = await tarseedHesab({
        account: acc,
        start,
        end,
        period: periods.month,
        pmonth,
        pmonthYear,
        branch,
      });
      return {
        accId: acc._id,
        accCode: acc.code,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accType: acc.accType,
        parent: acc.parent,
        parentAr: acc.parentAr,
        parentcode: acc.parentcode,
        closedAcc: acc.closedAcc,
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      };
    })
  );

  await Closing.findOneAndUpdate(
    {
      closingPeriod: periods.month,
      month,
      year,
      branch,
    },
    {
      branch,
      data,
      closingPeriod: periods.month,
      month,
      year,
    },
    { upsert: true, new: true }
  );
};

export const calculatYear = async ({ branch, time }: any) => {
  const { year, pyear, start, end } = getTarseedYear(time);
  const accounts = await Account.find({ branch });

  const data = await Promise.all(
    accounts.map(async (acc: any) => {
      const {
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      } = await tarseedHesab({
        account: acc,
        start,
        end,
        period: periods.year,
        pyear,
        branch,
      });
      return {
        accId: acc._id,
        accCode: acc.code,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accType: acc.accType,
        parent: acc.parent,
        parentAr: acc.parentAr,
        parentcode: acc.parentcode,
        closedAcc: acc.closedAcc,
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      };
    })
  );
  await Closing.findOneAndUpdate(
    { closingPeriod: periods.year, year, branch },
    { branch, data, closingPeriod: periods.year, year },
    { upsert: true, new: true }
  );
};
export const calculatYearFromNow = async ({ branch, end, accId }: any) => {
  const { pyear, start } = getTarseedYear(end);
  const account: any = await Account.findById(accId);
  const { endBalance, endBalanceType } = await tarseedHesab({
    account,
    start,
    end,
    period: periods.year,
    pyear,
    branch,
  });
  const amount = account.accType === endBalanceType ? endBalance : -endBalance;
  return amount;
};

export const calcEditedData = async ({ branch, edited }: any) => {
  const { timeEdited } = edited;
  const { days, months, years } = getListDaysMonthsYears(timeEdited);
  for (const day of days) {
    const { y, m, d } = day;
    await calculateDay({ branch, time: new Date(y, m, d) });
  }
  for (const month of months) {
    const { y, m } = month;
    await calculateMonth({ branch, time: new Date(y, m, 2) });
  }
  for (const year of years) {
    const { y } = year;
    await calculatYear({ branch, time: new Date(y, 1, 2) });
  }
  await Closing.deleteMany({
    isEdited: false,
    closingPeriod: { $exists: false },
  });
};

export const tarseedAccounts = async () => {
  const { pday, pmonth, pyear, pdayYear, pdayMonth, pmonthYear } =
    getTarseedDates();

  try {
    const branches = await Branch.find({});
    Promise.all(
      branches.map(async (br: any) => {
        const branch = br.basename;

        const findoldedit = await Closing.find({
          isEdited: true,
          branch,
        }).sort({
          timeEdited: 1,
        });
        const edited: any =
          findoldedit && findoldedit.length > 0 ? findoldedit[0] : null;

        if (edited) {
          await calcEditedData({ branch, edited });
          await Closing.deleteMany({ isEdited: true, branch });
        } else {
          const yestardayClosing = await Closing.findOne({
            closingPeriod: periods.day,
            day: pday,
            month: pdayMonth,
            year: pdayYear,
            branch,
          });
          if (!yestardayClosing) {
            await calculateDay({
              branch,
              time: new Date(pdayYear, pdayMonth, pday),
            });
          }
          const lastMonthClosing = await Closing.findOne({
            closingPeriod: periods.month,
            month: pmonth,
            year: pmonthYear,
            branch,
          });
          if (!lastMonthClosing) {
            await calculateMonth({
              branch,
              time: new Date(pmonthYear, pmonth, 1),
            });
          }
          const lastYearClosing = await Closing.findOne({
            closingPeriod: periods.year,
            year: pyear,
            branch,
          });
          if (!lastYearClosing) {
            await calculatYear({
              branch,
              time: new Date(pyear, 1, 2),
            });
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const checkLastYearClosing = async () => {
  const pyear = getLastYear();
  try {
    const branches: any = await Branch.find({});

    for (const br of branches) {
      const branch = br.basename;
      const lastYearClosing = await Closing.findOne({
        closingPeriod: periods.year,
        year: pyear,
        branch,
      });
      if (!lastYearClosing) {
        await calculatYear({
          branch,
          time: new Date(pyear, 1, 2),
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateTodayRaseed = async ({ branch }: any) => {
  const time = new Date();
  const { pday, pdayMonth, pdayYear, start, end } = getTarseedDay(time);
  const accounts = await Account.find({ branch });
  const data = await Promise.all(
    accounts.map(async (acc: any) => {
      const {
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      } = await tarseedHesab({
        account: acc,
        start,
        end,
        period: periods.day,
        pday,
        pdayMonth,
        pdayYear,
        branch,
      });
      return {
        accId: acc._id,
        accCode: acc.code,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accType: acc.accType,
        parent: acc.parent,
        parentAr: acc.parentAr,
        parentcode: acc.parentcode,
        closedAcc: acc.closedAcc,
        startBalance,
        startBalanceType,
        periodBalance,
        periodBalanceType,
        endBalance,
        endBalanceType,
      };
    })
  );

  return data;
};

const getDaysOfMonthRassed = async ({ month, year }: any) =>
  Closing.find({ month, year, closingPeriod: "day" });

const getMonthsOfYearRassed = async ({ year }: any) =>
  Closing.find({ year, closingPeriod: "month" });
const getYearsRassed = async () => Closing.find({ closingPeriod: "year" });

export const getAllRasseds = async (branch: any) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const today = await calculateTodayRaseed({ branch });
  const days = await getDaysOfMonthRassed({ month, year });
  const months = await getMonthsOfYearRassed({ year });
  const years = await getYearsRassed();
  return { today, days, months, years };
};

export const getAccountsBalance = ({ raseeds, accs, lastYearClosing }: any) => {
  const raseedsData: any = {};

  const closing = lastYearClosing?.data;
  const accounts = raseeds.map((acc: any) => {
    const code = acc._id.code;

    const acct = accs.filter((ac: any) => ac.code === code);
    const account = acct?.[0];

    return {
      ...acc,
      amount:
        account.accType === accountType.CREDIT
          ? acc.credit - acc.debit
          : acc.debit - acc.credit,
      code: acc._id.code,
      ...account,
    };
  });

  accounts.map((accinfo: any) => {
    if (accinfo.code === 1000) {
      raseedsData.cash = accinfo.amount;
    }
    if (accinfo.code === 1010) {
      raseedsData.card = accinfo.amount;
    }
    if (accinfo.code === 1020) {
      raseedsData.bank = accinfo.amount;
    }
    if (accinfo.code === 4000) {
      raseedsData.income = accinfo.amount;
    }
    if (accinfo.code === 2800) {
      raseedsData.partner = accinfo.amount;
    }
    if (accinfo.code === 5100) {
      raseedsData.discount = accinfo.amount;
    }
  });
  if (closing && closing.length > 0) {
    closing.map((cl: any) => {
      if (cl.accCode === 1000) {
        raseedsData.cash = raseedsData.cash + cl.endBalance;
      }
      if (cl.accCode === 1010) {
        raseedsData.card = raseedsData.card + cl.endBalance;
      }
      if (cl.accCode === 1020) {
        raseedsData.bank = raseedsData.bank + cl.endBalance;
      }
      if (cl.accCode === 4000) {
        raseedsData.income = raseedsData.income + cl.endBalance;
      }
      if (cl.accCode === 2800) {
        raseedsData.partner = raseedsData.partner + cl.endBalance;
      }
      if (cl.accCode === 5100) {
        raseedsData.discount = raseedsData.discount + cl.endBalance;
      }
    });
  }

  return raseedsData;
};
