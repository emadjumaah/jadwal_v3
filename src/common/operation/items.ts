import { Item, Listitem, Operation } from "../../models";
import { autoNoTypes, itemTypes, operationTypes } from "../../constant";
import { getAutoNo } from "./helper";
import { createItemKaid, createOperationKaid } from "./kaids";
import _ from "lodash";
import Task from "../../models/Task";
import Action from "../../models/Action";

export const createListItems = async ({ items, operation, withKaid }: any) => {
  try {
    for (const item of items) {
      const {
        _id,
        itemType,
        barcode,
        name,
        nameAr,
        desc,
        descPurchase,
        size,
        weight,
        color,
        cost,
        unit,
        photo,
        itemprice,
        itemqty,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
        index,
      } = item;
      const autoNo = await getAutoNo(autoNoTypes.listitem);
      const docNo = autoNo;
      const invitem: any = await Listitem.create({
        autoNo,
        docNo,
        indx: index,
        itemId: _id,
        itemType,
        itemBarcode: barcode,
        itemName: name,
        itemNameAr: nameAr,
        itemDesc: desc,
        itemDescPurchase: descPurchase,
        itemSize: size,
        itemWeight: weight,
        itemColor: color,
        itemCost: cost,
        itemUnit: unit,
        itemPrice: itemprice,
        itemPhoto: photo,
        qty: itemqty,
        totalCost: cost ? cost * itemqty : 0,
        total: itemprice ? itemprice * itemqty : 0,
        amount: itemprice ? itemprice * itemqty : 0,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
        opId: operation._id,
        opType: operation.opType,
        opDocNo: operation.docNo,
        year: operation.year,
        month: operation.month,
        day: operation.day,
        branch: operation.branch,
        taskId: operation.taskId,
        eventId: operation.eventId,
        opTime: operation.time,

        customerId: operation.customerId,
        customerName: operation.customerName,
        customerNameAr: operation.customerNameAr,

        supplierId: operation.supplierId,
        supplierName: operation.supplierName,
        supplierNameAr: operation.supplierNameAr,
      });
      if (withKaid) {
        await createItemKaid({ item: invitem, operation });
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const createEventListItems = async ({ items, event }: any) => {
  try {
    for (const item of items) {
      const {
        _id,
        itemType,
        barcode,
        name,
        nameAr,
        desc,
        descPurchase,
        size,
        weight,
        color,
        cost,
        unit,
        photo,
        itemprice,
        itemqty,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
        index,
      } = item;
      const autoNo = await getAutoNo(autoNoTypes.listitem);
      const docNo = autoNo;
      await Listitem.create({
        autoNo,
        docNo,
        indx: index,
        itemId: _id,
        itemType,
        itemBarcode: barcode,
        itemName: name,
        itemNameAr: nameAr,
        itemDesc: desc,
        itemDescPurchase: descPurchase,
        itemSize: size,
        itemWeight: weight,
        itemColor: color,
        itemCost: cost,
        itemUnit: unit,
        itemPrice: itemprice,
        itemPhoto: photo,
        eventId: event.id,
        taskId: event.taskId,
        qty: itemqty,
        totalCost: cost ? cost * itemqty : 0,
        total: itemprice ? itemprice * itemqty : 0,
        amount: itemprice ? itemprice * itemqty : 0,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
        opId: event._id,
        opType: event.opType,
        opDocNo: event.docNo,
        year: event.year,
        month: event.month,
        day: event.day,
        branch: event.branch,
        opTime: event.startDate,

        customerId: event.customerId,
        customerName: event.customerName,
        customerNameAr: event.customerNameAr,

        supplierId: event.supplierId,
        supplierName: event.supplierName,
        supplierNameAr: event.supplierNameAr,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const createEventActions = async ({ actions, event }: any) => {
  try {
    for (const action of actions) {
      const {
        type,
        phone,
        email,
        userId,
        sendtime,
        body,
        timeunit,
        timerelate,
        qty,
        address,
        index,
      } = action;
      const autoNo = await getAutoNo(autoNoTypes.action);
      await Action.create({
        branch: event.branch,
        autoNo,
        indx: index,
        type,
        phone,
        email,
        userId,
        sendtime,
        body,
        timeunit,
        timerelate,
        qty,
        address,
        eventId: event.id,
        taskId: event.taskId,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const createTaskListItems = async ({ items, task }: any) => {
  try {
    for (const item of items) {
      const {
        _id,
        itemType,
        barcode,
        name,
        nameAr,
        desc,
        descPurchase,
        size,
        weight,
        color,
        cost,
        unit,
        photo,
        itemprice,
        itemqty,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
        index,
      } = item;
      const autoNo = await getAutoNo(autoNoTypes.listitem);
      const docNo = autoNo;
      await Listitem.create({
        autoNo,
        docNo,
        indx: index,
        itemId: _id,
        itemType,
        itemBarcode: barcode,
        itemName: name,
        itemNameAr: nameAr,
        itemDesc: desc,
        itemDescPurchase: descPurchase,
        itemSize: size,
        itemWeight: weight,
        itemColor: color,
        itemCost: cost,
        itemUnit: unit,
        itemPrice: itemprice,
        itemPhoto: photo,
        taskId: task.id,
        qty: itemqty,
        totalCost: cost ? cost * itemqty : 0,
        total: itemprice ? itemprice * itemqty : 0,
        amount: itemprice ? itemprice * itemqty : 0,
        categoryId,
        categoryName,
        categoryNameAr,
        departmentId,
        departmentName,
        departmentNameAr,
        departmentColor,
        employeeId,
        employeeName,
        employeeNameAr,
        employeePhone,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createOperationItems = async ({ operation, items }: any) => {
  const { withKaid } = operation;
  if (withKaid) {
    if (items) {
      const allitems = JSON.parse(items);
      await createListItems({
        items: allitems,
        operation,
        withKaid: true,
      });
    } else {
      await createOperationKaid(operation);
    }
  }
};

export const getOldOperationItems = async (opId: any) => {
  const litems = await Listitem.find({ opId });
  const itemids = litems.map((oi: any) => oi.itemId);
  const items = await Item.find({ _id: { $in: itemids } });
  return items;
};

function percentage(partialValue: any, totalValue: any) {
  return (100 * partialValue) / totalValue;
}

export const onTaskOperationUpdate = async (taskId: any) => {
  const opersations = await Operation.find({ taskId });
  const opsdata: any = _.groupBy(opersations, "opType");

  if (opersations && opersations.length > 0) {
    const sortedEvents = _.sortBy(opsdata?.[operationTypes.event], "startDate");
    const start = sortedEvents[0].startDate;
    const end = sortedEvents[sortedEvents.length - 1].endDate;
    const amount = _.sumBy(sortedEvents, "amount");
    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");
    const evDone = sortedEvents.filter((se: any) => se.status === 10)?.length;
    const evQty = sortedEvents.length;
    const progress = percentage(evDone, evQty);
    const status = evDone === evQty ? 10 : 2;
    const task = await Task.findOne({ id: taskId });
    task.start = start;
    task.end = end;
    task.evDone = evDone;
    task.evQty = evQty;
    task.progress = parseInt(`${progress}`);

    task.amount = amount;
    task.totalinvoiced = totalinvoiced;
    task.totalpaid = totalpaid;
    task.toatlExpenses = toatlExpenses;
    task.status = status;
    if (evDone === evQty) {
      task.status = 10;
    }
    await task.save();
  }
};
export const onTaskFinanceUpdate = async (taskId: any) => {
  const opersations = await Operation.find({ taskId });
  const opsdata: any = _.groupBy(opersations, "opType");

  if (opersations && opersations.length > 0) {
    const amount = _.sumBy(opsdata?.[operationTypes.event], "amount");
    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");

    const task = await Task.findOne({ id: taskId });
    task.amount = amount;
    task.totalinvoiced = totalinvoiced;
    task.totalpaid = totalpaid;
    task.toatlExpenses = toatlExpenses;
    await task.save();
  }
};
export const onTaskEventUpdate = async (taskId: any) => {
  const events = await Operation.find({ taskId, opType: operationTypes.event });

  if (events && events.length > 0) {
    const sortedEvents = _.sortBy(events, "startDate");
    const start = sortedEvents[0].startDate;
    const end = sortedEvents[sortedEvents.length - 1].endDate;
    const evDone = sortedEvents.filter((se: any) => se.status === 10)?.length;
    const evQty = sortedEvents.length;
    const progress = percentage(evDone, evQty);

    const task = await Task.findOne({ id: taskId });
    task.start = start;
    task.end = end;
    task.evDone = evDone;
    task.evQty = evQty;
    task.progress = parseInt(`${progress}`);
    if (evDone === evQty) {
      task.status = 10;
    }
    await task.save();
  }
};
// export const onTaskFinanceUpdate = async (id: any) => {
//   const task = await Task.findOne({ id });

//   const sales = await Operation.find({
//     opType: operationTypes.salesInvoice,
//     taskId: id,
//   });
//   const recipts = await Operation.find({
//     opType: operationTypes.customerReceipt,
//     taskId: id,
//   });
//   let totalinvoiced = 0;
//   let totalpaid = 0;
//   if (sales && sales.length > 0) {
//     totalinvoiced = _.sumBy(sales, "amount");
//   }
//   if (recipts && recipts.length > 0) {
//     totalpaid = _.sumBy(recipts, "amount");
//   }

//   task.totalinvoiced = totalinvoiced;
//   task.totalpaid = totalpaid;
//   await task.save();
// };
