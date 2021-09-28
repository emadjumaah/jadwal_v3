import { Account, Kaid } from "../../models";
import { actionType, operationTypes } from "../../constant";
import { uuidv4 } from "../time";

export const createOperationKaid = async (operation: any) => {
  const { debitAcc, creditAcc, amount } = operation;
  const data = [
    {
      account: debitAcc,
      amount,
      type: actionType.DEBIT,
      opaccount: creditAcc,
    },
    {
      account: creditAcc,
      amount,
      type: actionType.CREDIT,
      opaccount: debitAcc,
    },
  ];
  const opId = operation._id;
  const {
    branch,
    opType,
    time,
    docNo,
    customerId,
    customerName,
    customerNameAr,
    supplierId,
    supplierName,
    supplierNameAr,
    departmentId,
    departmentName,
    departmentNameAr,
    employeeId,
    employeeName,
    employeeNameAr,
    year,
    month,
    day,
    refNo,
    refType,
    taskId,
    eventId,
    desc,
  } = operation;
  const shareId = uuidv4();
  await Promise.all(
    data.map(async (da: any) => {
      const { account, amount, opaccount, type } = da;
      const acc: any = await Account.findOne({ code: account, branch });
      const opacc: any = await Account.findOne({ code: opaccount, branch });
      await Kaid.create({
        branch,
        shareId,
        opId,
        opType,
        accId: acc._id,
        accCode: acc.code,
        accType: acc.accType,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accPCode: acc.parentcode,
        opaccId: opacc._id,
        opaccCode: opacc.code,
        opaccType: opacc.accType,
        opaccName: opacc.name,
        opaccNameAr: opacc.nameAr,
        opaccPCode: opacc.parentcode,
        debit: type === actionType.DEBIT ? amount : undefined,
        credit: type === actionType.CREDIT ? amount : undefined,
        kaidType: type,
        amount,
        opTime: time,
        opDocNo: docNo,
        customerId,
        customerName,
        customerNameAr,
        supplierId,
        supplierName,
        supplierNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        employeeId,
        employeeName,
        employeeNameAr,
        year,
        month,
        day,
        refNo,
        refType,
        taskId,
        eventId,
        desc,
      });
    })
  );
};
export const createKaid = async (operation: any, kaiddata: any) => {
  const { debitAcc, creditAcc, amount, desc } = kaiddata;
  const data = [
    {
      account: debitAcc,
      amount,
      type: actionType.DEBIT,
      opaccount: creditAcc,
    },
    {
      account: creditAcc,
      amount,
      type: actionType.CREDIT,
      opaccount: debitAcc,
    },
  ];
  const opId = operation._id;
  const {
    branch,
    opType,
    time,
    docNo,
    customerId,
    customerName,
    customerNameAr,
    supplierId,
    supplierName,
    supplierNameAr,
    departmentId,
    departmentName,
    departmentNameAr,
    employeeId,
    employeeName,
    employeeNameAr,
    year,
    month,
    day,
    refNo,
    refType,
  } = operation;
  const shareId = uuidv4();
  await Promise.all(
    data.map(async (da: any) => {
      const { account, amount, opaccount, type } = da;
      const acc: any = await Account.findOne({ code: account, branch });
      const opacc: any = await Account.findOne({ code: opaccount, branch });
      await Kaid.create({
        branch,
        shareId,
        opId,
        opType,
        accId: acc._id,
        accCode: acc.code,
        accType: acc.accType,
        accName: acc.name,
        accNameAr: acc.nameAr,
        accPCode: acc.parentcode,
        opaccId: opacc._id,
        opaccCode: opacc.code,
        opaccType: opacc.accType,
        opaccName: opacc.name,
        opaccNameAr: opacc.nameAr,
        opaccPCode: opacc.parentcode,
        debit: type === actionType.DEBIT ? amount : undefined,
        credit: type === actionType.CREDIT ? amount : undefined,
        kaidType: type,
        amount,
        desc,
        opTime: time,
        opDocNo: docNo,
        customerId,
        customerName,
        customerNameAr,
        supplierId,
        supplierName,
        supplierNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        employeeId,
        employeeName,
        employeeNameAr,
        year,
        month,
        day,
        refNo,
        refType,
      });
    })
  );
};

export const createItemKaid = async ({ item, operation }: any) => {
  const {
    itemId,
    itemType,
    itemBarcode,
    itemName,
    itemNameAr,
    itemDesc,
    itemCost,
    itemPrice,
    qty,
    total,
    totalCost,
    categoryId,
    categoryName,
    categoryNameAr,
    departmentId,
    departmentName,
    departmentNameAr,
    employeeId,
    employeeName,
    employeeNameAr,
    opId,
    opType,
    opDocNo,
    taskId,
    eventId,
  } = item;
  const {
    branch,
    time,
    customerId,
    customerName,
    customerNameAr,
    supplierId,
    supplierName,
    supplierNameAr,
    creditAcc,
    debitAcc,
    withCost,
    year,
    month,
    day,
  } = operation;

  const amount = withCost
    ? opType === operationTypes.purchaseDelivery
      ? total
      : totalCost
    : total;

  const data = [
    {
      account: debitAcc,
      amount: amount,
      type: actionType.DEBIT,
      opaccount: creditAcc,
    },
    {
      account: creditAcc,
      amount: amount,
      type: actionType.CREDIT,
      opaccount: debitAcc,
    },
  ];

  const shareId = uuidv4();

  for (const da of data) {
    const { account, amount, opaccount, type } = da;
    const acc: any = await Account.findOne({ code: account, branch });
    const opacc: any = await Account.findOne({ code: opaccount, branch });
    await Kaid.create({
      branch,
      shareId,
      opId,
      opType,
      accId: acc._id,
      accCode: acc.code,
      accType: acc.accType,
      accName: acc.name,
      accNameAr: acc.nameAr,
      accPCode: acc.parentcode,
      opaccId: opacc._id,
      opaccCode: opacc.code,
      opaccType: opacc.accType,
      opaccName: opacc.name,
      opaccNameAr: opacc.nameAr,
      opaccPCode: opacc.parentcode,
      debit: type === actionType.DEBIT ? amount : undefined,
      credit: type === actionType.CREDIT ? amount : undefined,
      kaidType: type,
      amount,
      opTime: time,
      opDocNo,
      customerId,
      customerName,
      customerNameAr,
      supplierId,
      supplierName,
      supplierNameAr,
      departmentId,
      departmentName,
      departmentNameAr,
      employeeId,
      employeeName,
      employeeNameAr,
      categoryId,
      itemBarcode,
      categoryName,
      categoryNameAr,
      itemId,
      itemType,
      itemName,
      itemNameAr,
      itemDesc,
      qty,
      itemCost,
      itemPrice,
      year,
      month,
      day,
      taskId,
      eventId,
    });
  }
};
