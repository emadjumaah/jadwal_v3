import _ = require("lodash");
import { Kaid, Listitem, Operation, Sequence } from "../../models";
import { operationTypes } from "../../constant";
import {
  createOperation,
  updateOperation,
  deleteOperation,
  inforceConnections,
  inforceRefrences,
  inforceKaidsRefrences,
  addEditedToClosing,
} from "../../common";

export const getInvoices = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;
  const opType = operationTypes.salesInvoice;
  try {
    let ops = null;
    if (start) {
      ops = await Operation.find({
        branch,
        opType,
        ...rest,
        time: end ? { $gte: start, $lte: end } : { $gte: start },
      }).sort({ time: -1 });
    } else {
      ops = await Operation.find({
        branch,
        opType,
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
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error,
    };
  }
};
export const getInvoicesList = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { taskId, customerId, departmentId, employeeId } = payload;

  const opType = operationTypes.salesInvoice;

  const options: any = {
    branch,
    opType,
  };

  if (taskId) {
    options.taskId = taskId;
  }
  if (customerId) {
    options.customerId = customerId;
  }
  if (departmentId) {
    options.departmentId = departmentId;
  }
  if (employeeId) {
    options.employeeId = employeeId;
  }

  try {
    const ops = await Operation.find(options).sort({ time: -1 });
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
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error,
    };
  }
};
export const getOperationItems = async (payload: any) => {
  const { opId } = payload;
  const items = await Listitem.find({ opId });
  if (items) {
    return {
      ok: true,
      data: items,
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

export const getOperationKaids = async (payload: any) => {
  const { opId } = payload;
  const items = await Kaid.find({ opId });
  if (items) {
    return {
      ok: true,
      data: items,
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
export const checkDocNo = async ({ docName, docNo }: any) => {
  const doc: any = await Sequence.findById(docName);
  if (doc) {
    if (Number(docNo) > doc.sequenceValue) {
      return true;
    } else {
      return false;
    }
  }
  if (!doc && docNo) {
    await Sequence.findOneAndUpdate(
      { _id: docName },
      { $set: { sequenceValue: docNo } },
      { upsert: true, new: true }
    );
    return true;
  }
  return false;
};

export const createRelatedOperations = async ({ invop, data }: any) => {
  const {
    time,
    accounts,
    customer,
    total,
    discount,
    userId,
    paymentType,
    eventId,
    taskId,
    eventNo,
    branch,
  } = data;

  let disop: any;
  let recop: any;
  let evnt: any;

  const raccounts = accounts.filter((acc: any) => acc.amount > 0);

  for (const racc of raccounts) {
    const { type, creditAcc, debitAcc } = racc;
    if (racc.type === operationTypes.customerDiscount) {
      const discountdata = {
        branch,
        time,
        customer,
        discount,
        amount: discount,
        userId,
        opType: type,
        creditAcc,
        debitAcc,
        withKaid: true,
        eventNo,
        refNo: invop.docNo,
        refType: operationTypes.salesInvoice,
        taskId,
      };
      disop = await createOperation(discountdata);
    }
    if (racc.type === operationTypes.customerReceipt) {
      const reciptdata = {
        branch,
        time,
        customer,
        total,
        discount,
        amount: total - discount,
        paymentType,
        userId,
        opType: type,
        creditAcc,
        debitAcc,
        withKaid: true,
        eventNo,
        refNo: invop.docNo,
        refType: operationTypes.salesInvoice,
        taskId,
      };
      recop = await createOperation(reciptdata);
    }
  }

  if (eventId) {
    evnt = await Operation.findOne({ id: eventId });
  }
  await inforceConnections([invop, disop, recop, evnt]);
  await inforceRefrences({
    ref: invop,
    operations: [disop, recop, evnt],
  });
  await inforceKaidsRefrences({
    ref: invop,
    operations: [invop, disop, recop, evnt],
  });
};

export const createInvoice = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const {
    items,
    docNo,
    time,
    accounts,
    customer,
    department,
    employee,
    costAmount,
    total,
    discount,
    profit,
    isPaid,
    isCash,
    amountPaid,
    userId,
    paymentType,
    eventNo,
    taskId,
    eventId,
  } = payload;
  const data = { ...payload, branch };

  const isValidDocNo = await checkDocNo({ docName: "salesInvoice", docNo });

  if (!isValidDocNo) {
    return {
      ok: false,
      message: "Error, Documment No not valid",
      error: "Error, Documment No not valid",
    };
  }

  const salseAccount = accounts.filter(
    (acc: any) => acc.type === operationTypes.salesInvoice
  )?.[0];
  if (salseAccount) {
    const { type, creditAcc, debitAcc } = salseAccount;

    const invdata = {
      branch,
      docNo,
      time,
      items,
      customer,
      department,
      employee,
      costAmount,
      total,
      discount,
      profit,
      isPaid,
      isCash,
      amount: total,
      amountPaid,
      paymentType,
      userId,
      opType: type,
      creditAcc,
      debitAcc,
      withKaid: true,
      eventNo,
      eventId,
      taskId,
    };
    try {
      const invop = await createOperation(invdata);
      await createRelatedOperations({ invop, data });
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
  } else {
    return {
      ok: false,
      message: "No Acount Error",
      error: "No Acount Error",
    };
  }
};

export const updateInvoice = async (payload: any) => {
  const { total } = payload;
  const { _id, items, ...rest } = payload;

  try {
    const operation: any = await Operation.findById(_id);
    if (!operation) {
      return {
        ok: false,
        message: "Error updateInvoice",
        error: "Not Found",
      };
    }

    const { links, branch } = operation;
    const data = { ...payload, branch };
    const invoicedata = {
      _id,
      items,
      ...rest,
      amount: total,
    };

    const invop = await updateOperation(invoicedata);

    const linkedops = links.filter((ln: any) => ln !== _id);
    for (const id of linkedops) {
      const op: any = await Operation.findById(id);
      if (op && op.opType !== 80) {
        await deleteOperation(id);
      }
    }

    await createRelatedOperations({ invop, data });

    const timeEdited = payload.time
      ? payload.time < operation.time
        ? payload.time
        : operation.time
      : operation.time;
    addEditedToClosing({ time: timeEdited, branch });

    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log("ERROR updateInvoice");
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const deleteInvoice = async (payload: any) => {
  const { _id } = payload;
  try {
    const opr: any = await Operation.findById(_id);
    if (!opr) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    const links = opr.links;
    if (links?.length > 0) {
      for (const id of links) {
        const op: any = await Operation.findById(id);
        if (op && op.opType !== 80) {
          await deleteOperation(id);
        }
      }
    } else {
      await deleteOperation(_id);
    }
    addEditedToClosing({ time: opr.time, branch: opr.branch });
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
