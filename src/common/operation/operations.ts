import { autoNoPrefix, autoNoTypes } from "../../constant";
import { Kaid, Operation, Listitem } from "../../models";
import { getAutoNo, getNameOfDocument, setAutoNo } from "./helper";
import {
  createOperationItems,
  onCustomerOperationUpdate,
  onDepartmentOperationUpdate,
  onEmplyeeOperationUpdate,
  onTaskOperationUpdate,
} from "./items";
import { getYMD } from "./../time";
import { createKaid } from "./kaids";

export const createOperation = async (data: any) => {
  const {
    branch,
    customer,
    supplier,
    department,
    employee,
    docNo,
    opType,
    items,
    withKaid,
    taskId,
    ...rest
  } = data;
  const { year, month, day } = getYMD(data?.time);

  try {
    // numbering
    const autoNo = await getAutoNo(autoNoTypes.operation);
    const docname = getNameOfDocument(opType);
    const autoOpNo = await getAutoNo(docname);
    if (docNo) {
      await setAutoNo({ name: docname, value: docNo });
    }
    // @ts-ignore
    const documentNo = `${autoNoPrefix?.[docname]}-${docNo ? docNo : autoOpNo}`;

    const operation: any = await Operation.create({
      autoNo,
      docNo: documentNo,
      branch,
      opType,
      withKaid,
      year,
      month,
      day,
      taskId,
      ...customer,
      ...supplier,
      ...department,
      ...employee,
      ...branch,
      ...rest,
    });

    await createOperationItems({ operation, items });
    if (taskId) {
      await onTaskOperationUpdate(taskId);
    }
    if (operation.customerId) {
      await onCustomerOperationUpdate(operation.customerId);
    }
    if (operation.employeeId) {
      await onEmplyeeOperationUpdate(operation.employeeId);
    }
    if (operation.departmentId) {
      await onDepartmentOperationUpdate(operation.departmentId);
    }
    return operation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createKaidsOperation = async (data: any) => {
  const {
    branch,
    customer,
    supplier,
    department,
    employee,
    docNo,
    opType,
    items,
    withKaid,
    ...rest
  } = data;
  const { year, month, day } = getYMD(data?.time);

  try {
    // numbering
    const autoNo = await getAutoNo(autoNoTypes.operation);
    const docname = getNameOfDocument(opType);
    const autoOpNo = await getAutoNo(docname);
    if (docNo) {
      await setAutoNo({ name: docname, value: docNo });
    }
    // @ts-ignore
    const documentNo = `${autoNoPrefix?.[docname]}-${docNo ? docNo : autoOpNo}`;

    const operation: any = await Operation.create({
      autoNo,
      docNo: documentNo,
      branch,
      opType,
      withKaid,
      year,
      month,
      day,
      ...customer,
      ...supplier,
      ...department,
      ...employee,
      ...branch,
      ...rest,
    });

    if (items) {
      const allitems = JSON.parse(items);
      for (let itm of allitems) {
        await createKaid(operation, itm);
      }
    }
    return operation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateOperation = async (data: any) => {
  const { _id, items, ...rest } = data;

  try {
    const operation: any = await Operation.findById(_id);
    const oldTaskId = operation.taskId;
    const oldCustomerId = operation.customerId;
    const oldEmployeeId = operation.employeeId;
    const oldDepartmentId = operation.departmentId;
    if (!operation) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        operation.departmentId = value.departmentId;
        operation.departmentName = value.departmentName;
        operation.departmentNameAr = value.departmentNameAr;
        operation.departmentColor = value.departmentColor;
      } else if (key === "employee") {
        operation.employeeId = value.employeeId;
        operation.employeeName = value.employeeName;
        operation.employeeNameAr = value.employeeNameAr;
        operation.employeeColor = value.employeeColor;
        operation.employeePhone = value.employeePhone;
      } else if (key === "customer") {
        operation.customerId = value.customerId;
        operation.customerName = value.customerName;
        operation.customerNameAr = value.customerNameAr;
        operation.customerPhone = value.customerPhone;
      } else if (key === "supplier") {
        operation.supplierId = value.supplierId;
        operation.supplierName = value.supplierName;
        operation.supplierNameAr = value.supplierNameAr;
        operation.supplierPhone = value.supplierPhone;
      } else {
        operation[key] = value;
      }
    });

    if (data?.time) {
      const { year, month, day } = getYMD(data?.time);
      operation.year = year;
      operation.month = month;
      operation.day = day;
    }

    await Kaid.deleteMany({ opId: _id });
    await Listitem.deleteMany({ opId: _id });

    await createOperationItems({ operation, items });

    await operation.save();
    if (operation.taskId) {
      await onTaskOperationUpdate(operation.taskId);
      if (oldTaskId && oldTaskId !== operation.taskId) {
        await onTaskOperationUpdate(oldTaskId);
      }
    }
    if (operation.customerId) {
      await onCustomerOperationUpdate(operation.customerId);
      if (oldCustomerId && oldCustomerId !== operation.customerId) {
        await onCustomerOperationUpdate(oldCustomerId);
      }
    }
    if (operation.employeeId) {
      await onEmplyeeOperationUpdate(operation.employeeId);
      if (oldEmployeeId && oldEmployeeId !== operation.employeeId) {
        await onEmplyeeOperationUpdate(oldEmployeeId);
      }
    }
    if (operation.departmentId) {
      await onDepartmentOperationUpdate(operation.departmentId);
      if (oldDepartmentId && oldDepartmentId !== operation.departmentId) {
        await onDepartmentOperationUpdate(oldDepartmentId);
      }
    }

    return operation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateKaidOperation = async (data: any) => {
  const { _id, items, ...rest } = data;

  try {
    const operation: any = await Operation.findById(_id);
    if (!operation) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        operation.departmentId = value.departmentId;
        operation.departmentName = value.departmentName;
        operation.departmentNameAr = value.departmentNameAr;
        operation.departmentColor = value.departmentColor;
      } else if (key === "employee") {
        operation.employeeId = value.employeeId;
        operation.employeeName = value.employeeName;
        operation.employeeNameAr = value.employeeNameAr;
        operation.employeeColor = value.employeeColor;
        operation.employeePhone = value.employeePhone;
      } else if (key === "customer") {
        operation.customerId = value.customerId;
        operation.customerName = value.customerName;
        operation.customerNameAr = value.customerNameAr;
        operation.customerPhone = value.customerPhone;
      } else if (key === "supplier") {
        operation.supplierId = value.supplierId;
        operation.supplierName = value.supplierName;
        operation.supplierNameAr = value.supplierNameAr;
        operation.supplierPhone = value.supplierPhone;
      } else {
        operation[key] = value;
      }
    });

    if (data?.time) {
      const { year, month, day } = getYMD(data?.time);
      operation.year = year;
      operation.month = month;
      operation.day = day;
    }

    await Kaid.deleteMany({ opId: _id });

    if (items) {
      const allitems = JSON.parse(items);
      for (let itm of allitems) {
        await createKaid(operation, itm);
      }
    }
    await operation.save();
    return operation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteOperation = async (opId: any) => {
  try {
    const operation: any = await Operation.findById(opId);
    const taskId = operation.taskId;

    if (!operation) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    await Kaid.deleteMany({ opId });
    await Listitem.deleteMany({ opId });
    if (taskId) {
      await onTaskOperationUpdate(taskId);
    }
    if (operation.customerId) {
      await onCustomerOperationUpdate(operation.customerId);
    }
    if (operation.employeeId) {
      await onEmplyeeOperationUpdate(operation.employeeId);
    }
    if (operation.departmentId) {
      await onDepartmentOperationUpdate(operation.departmentId);
    }
    await operation.deleteOne();
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteKaidOperation = async (opId: any) => {
  try {
    const operation: any = await Operation.findById(opId);
    if (!operation) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    await Kaid.deleteMany({ opId });
    await operation.deleteOne();
  } catch (error) {
    console.log(error);
    return null;
  }
};
