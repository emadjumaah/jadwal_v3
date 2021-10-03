import { Account, Closing, Kaid, Operation } from "../../models";

import { eventStatusShort, operationTypes } from "../../constant";
import {
  createOperation,
  deleteOperation,
  updateOperation,
  getAllRasseds,
  periods,
  objectFromList,
} from "../../common";
import {
  calculatYear,
  calculatYearFromNow,
  getAccountsBalance,
} from "../../common/accounts";
import { getStartThisYear } from "../../common/time";
import {
  createKaidsOperation,
  deleteKaidOperation,
  updateKaidOperation,
} from "../../common/operation/operations";

export const getFinances = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  const { start, end, ...rest } = payload;
  const opTypes = [
    // operationTypes.customerReceipt,
    operationTypes.deposet,
    operationTypes.ownerDeposit,
    operationTypes.ownerDraw,
  ];
  const ops = await Operation.find({
    branch,
    opType: { $in: opTypes },
    ...rest,
    time: end ? { $gte: start, $lte: end } : { $gte: start },
  }).sort({ time: -1 });

  if (ops) {
    return {
      ok: true,
      data: ops,
      message: "success",
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getGeneralFinances = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;
  const ops = await Operation.find({
    branch,
    opType: operationTypes.kaid,
    ...rest,
    time: end ? { $gte: start, $lte: end } : { $gte: start },
  }).sort({ time: -1 });

  if (ops) {
    return {
      ok: true,
      data: ops,
      message: "success",
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getReceipts = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  const { start, end, ...rest } = payload;
  let ops = null;
  if (start) {
    ops = await Operation.find({
      branch,
      opType: operationTypes.customerReceipt,
      ...rest,
      time: end ? { $gte: start, $lte: end } : { $gte: start },
    }).sort({ time: -1 });
  } else {
    ops = await Operation.find({
      branch,
      opType: operationTypes.customerReceipt,
      ...rest,
    }).sort({ time: -1 });
  }
  if (ops) {
    return {
      ok: true,
      data: ops,
      message: "success",
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getRasseds = async (req: any) => {
  const { user } = req;
  const { branch } = user;

  const data = await getAllRasseds(branch);

  if (data) {
    return {
      ok: true,
      data: data ? JSON.stringify(data) : null,
      message: "success",
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getSalesReport = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;

  const sales = await Kaid.find({
    branch,
    accPCode: 13,
    ...rest,
    opTime: end ? { $gte: start, $lte: end } : { $gte: start },
  }).sort({ opTime: -1 });

  const totalamount = await Kaid.aggregate([
    {
      $match: {
        branch,
        accPCode: 13,
        ...rest,
        opTime: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (sales) {
    return {
      ok: true,
      data: sales,
      message: JSON.stringify(totalamount),
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getFinanceReport = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;

  const finance = await Kaid.find({
    branch,
    ...rest,
    opTime: end ? { $gte: start, $lte: end } : { $gte: start },
  }).sort({ opTime: -1 });

  const totalamount = await Kaid.aggregate([
    {
      $match: {
        branch,
        ...rest,
        opTime: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (finance) {
    return {
      ok: true,
      data: finance,
      message: JSON.stringify(totalamount),
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getSalesChartData = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;

  const department = await Kaid.aggregate([
    {
      $match: {
        branch,
        accPCode: 13,
        ...rest,
        opTime: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$opTime" },
          year: { $year: "$opTime" },
          department: "$departmentId",
        },
        debit: { $sum: "$debit" },
        credit: { $sum: "$credit" },
        count: { $sum: 1 },
      },
    },
    // {
    //   $group: {
    //     _id: "$employeeId",
    //     debit: { $sum: "$debit" },
    //     credit: { $sum: "$credit" },
    //     count: { $sum: 1 },
    //   },
    // },
    // {
    //   $group: {
    //     _id: {
    //       month: { $month: "$opTime" },
    //       day: { $dayOfMonth: "$opTime" },
    //       year: { $year: "$opTime" },
    //       department: "$departmentId",
    //       employee: "$employeeId",
    //     },
    //     debit: { $sum: "$debit" },
    //     credit: { $sum: "$credit" },
    //     count: { $sum: 1 },
    //   },
    // },
  ]);
  const employee = await Kaid.aggregate([
    {
      $match: {
        branch,
        accPCode: 13,
        ...rest,
        opTime: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$opTime" },
          year: { $year: "$opTime" },
          employee: "$employeeId",
        },
        debit: { $sum: "$debit" },
        credit: { $sum: "$credit" },
        count: { $sum: 1 },
      },
    },
  ]);
  const sales = await Kaid.aggregate([
    {
      $match: {
        branch,
        accPCode: 13,
        ...rest,
        opTime: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$opTime" },
          year: { $year: "$opTime" },
        },
        debit: { $sum: "$debit" },
        credit: { $sum: "$credit" },
        count: { $sum: 1 },
      },
    },
  ]);

  const data = JSON.stringify({ department, employee, sales });

  if (data) {
    return {
      ok: true,
      data,
      message: "",
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getMonthlyReport = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const {
    accPCode,
    itemType,
    accountIds,
    serviceIds,
    categoryIds,
    departmentIds,
    employeeIds,
    customerIds,
    supplierIds,
    taskIds,
    start,
    end,
  } = payload;

  const options: any = {
    branch,
    opTime: { $gte: new Date(start), $lte: new Date(end) },
  };
  if (accPCode) {
    options.accPCode = accPCode;
  }
  if (itemType) {
    options.itemType = itemType;
  }
  if (accountIds) {
    options.accId = { $in: accountIds };
  }
  if (serviceIds) {
    options.itemId = { $in: serviceIds };
  }
  if (categoryIds) {
    options.categoryId = { $in: categoryIds };
  }
  if (departmentIds) {
    options.departmentId = { $in: departmentIds };
  }
  if (employeeIds) {
    options.employeeId = { $in: employeeIds };
  }
  if (customerIds) {
    options.customerId = { $in: customerIds };
  }
  if (supplierIds) {
    options.supplierId = { $in: supplierIds };
  }
  if (taskIds) {
    options.taskId = { $in: taskIds };
  }

  const sales = await Kaid.find(options).sort({ opTime: -1 });
  let message;
  if (accountIds && accountIds.length > 0) {
    const accId = accountIds[0];
    const amount = await calculatYearFromNow({
      branch,
      end: new Date(start),
      accId,
    });
    message = amount;
  }
  if (sales) {
    return {
      ok: true,
      data: sales,
      message,
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const createFinance = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const data = {
    branch,
    ...payload,
    withKaid: true,
  };
  try {
    await createOperation(data);
    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};
export const createGeneralFinance = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const data = {
    branch,
    ...payload,
    withKaid: true,
  };
  try {
    await createKaidsOperation(data);
    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateGeneralFinance = async (payload: any) => {
  const { _id } = payload;
  try {
    const op: any = await Operation.findById(_id);
    if (!op) {
      return {
        ok: false,
        message: "Error updateFinance",
        error: "Not Found",
      };
    }
    await updateKaidOperation(payload);
    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log("ERROR updateFinance");
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateFinance = async (payload: any) => {
  const { _id } = payload;
  try {
    const op: any = await Operation.findById(_id);
    if (!op) {
      return {
        ok: false,
        message: "Error updateFinance",
        error: "Not Found",
      };
    }
    await updateOperation(payload);
    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log("ERROR updateFinance");
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const deleteFinance = async (payload: any) => {
  const { _id } = payload;
  try {
    await deleteOperation(_id);
    return {
      ok: true,
      message: "deleteItem",
    };
  } catch (error) {
    console.log("ERROR deleteItem");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteItem",
      error,
    };
  }
};
export const deleteGeneralFinance = async (payload: any) => {
  const { _id } = payload;
  try {
    await deleteKaidOperation(_id);
    return {
      ok: true,
      message: "deleteItem",
    };
  } catch (error) {
    console.log("ERROR deleteItem");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteItem",
      error,
    };
  }
};

export const getTodaySales = async (req: any) => {
  const { user } = req;
  const { branch } = user;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  try {
    const sales = await Kaid.find({
      branch,
      accPCode: 13,
      opTime: { $gte: start },
    }).sort({ opTime: -1 });
    if (sales) {
      return {
        ok: true,
        data: sales,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getTodayEvents = async (req: any) => {
  const { user } = req;
  const { branch } = user;

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const events = await Operation.find({
      branch,
      opType: operationTypes.event,
      startDate: { $gte: start, $lte: end },
    }).sort({ startDate: -1 });
    if (events) {
      return {
        ok: true,
        data: events,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getDaysSales = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { qty } = payload;
  const days = qty ? qty : 15;
  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  const end = new Date();

  try {
    const salesData = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          opTime: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: { date: "$opTime", timezone: "+03:00" } },
            month: { $month: { date: "$opTime", timezone: "+03:00" } },
            year: { $year: { date: "$opTime", timezone: "+03:00" } },
            // department: "$departmentId",
            // employee: "$employeeId",
          },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
          count: { $sum: 1 },
          // departmentId: { $last: "$departmentId" },
          // departmentName: { $last: "$departmentName" },
          // departmentNameAr: { $last: "$departmentNameAr" },
          // departmenColor: { $last: "$departmenColor" },
          // employeeId: { $last: "$employeeId" },
          // employeeName: { $last: "$employeeName" },
          // employeeNameAr: { $last: "$employeeNameAr" },
          // employeeColor: { $last: "$employeeColor" },
        },
      },
    ]);

    const sales = salesData.map((sdo: any) => {
      const { _id, debit, credit, ...rest } = sdo;
      const { day, month, year, department, employee } = _id;
      return {
        ...rest,
        day,
        month,
        year,
        amount: credit - debit,
        date: new Date(year, month - 1, day),
        _id: `${day}-${month}-${year}`,
      };
    });
    if (sales) {
      return {
        ok: true,
        data: sales,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getDaysEvents = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { qty } = payload;
  const stats = objectFromList(eventStatusShort);
  const days = qty ? qty : 7;

  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setDate(end.getDate() + days);
  end.setHours(23, 59, 59, 999);

  try {
    const eventsData = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: { date: "$startDate", timezone: "+03:00" } },
            month: { $month: { date: "$startDate", timezone: "+03:00" } },
            year: { $year: { date: "$startDate", timezone: "+03:00" } },
            // department: "$departmentId",
            // employee: "$employeeId",
            status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
          status: { $last: "$status" },
          // departmentId: { $last: "$departmentId" },
          // departmentName: { $last: "$departmentName" },
          // departmentNameAr: { $last: "$departmentNameAr" },
          // departmenColor: { $last: "$departmenColor" },
          // employeeId: { $last: "$employeeId" },
          // employeeName: { $last: "$employeeName" },
          // employeeNameAr: { $last: "$employeeNameAr" },
          // employeeColor: { $last: "$employeeColor" },
        },
      },
    ]);

    const events = eventsData.map((sdo: any) => {
      const { _id, ...rest } = sdo;
      const { day, month, year, department, employee, status } = _id;
      return {
        ...rest,
        day,
        month,
        year,
        date: new Date(year, month - 1, day),
        status,
        statusAr: stats?.[`${status}`]?.nameAr,
        statusEn: stats?.[`${status}`]?.name,
        _id: `${status}-${day}-${month}-${year}`,
      };
    });
    if (events) {
      return {
        ok: true,
        data: events,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getMonthsSales = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { qty } = payload;
  const n = qty ? qty : 6;
  const time = new Date();
  time.setMonth(time.getMonth() - n);
  const start = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date();

  try {
    const salesData = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          opTime: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { date: "$opTime", timezone: "+03:00" } },
            year: { $year: { date: "$opTime", timezone: "+03:00" } },
            department: "$departmentId",
            employee: "$employeeId",
          },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
          count: { $sum: 1 },
          departmentId: { $last: "$departmentId" },
          departmentName: { $last: "$departmentName" },
          departmentNameAr: { $last: "$departmentNameAr" },
          departmenColor: { $last: "$departmenColor" },
          employeeId: { $last: "$employeeId" },
          employeeName: { $last: "$employeeName" },
          employeeNameAr: { $last: "$employeeNameAr" },
          employeeColor: { $last: "$employeeColor" },
        },
      },
    ]);

    const sales = salesData.map((sdo: any) => {
      const { _id, debit, credit, ...rest } = sdo;
      const { month, year, department, employee } = _id;
      return {
        ...rest,
        month,
        year,
        amount: credit - debit,
        date: new Date(year, month - 1),
        _id: `${department}-${employee}-${month}-${year}`,
      };
    });
    if (sales) {
      return {
        ok: true,
        data: sales,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getMonthsEvents = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { qty } = payload;
  const n = qty ? qty : 6;
  const stats = objectFromList(eventStatusShort);

  const time = new Date();
  time.setMonth(time.getMonth() - n);
  const start = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date();

  try {
    const eventsData = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$startDate" },
            year: { $year: "$startDate" },
            department: "$departmentId",
            employee: "$employeeId",
            status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
          departmentId: { $last: "$departmentId" },
          departmentName: { $last: "$departmentName" },
          departmentNameAr: { $last: "$departmentNameAr" },
          departmenColor: { $last: "$departmenColor" },
          employeeId: { $last: "$employeeId" },
          employeeName: { $last: "$employeeName" },
          employeeNameAr: { $last: "$employeeNameAr" },
          employeeColor: { $last: "$employeeColor" },
          status: { $last: "$status" },
        },
      },
    ]);

    const events = eventsData.map((sdo: any) => {
      const { _id, ...rest } = sdo;
      const { month, year, department, employee, status } = _id;
      return {
        ...rest,
        month,
        year,
        date: new Date(year, month - 1, 1, 10),
        statusAr: stats?.[`${status}`]?.nameAr,
        statusEn: stats?.[`${status}`]?.name,
        _id: `${department}-${employee}-${status}-${month}-${year}`,
      };
    });
    if (events) {
      return {
        ok: true,
        data: events,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};

export const getAccountsRaseed = async (req: any) => {
  const { user } = req;
  const { branch } = user;
  const { startThisYear, pyear } = getStartThisYear();

  try {
    const accs = await Account.find({
      code: { $in: [1000, 1010, 1020, 4000, 2800, 5100] },
    });
    const raseeds = await Kaid.aggregate([
      {
        $match: {
          branch,
          accCode: { $in: [1000, 1010, 1020, 4000, 2800, 5100] },
          opTime: { $gte: startThisYear },
        },
      },
      {
        $group: {
          _id: { code: "$accCode" },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
        },
      },
    ]);

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

    const accounts = getAccountsBalance({ raseeds, accs, lastYearClosing });
    if (accounts) {
      return {
        ok: true,
        data: JSON.stringify(accounts),
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
const accountsRaseed = async ({ branch }: any) => {
  const { startThisYear, pyear } = getStartThisYear();

  try {
    const accs = await Account.find({
      code: { $in: [1000, 1010, 1020, 4000, 2800, 5100] },
    });
    const raseeds = await Kaid.aggregate([
      {
        $match: {
          branch,
          accCode: { $in: [1000, 1010, 1020, 4000, 2800, 5100] },
          opTime: { $gte: startThisYear, $lte: new Date() },
        },
      },
      {
        $group: {
          _id: { code: "$accCode" },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
        },
      },
    ]);

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

    const accounts = getAccountsBalance({ raseeds, accs, lastYearClosing });
    return accounts ? accounts : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const todaySales = async ({ branch }: any) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  try {
    const sales = await Kaid.find({
      branch,
      accPCode: 13,
      opTime: { $gte: start, $lte: end },
    }).sort({ opTime: -1 });
    return sales ? sales : null;
  } catch (error) {
    return null;
  }
};
const todayEvents = async ({ branch }: any) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  try {
    const events = await Operation.find({
      branch,
      opType: operationTypes.event,
      startDate: { $gte: start, $lte: end },
    }).sort({ startDate: -1 });
    return events ? events : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const daysSales = async ({ branch, qty }: any) => {
  const days = qty ? qty : 15;
  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  const end = new Date();

  try {
    const salesData = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          opTime: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: { date: "$opTime", timezone: "+03:00" } },
            month: { $month: { date: "$opTime", timezone: "+03:00" } },
            year: { $year: { date: "$opTime", timezone: "+03:00" } },
          },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
          count: { $sum: 1 },
        },
      },
    ]);

    const sales = salesData.map((sdo: any) => {
      const { _id, debit, credit, ...rest } = sdo;
      const { day, month, year } = _id;
      return {
        ...rest,
        day,
        month,
        year,
        amount: credit - debit,
        date: new Date(year, month - 1, day),
        _id: `${day}-${month}-${year}`,
      };
    });

    return sales ? sales : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const daysEvents = async ({ branch, qty }: any) => {
  const stats = objectFromList(eventStatusShort);
  const days = qty ? qty : 8;

  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setDate(end.getDate() + days);
  end.setHours(23, 59, 59, 999);

  try {
    const eventsData = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: { date: "$startDate", timezone: "+03:00" } },
            month: { $month: { date: "$startDate", timezone: "+03:00" } },
            year: { $year: { date: "$startDate", timezone: "+03:00" } },
            status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
          status: { $last: "$status" },
        },
      },
    ]);

    const events = eventsData.map((sdo: any) => {
      const { _id, ...rest } = sdo;
      const { day, month, year, status } = _id;
      return {
        ...rest,
        day,
        month,
        year,
        date: new Date(year, month - 1, day),
        status,
        statusAr: stats?.[status]?.nameAr,
        statusEn: stats?.[status]?.name,
        _id: `${status}-${day}-${month}-${year}`,
      };
    });
    return events ? events : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const monthsSales = async ({ branch, qty }: any) => {
  const n = qty ? qty : 6;

  const old = new Date();
  old.setDate(1);
  old.setMonth(old.getMonth() - n);
  const y = old.getFullYear();
  const m = old.getMonth();
  const start = new Date(y, m, 1, 0, 0, 0, 0);

  const now = new Date();
  now.setDate(1);
  const thisy = now.getFullYear();
  const thism = now.getMonth();
  const end = new Date(thisy, thism + 1, 0, 23, 59, 59, 999);

  try {
    const salesData = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          opTime: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { date: "$opTime", timezone: "+03:00" } },
            year: { $year: { date: "$opTime", timezone: "+03:00" } },
            department: "$departmentId",
            employee: "$employeeId",
          },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
          count: { $sum: 1 },
          departmentId: { $last: "$departmentId" },
          departmentName: { $last: "$departmentName" },
          departmentNameAr: { $last: "$departmentNameAr" },
          departmenColor: { $last: "$departmenColor" },
          employeeId: { $last: "$employeeId" },
          employeeName: { $last: "$employeeName" },
          employeeNameAr: { $last: "$employeeNameAr" },
          employeeColor: { $last: "$employeeColor" },
        },
      },
    ]);

    const sales = salesData.map((sdo: any) => {
      const { _id, debit, credit, ...rest } = sdo;
      const { month, year, department, employee } = _id;
      return {
        ...rest,
        month,
        year,
        amount: credit - debit,
        date: new Date(year, month - 1),
        _id: `${department}-${employee}-${month}-${year}`,
      };
    });
    return sales ? sales : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const monthsEvents = async ({ branch, qty }: any) => {
  const n = qty ? qty : 6;
  const stats = objectFromList(eventStatusShort);

  const old = new Date();
  old.setDate(1);
  old.setMonth(old.getMonth() - n);
  const y = old.getFullYear();
  const m = old.getMonth();
  const start = new Date(y, m, 1, 0, 0, 0, 0);

  const now = new Date();
  now.setDate(1);
  const thisy = now.getFullYear();
  const thism = now.getMonth();
  const end = new Date(thisy, thism + 1, 0, 23, 59, 59, 999);

  try {
    const eventsData = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { date: "$startDate", timezone: "+03:00" } },
            year: { $year: { date: "$startDate", timezone: "+03:00" } },
            status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
          status: { $last: "$status" },
        },
      },
    ]);

    const events = eventsData.map((sdo: any) => {
      const { _id, ...rest } = sdo;
      const { month, year, status } = _id;
      return {
        ...rest,
        month,
        year,
        date: new Date(year, month - 1),
        statusAr: stats?.[`${status}`]?.nameAr,
        statusEn: stats?.[`${status}`]?.name,
        _id: `${status}-${month}-${year}`,
      };
    });
    return events ? events : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLandingChartData = async (req: any) => {
  const { user } = req;
  const { branch } = user;

  try {
    const accounts = await accountsRaseed({ branch });
    const todayS = await todaySales({ branch });
    const todayE = await todayEvents({ branch });
    const daysS = await daysSales({ branch });
    const daysE = await daysEvents({ branch });
    const monthsS = await monthsSales({ branch });
    const monthsE = await monthsEvents({ branch });

    const data = {
      accounts,
      todaySalesData: todayS,
      todayEventsData: todayE,
      daysSales: daysS,
      daysEvents: daysE,
      monthsSales: monthsS,
      monthsEvents: monthsE,
    };
    if (data) {
      return {
        ok: true,
        data: JSON.stringify(data),
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "error",
        error: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
