import {
  Customer,
  Department,
  Employee,
  Item,
  Listitem,
  Operation,
} from "../../models";
import { autoNoTypes, itemTypes, operationTypes } from "../../constant";
import { getAutoNo, getSendTime } from "./helper";
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
  const { startDate, endDate, taskId, employeeId, departmentId, customerId } =
    event;
  try {
    for (const action of actions) {
      const {
        type,
        phone,
        email,
        userId,
        body,
        timeunit,
        timerelate,
        qty,
        address,
        index,
      } = action;
      const sendtime = getSendTime({
        startDate,
        endDate,
        timeunit,
        timerelate,
        qty,
      });
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
        taskId,
        employeeId,
        departmentId,
        customerId,
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
  if (partialValue === 0 || totalValue === 0) return 0;
  return (100 * partialValue) / totalValue;
}

export const onTaskOperationUpdate = async (taskId: any) => {
  const opersations = await Operation.find({ taskId });
  const opsdata: any = _.groupBy(opersations, "opType");
  const task = await Task.findOne({ id: taskId });

  if (opersations && opersations.length > 0) {
    const evs = opsdata?.[operationTypes.event];
    if (evs?.length > 0) {
      const sortedEvents = _.sortBy(
        opsdata?.[operationTypes.event],
        "startDate"
      );
      const start = sortedEvents[0].startDate;
      start.setHours(0, 0, 0, 0);
      const end = sortedEvents[sortedEvents.length - 1].endDate;
      end.setHours(23, 59, 59, 999);
      const amount = _.sumBy(sortedEvents, "amount");
      const evDone = sortedEvents.filter((se: any) => se.status === 10)?.length;
      const evQty = sortedEvents.length;
      const progress = percentage(evDone, evQty);
      const status = evDone === evQty ? 10 : 2;
      task.start = start;
      task.end = end;
      task.evDone = evDone;
      task.evQty = evQty;
      task.progress = parseInt(`${progress}`);
      task.amount = amount ? amount : 0;
      task.status = status;
      if (evDone === evQty) {
        task.status = 10;
      }
    } else {
      task.evDone = 0;
      task.evQty = 0;
      task.progress = 0;
      task.amount = 0;
    }
    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalDiscount = _.sumBy(
      opsdata?.[operationTypes.customerDiscount],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");
    task.totalinvoiced = totalinvoiced;
    task.totalDiscount = totalDiscount;
    task.totalpaid = totalpaid;
    task.toatlExpenses = toatlExpenses;
    await task.save();
  } else {
    task.evDone = 0;
    task.evQty = 0;
    task.progress = 0;
    task.amount = 0;
    task.totalinvoiced = 0;
    task.totalDiscount = 0;
    task.totalpaid = 0;
    task.toatlExpenses = 0;
    await task.save();
  }
};
export const onCustomerOperationUpdate = async (customerId: any) => {
  const opersations = await Operation.find({ customerId });
  const opsdata: any = _.groupBy(opersations, "opType");
  const customer = await Customer.findById(customerId);

  if (opersations && opersations.length > 0) {
    const evs = opsdata?.[operationTypes.event];
    if (evs?.length > 0) {
      const amount = _.sumBy(evs, "amount");
      const evDone = evs.filter((se: any) => se.status === 10)?.length;
      const evQty = evs.length;
      const progress = percentage(evDone, evQty);
      customer.evDone = evDone;
      customer.evQty = evQty;
      customer.progress = parseInt(`${progress}`);
      customer.amount = amount ? amount : 0;
    } else {
      customer.evDone = 0;
      customer.evQty = 0;
      customer.progress = 0;
      customer.amount = 0;
    }
    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalDiscount = _.sumBy(
      opsdata?.[operationTypes.customerDiscount],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");

    customer.totalinvoiced = totalinvoiced;
    customer.totalDiscount = totalDiscount;
    customer.totalpaid = totalpaid;
    customer.toatlExpenses = toatlExpenses;
    await customer.save();
  } else {
    customer.amount = 0;
    customer.totalinvoiced = 0;
    customer.totalDiscount = 0;
    customer.totalpaid = 0;
    customer.toatlExpenses = 0;
    customer.evDone = 0;
    customer.evQty = 0;
    customer.progress = 0;
    await customer.save();
  }
};
export const onEmplyeeOperationUpdate = async (employeeId: any) => {
  const opersations = await Operation.find({ employeeId });
  const opsdata: any = _.groupBy(opersations, "opType");
  const employee = await Employee.findById(employeeId);

  if (opersations && opersations.length > 0) {
    const evs = opsdata?.[operationTypes.event];
    if (evs?.length > 0) {
      const amount = _.sumBy(evs, "amount");
      const evDone = evs.filter((se: any) => se.status === 10)?.length;
      const evQty = evs.length;
      const progress = percentage(evDone, evQty);
      employee.amount = amount ? amount : 0;
      employee.evDone = evDone;
      employee.evQty = evQty;
      employee.progress = parseInt(`${progress}`);
    } else {
      employee.evDone = 0;
      employee.evQty = 0;
      employee.progress = 0;
      employee.amount = 0;
    }
    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalDiscount = _.sumBy(
      opsdata?.[operationTypes.customerDiscount],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");
    employee.totalinvoiced = totalinvoiced;
    employee.totalDiscount = totalDiscount;
    employee.totalpaid = totalpaid;
    employee.toatlExpenses = toatlExpenses;
    await employee.save();
  } else {
    employee.amount = 0;
    employee.totalinvoiced = 0;
    employee.totalDiscount = 0;
    employee.totalpaid = 0;
    employee.toatlExpenses = 0;
    employee.evDone = 0;
    employee.evQty = 0;
    employee.progress = 0;
    await employee.save();
  }
};

export const onDepartmentOperationUpdate = async (departmentId: any) => {
  const opersations = await Operation.find({ departmentId });
  const opsdata: any = _.groupBy(opersations, "opType");
  const department = await Department.findById(departmentId);

  if (opersations && opersations.length > 0) {
    const evs = opsdata?.[operationTypes.event];
    if (evs?.length > 0) {
      const amount = _.sumBy(evs, "amount");
      const evDone = evs.filter((se: any) => se.status === 10)?.length;
      const evQty = evs.length;
      const progress = percentage(evDone, evQty);
      department.evDone = evDone;
      department.evQty = evQty;
      department.progress = parseInt(`${progress}`);
      department.amount = amount ? amount : 0;
    } else {
      department.evDone = 0;
      department.evQty = 0;
      department.progress = 0;
      department.amount = 0;
    }

    const totalinvoiced = _.sumBy(
      opsdata?.[operationTypes.salesInvoice],
      "amount"
    );
    const totalDiscount = _.sumBy(
      opsdata?.[operationTypes.customerDiscount],
      "amount"
    );
    const totalpaid = _.sumBy(
      opsdata?.[operationTypes.customerReceipt],
      "amount"
    );
    const toatlExpenses = _.sumBy(opsdata?.[operationTypes.expenses], "amount");
    department.totalinvoiced = totalinvoiced;
    department.totalDiscount = totalDiscount;
    department.totalpaid = totalpaid;
    department.toatlExpenses = toatlExpenses;

    await department.save();
  } else {
    department.amount = 0;
    department.totalinvoiced = 0;
    department.totalDiscount = 0;
    department.totalpaid = 0;
    department.toatlExpenses = 0;
    department.evDone = 0;
    department.evQty = 0;
    department.progress = 0;
    await department.save();
  }
};
