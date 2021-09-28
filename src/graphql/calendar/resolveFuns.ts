import { Listitem, Operation } from "../../models";
import { autoNoPrefix, autoNoTypes, operationTypes } from "../../constant";
import { getAutoNo, getYMD } from "../../common";
import Task from "../../models/Task";
import {
  createEventActions,
  createEventListItems,
  createTaskListItems,
  onTaskOperationUpdate,
} from "../../common/operation/items";
import Action from "../../models/Action";
import { sendSMS, sendEmail, sendNotification } from "../../connect";
import Notification from "../../models/Notification";
import { decompressEvents } from "../../common/time";

export const getActions = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const acts = await Action.find({ branch, ...payload });
  if (acts) {
    return {
      ok: true,
      data: acts,
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
export const getNotifications = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const nots = await Notification.find({ branch, ...payload });
  if (nots) {
    return {
      ok: true,
      data: nots,
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

export const getTask = async (payload: any) => {
  const { taskId } = payload;
  const task = await Task.findOne({ id: taskId });
  if (task) {
    return {
      ok: true,
      data: task,
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
export const getTasks = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const tasks = await Task.find({ branch, ...payload });
  if (tasks) {
    return {
      ok: true,
      data: tasks,
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

export const getTaskEvents = async (payload: any) => {
  const { taskId } = payload;
  const events = await Operation.find({ opType: operationTypes.event, taskId });
  if (events) {
    return {
      ok: true,
      data: events,
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

export const getTaskItems = async (payload: any) => {
  const { taskId } = payload;
  const items = await Listitem.find({ taskId });
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

export const getEvents = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;
  const evns = await Operation.find({
    branch,
    opType: operationTypes.event,
    ...rest,
    startDate: { $gte: new Date(start), $lte: new Date(end) },
  });
  if (evns) {
    return {
      ok: true,
      data: evns,
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
export const getReminders = async (req: any) => {
  const { user } = req;
  const { branch } = user;
  const evns = await Operation.find({
    branch,
    opType: operationTypes.event,
    reminder: true,
  });
  if (evns) {
    return {
      ok: true,
      data: evns,
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

export const getEventsInfo = async (req: any) => {
  const { user } = req;
  const { branch } = user;

  const startDay = new Date();
  const endDay = new Date();

  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(23, 59, 59, 999);

  const today = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        startDate: { $gte: new Date(startDay), $lt: new Date(endDay) },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const before = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        startDate: { $lt: new Date(startDay) },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const after = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        startDate: { $gt: new Date(endDay) },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  return {
    ok: true,
    data: JSON.stringify({ today, before, after }),
  };
};

export const getReportEvents = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const {
    serviceIds,
    categoryIds,
    departmentIds,
    employeeIds,
    customerIds,
    supplierIds,
    taskIds,
    status,
    start,
    end,
  } = payload;

  const options: any = {
    branch,
    startDate: { $gte: new Date(start), $lte: new Date(end) },
  };

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
  if (status) {
    options.status = status;
  }

  const evns = await Operation.find(options).sort({ startDate: -1 });

  if (evns) {
    return {
      ok: true,
      data: evns,
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getReportDocuments = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const {
    types,
    serviceIds,
    categoryIds,
    departmentIds,
    employeeIds,
    customerIds,
    supplierIds,
    taskIds,
    status,
    start,
    end,
  } = payload;

  const options: any = {
    branch,
    time: { $gte: new Date(start), $lte: new Date(end) },
    opType: { $ne: operationTypes.kaid },
  };

  if (types) {
    options.opType = { $in: types };
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
  if (status) {
    options.status = status;
  }

  const evns = await Operation.find(options);

  if (evns) {
    return {
      ok: true,
      data: evns,
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getReportServices = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const {
    types,
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

  if (types) {
    options.opType = { $in: types };
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

  const items = await Listitem.find(options);

  if (items) {
    return {
      ok: true,
      data: items,
    };
  } else {
    return {
      ok: false,
      message: "error",
      error: "error",
    };
  }
};
export const getChartEvents = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;

  const department = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        ...rest,
        startDate: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$startDate" },
          year: { $year: "$startDate" },
          department: "$departmentId",
          status: "$status",
        },
        amount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);
  const employee = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        ...rest,
        startDate: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$startDate" },
          year: { $year: "$startDate" },
          employee: "$employeeId",
          status: "$status",
        },
        amount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const events = await Operation.aggregate([
    {
      $match: {
        branch,
        opType: operationTypes.event,
        ...rest,
        startDate: end
          ? { $gte: new Date(start), $lte: new Date(end) }
          : { $gte: new Date(start) },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$startDate" },
          year: { $year: "$startDate" },
          status: "$status",
        },
        amount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const data = { department, employee, events };

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
};

export const createTask = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  try {
    const autoNo = await getAutoNo(autoNoTypes.task);
    const autoTaskNo = await getAutoNo(autoNoTypes.task);
    const id = autoNo;
    const { customer, employee, department, events, docNo, prefix, ...rest } =
      payload;
    const documentNo = `${prefix ? prefix : autoNoPrefix.task}-${
      docNo ? docNo : autoTaskNo
    }`;

    const task = await Task.create({
      autoNo,
      docNo: documentNo,
      priority: 2,
      status: 1,
      id,
      branch,
      ...customer,
      ...employee,
      ...department,
      ...rest,
    });

    if (events) {
      const allevents = decompressEvents(events);
      for (const event of allevents) {
        await createEventForTask({ eventData: event, branch, taskId: id });
      }
      task.status = 2;
      await task.save();
    }

    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateTask = async (payload: any) => {
  const { id, items, ...rest } = payload;
  try {
    const tsk: any = await Task.findOne({ id });
    if (!tsk) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        tsk.departmentId = value.departmentId;
        tsk.departmentName = value.departmentName;
        tsk.departmentNameAr = value.departmentNameAr;
        tsk.departmentColor = value.departmentColor;
      } else if (key === "employee") {
        tsk.employeeId = value.employeeId;
        tsk.employeeName = value.employeeName;
        tsk.employeeNameAr = value.employeeNameAr;
        tsk.employeeColor = value.employeeColor;
        tsk.employeePhone = value.employeePhone;
      } else if (key === "customer") {
        tsk.customerId = value.customerId;
        tsk.customerName = value.customerName;
        tsk.customerNameAr = value.customerNameAr;
        tsk.customerPhone = value.customerPhone;
      } else {
        tsk[key] = value;
      }
    });

    if (items) {
      await Listitem.deleteMany({ taskId: id });
      const allitems = JSON.parse(items);
      await createTaskListItems({ items: allitems, task: tsk });
    }

    await tsk.save();
    return tsk;
  } catch (error) {
    console.log("ERROR updateEvent");
    console.log(error);
    return null;
  }
};

const hasRelatedTask = async (id: any) => {
  const relatedItems = await Operation.find({
    taskId: id,
    opType: { $ne: operationTypes.event },
  });
  if (relatedItems?.length > 0) {
    return true;
  }

  return false;
};

export const deleteTask = async (payload: any) => {
  const { id } = payload;
  try {
    const isRelated = await hasRelatedTask(id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const tsk: any = await Task.findOne({ id });
    if (!tsk) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await Action.deleteMany({ taskId: id });
      await Listitem.deleteMany({ taskId: id });
      await Operation.deleteMany({ opType: operationTypes.event, taskId: id });
      await tsk.deleteOne();
      return {
        ok: true,
        message: "deleteItem",
      };
    }
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

export const createEvent = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  try {
    const autoNo = await getAutoNo(autoNoTypes.operation);
    const autoEventNo = await getAutoNo(autoNoTypes.event);
    const id = autoNo;
    const {
      customer,
      items,
      actions,
      employee,
      department,
      docNo,
      prefix,
      ...rest
    } = payload;
    const documentNo = `${prefix ? prefix : autoNoPrefix.event}-${
      docNo ? docNo : autoEventNo
    }`;

    const { year, month, day } = getYMD(payload?.startDate);

    const event = await Operation.create({
      autoNo,
      docNo: documentNo,
      opType: operationTypes.event,
      allowDrag: true,
      priority: 2,
      status: 2,
      id,
      branch,
      year,
      month,
      day,
      ...customer,
      ...employee,
      ...department,
      ...rest,
    });
    if (items) {
      const allitems = JSON.parse(items);
      await createEventListItems({ items: allitems, event });
    }
    if (actions) {
      const allactions = JSON.parse(actions);
      if (allactions && allactions.length > 0) {
        await createEventActions({ actions: allactions, event });
      }
    }
    if (event.taskId) {
      await onTaskOperationUpdate(event.taskId);
    }

    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const createEventForTask = async ({
  eventData,
  branch,
  taskId,
}: any) => {
  try {
    const autoNo = await getAutoNo(autoNoTypes.operation);
    const autoEventNo = await getAutoNo(autoNoTypes.event);
    const id = autoNo;
    const {
      customer,
      items,
      actions,
      employee,
      department,
      docNo,
      prefix,
      ...rest
    } = eventData;
    const documentNo = `${prefix ? prefix : autoNoPrefix.event}-${
      docNo ? docNo : autoEventNo
    }`;

    const { year, month, day } = getYMD(eventData?.startDate);

    const event = await Operation.create({
      autoNo,
      docNo: documentNo,
      opType: operationTypes.event,
      allowDrag: true,
      priority: 2,
      status: 2,
      id,
      taskId,
      branch,
      year,
      month,
      day,
      ...customer,
      ...employee,
      ...department,
      ...rest,
    });
    if (items) {
      const allitems = JSON.parse(items);
      await createEventListItems({ items: allitems, event });
    }
    if (actions) {
      const allactions = JSON.parse(actions);
      if (allactions && allactions.length > 0) {
        await createEventActions({ actions: allactions, event });
      }
    }

    return {
      ok: true,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateEvent = async (payload: any) => {
  const { id, items, actions, ...rest } = payload;
  try {
    const evn: any = await Operation.findOne({ id });
    const oldTaskId = evn.taskId;
    if (!evn) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        evn.departmentId = value.departmentId;
        evn.departmentName = value.departmentName;
        evn.departmentNameAr = value.departmentNameAr;
        evn.departmentColor = value.departmentColor;
      } else if (key === "employee") {
        evn.employeeId = value.employeeId;
        evn.employeeName = value.employeeName;
        evn.employeeNameAr = value.employeeNameAr;
        evn.employeeColor = value.employeeColor;
        evn.employeePhone = value.employeePhone;
      } else if (key === "customer") {
        evn.customerId = value.customerId;
        evn.customerName = value.customerName;
        evn.customerNameAr = value.customerNameAr;
        evn.customerPhone = value.customerPhone;
      } else if (key === "item") {
        evn.itemId = value.itemId;
        evn.itemName = value.itemName;
        evn.itemNameAr = value.itemNameAr;
      } else {
        evn[key] = value;
      }
    });

    if (payload?.startDate) {
      const { year, month, day } = getYMD(payload?.startDate);
      evn.year = year;
      evn.month = month;
      evn.day = day;
    }
    if (items) {
      await Listitem.deleteMany({ eventId: id });
      const allitems = JSON.parse(items);
      await createEventListItems({ items: allitems, event: evn });
    }
    if (actions) {
      await Action.deleteMany({ eventId: id });
      const allactions = JSON.parse(actions);
      if (allactions && allactions.length > 0) {
        await createEventActions({ actions: allactions, event: evn });
      }
    }

    await evn.save();
    if (evn.taskId) {
      await onTaskOperationUpdate(evn.taskId);
      if (oldTaskId && oldTaskId !== evn.taskId) {
        await onTaskOperationUpdate(oldTaskId);
      }
    }
    return evn;
  } catch (error) {
    console.log("ERROR updateEvent");
    console.log(error);
    return null;
  }
};

export const deleteEvent = async (payload: any) => {
  const { id } = payload;
  try {
    const evn: any = await Operation.findOne({ id });
    const taskId = evn.taskId;
    if (!evn) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await Listitem.deleteMany({ eventId: id });
      await Action.deleteMany({ eventId: id });
      await evn.deleteOne();
      if (taskId) {
        await onTaskOperationUpdate(taskId);
      }
      return {
        ok: true,
        message: "deleteItem",
      };
    }
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
export const deleteEventById = async (payload: any) => {
  const { _id } = payload;
  try {
    const evn: any = await Operation.findById(_id);
    if (!evn) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await Listitem.deleteMany({ eventId: evn.id });
      await evn.deleteOne();
      if (evn.taskId) {
        await onTaskOperationUpdate(evn.taskId);
      }
      return {
        ok: true,
        message: "deleteItem",
      };
    }
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
export const deleteTaskById = async (payload: any) => {
  const { _id } = payload;
  try {
    const tsk: any = await Task.findById(_id);
    if (!tsk) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      const isRelated = await hasRelatedTask(tsk.id);
      if (isRelated === true) {
        return {
          ok: false,
          message: "Error",
          error: "Item has related",
        };
      }

      await Action.deleteMany({ taskId: tsk.id });
      await Listitem.deleteMany({ taskId: tsk.id });
      await Operation.deleteMany({
        opType: operationTypes.event,
        taskId: tsk.id,
      });
      await tsk.deleteOne();
      return {
        ok: true,
        message: "deleteItem",
      };
    }
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

export const createAction = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  try {
    const autoNo = await getAutoNo(autoNoTypes.action);
    const act = await Action.create({ autoNo, branch, ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(act),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateAction = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const act: any = await Action.findById(_id);
    if (!act) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      act[key] = value;
    });
    await act.save();
    return {
      ok: true,
      message: "ERROR updateAction",
      data: JSON.stringify(act),
    };
  } catch (error) {
    console.log("ERROR updateAction");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateAction",
      error,
    };
  }
};
export const deleteAction = async (payload: any) => {
  const { _id } = payload;

  try {
    const act: any = await Action.findById(_id);
    if (!act) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await act.deleteOne();
      return {
        ok: true,
        message: "Action Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteAction");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteAction",
      error,
    };
  }
};
export const createNotification = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  try {
    const autoNo = await getAutoNo(autoNoTypes.notification);
    const note = await Notification.create({ autoNo, branch, ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(note),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

export const updateNotification = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const note: any = await Notification.findById(_id);
    if (!note) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      note[key] = value;
    });
    await note.save();
    return {
      ok: true,
      message: "ERROR updateAction",
      data: JSON.stringify(note),
    };
  } catch (error) {
    console.log("ERROR updateAction");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateAction",
      error,
    };
  }
};
export const deleteNotification = async (payload: any) => {
  const { _id } = payload;

  try {
    const note: any = await Notification.findById(_id);
    if (!note) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await note.deleteOne();
      return {
        ok: true,
        message: "Action Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteAction");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteAction",
      error,
    };
  }
};

export const processActions = () => {
  const activeActions = Action.find({ active: true });
  const now = new Date();
  console.log("activeActions", activeActions);
  for (const aaction of activeActions) {
    const { type, sendtime, phone, email, userId, title, body } = aaction;
    const send = new Date(sendtime);
    if (send > now) {
      if (type === 1) {
        sendSMS({ mobile: phone, msg: body });
      } else if (aaction.type === 2) {
        sendEmail({ email, subject: title, text: body });
      } else if (aaction.type === 3) {
        sendNotification({ userId, title, body });
      }
      aaction.active = false;
      aaction.save();
    }
  }
};
