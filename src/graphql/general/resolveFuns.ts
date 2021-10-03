import {
  Category,
  Department,
  Sequence,
  Employee,
  Brand,
  Customer,
  Item,
  Closing,
  Operation,
  Kaid,
  Account,
  Company,
  Listitem,
} from "../../models";
import { autoNoTypes, eventStatus, operationTypes } from "../../constant";
import { getAutoNo, objectFromList } from "../../common";
import {
  calcEditedData,
  calculatYear,
  getAccountsBalance,
  tarseedAccounts,
} from "../../common/accounts";
import {
  getNextDays,
  getStartLastMooth,
  getStartThisYear,
  periods,
} from "../../common/time";
import Supplier from "../../models/Supplier";
import Group from "../../models/Group";
import Task from "../../models/Task";

export const getLastNos = async () => {
  try {
    const docs: any = await Sequence.find({});
    if (docs) {
      return {
        ok: true,
        data: JSON.stringify(docs),
      };
    } else {
      return {
        ok: false,
        error: "data issue",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "server issue",
    };
  }
};

export const getCategories = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const cats = await Category.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (cats) {
      return {
        ok: true,
        data: cats,
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
export const getBrands = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const brands = await Brand.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (brands) {
      return {
        ok: true,
        data: brands,
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
export const getGroups = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const grps = await Group.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (grps) {
      return {
        ok: true,
        data: grps,
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

export const getDepartments = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const deps = await Department.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (deps) {
      return {
        ok: true,
        data: deps,
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
      error: "error",
    };
  }
};
export const getEmployees = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL, resTypes } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const options: any = { branch };
    if (resTypes) {
      options.resType = { $in: resTypes };
    }
    const empl = await Employee.find(options).sort({
      [fieldName]: 1,
    });

    if (empl) {
      return {
        ok: true,
        data: empl,
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

export const getCustomers = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const custs = await Customer.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (custs) {
      return {
        ok: true,
        data: custs,
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

export const getSuppliers = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const supls = await Supplier.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (supls) {
      return {
        ok: true,
        data: supls,
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

export const getItems = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const itms = await Item.find({ branch }).sort({
      [fieldName]: 1,
    });
    if (itms) {
      return {
        ok: true,
        data: itms,
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
export const getServices = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  // const ids = [1, 2];
  try {
    const fieldName = isRTL ? "nameAr" : "name";
    // const itms = await Item.find({ branch, itemType: { $in: ids } }).sort({
    const itms = await Item.find({ branch, itemType: 2 }).sort({
      [fieldName]: 1,
    });
    if (itms) {
      return {
        ok: true,
        data: itms,
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
export const getProducts = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const itms = await Item.find({ branch, itemType: 1 }).sort({
      [fieldName]: 1,
    });
    if (itms) {
      return {
        ok: true,
        data: itms,
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
export const getNoStockProducts = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { isRTL } = payload;

  try {
    const fieldName = isRTL ? "nameAr" : "name";
    const itms = await Item.find({ branch, itemType: 3 }).sort({
      [fieldName]: 1,
    });
    if (itms) {
      return {
        ok: true,
        data: itms,
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
export const getCompany = async () => {
  try {
    const company = await Company.findOne({ kind: "company" });
    if (company) {
      return {
        ok: true,
        data: JSON.stringify(company),
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
export const getChartsData = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end, ...rest } = payload;
  const startLastMonth = getStartLastMooth();
  const { startThisYear, pyear } = getStartThisYear();

  try {
    const eventsDepartment = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          ...rest,
          startDate:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$startDate" },
            year: { $year: "$startDate" },
            department: "$departmentId",
            // status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);
    const eventsEmployee = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          ...rest,
          startDate:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$startDate" },
            year: { $year: "$startDate" },
            employee: "$employeeId",
            // status: "$status",
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const salesDepartment = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          ...rest,
          opTime:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth },
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
    ]);

    const salesEmployee = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          ...rest,
          opTime:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth },
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
    // const raseeds = await getAllRasseds(branch);

    const accs = await Account.find({ parentcode: { $in: [1, 13] } });
    const raseeds = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: { $in: [1, 13] },
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

    const data = JSON.stringify({
      events: { department: eventsDepartment, employee: eventsEmployee },
      sales: { department: salesDepartment, employee: salesEmployee },
      accounts: { raseeds, accs, lastYearClosing },
    });

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
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "error",
      error,
    };
  }
};
export const getSimpleChartsData = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const { start, end } = payload;
  const startLastMonth = getStartLastMooth();
  const next8 = getNextDays(8);
  const { startThisYear, pyear } = getStartThisYear();
  const stats = objectFromList(eventStatus);
  try {
    const eventsData = await Operation.aggregate([
      {
        $match: {
          branch,
          opType: operationTypes.event,
          startDate:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth, $lte: next8 },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$startDate" },
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

    const salesData = await Kaid.aggregate([
      {
        $match: {
          branch,
          accPCode: 13,
          opTime:
            start && end
              ? { $gte: new Date(start), $lte: new Date(end) }
              : { $gte: startLastMonth },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$opTime" },
            month: { $month: "$opTime" },
            year: { $year: "$opTime" },
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

    const sales =
      salesData && salesData.length > 0
        ? salesData.map((sdo: any) => {
            const { _id, debit, credit, ...rest } = sdo;
            const { day, month, year, department, employee } = _id;
            return {
              ...rest,
              day,
              month,
              year,
              amount: credit - debit,
              date: new Date(year, month - 1, day, 10),
              _id: `${department}-${employee}-${day}-${month}-${year}`,
            };
          })
        : [];

    const events =
      eventsData && eventsData.length > 0
        ? eventsData.map((sdo: any) => {
            const { _id, ...rest } = sdo;
            const { day, month, year, department, employee, status } = _id;
            return {
              ...rest,
              day,
              month,
              year,
              date: new Date(year, month - 1, day, 10),
              statusAr: stats?.[status]?.name,
              statusEn: stats?.[status]?.nameAr,
              _id: `${department}-${employee}-${status}-${day}-${month}-${year}`,
            };
          })
        : [];

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

    const accountsData = getAccountsBalance({ raseeds, accs, lastYearClosing });

    const data = JSON.stringify({
      events,
      sales,
      accounts: accountsData,
    });

    if (data) {
      return {
        ok: true,
        sales,
        events,
        accounts: JSON.stringify(accountsData),
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
      error,
    };
  }
};

export const createCategory = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  try {
    const autoNo = await getAutoNo(autoNoTypes.category);
    const docNo = autoNo;
    const cat = await Category.create({ autoNo, docNo, branch, ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(cat),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedCategory = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Kaid.updateMany(
      { categoryId: _id },
      { $set: { categoryName: name, categoryNameAr: nameAr } }
    );
    await Listitem.updateMany(
      { categoryId: _id },
      { $set: { categoryName: name, categoryNameAr: nameAr } }
    );
    await Item.updateMany(
      { categoryId: _id },
      { $set: { categoryName: name, categoryNameAr: nameAr } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const cat: any = await Category.findById(_id);
    if (!cat) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      cat[key] = value;
    });
    await cat.save();
    await updateRelatedCategory(cat);
    return {
      ok: true,
      message: "ERROR updateCategory",
      data: JSON.stringify(cat),
    };
  } catch (error) {
    console.log("ERROR updateCategory");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateCategory",
      error,
    };
  }
};

const hasRelatedCategory = async (_id: any) => {
  const relatedItems = await Item.find({ categoryId: _id });
  if (relatedItems?.length > 0) {
    return true;
  }
  const relatedListItems = await Listitem.find({ categoryId: _id });
  if (relatedListItems?.length > 0) {
    return true;
  }
  const relatedKaids = await Kaid.find({ categoryId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteCategory = async (payload: any) => {
  const { _id } = payload;

  try {
    const isRelated = await hasRelatedCategory(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const cat: any = await Category.findById(_id);
    if (!cat) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await cat.deleteOne();
      return {
        ok: true,
        message: "Category Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteCategory");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteCategory",
      error,
    };
  }
};
export const createBrand = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  try {
    const autoNo = await getAutoNo(autoNoTypes.brand);
    const docNo = autoNo;
    const brand = await Brand.create({ autoNo, docNo, branch, ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(brand),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};
export const createGroup = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  try {
    const autoNo = await getAutoNo(autoNoTypes.group);
    const docNo = autoNo;
    const grp = await Group.create({ autoNo, docNo, branch, ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(grp),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedBrand = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Kaid.updateMany(
      { brandId: _id },
      { $set: { brandName: name, brandNameAr: nameAr } }
    );
    await Listitem.updateMany(
      { brandId: _id },
      { $set: { brandName: name, brandNameAr: nameAr } }
    );
    await Item.updateMany(
      { brandId: _id },
      { $set: { brandName: name, brandNameAr: nameAr } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateBrand = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const brand: any = await Brand.findById(_id);
    if (!brand) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      brand[key] = value;
    });
    await brand.save();
    await updateRelatedBrand(brand);
    return {
      ok: true,
      message: "ERROR updateBrand",
      data: JSON.stringify(brand),
    };
  } catch (error) {
    console.log("ERROR updateBrand");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateBrand",
      error,
    };
  }
};
export const updateGroup = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const grp: any = await Group.findById(_id);
    if (!grp) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      grp[key] = value;
    });
    await grp.save();
    return {
      ok: true,
      message: "ERROR updategrp",
      data: JSON.stringify(grp),
    };
  } catch (error) {
    console.log("ERROR updategrp");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updategrp",
      error,
    };
  }
};

const hasRelatedBrand = async (_id: any) => {
  const relatedItems = await Item.find({ brandId: _id });
  if (relatedItems?.length > 0) {
    return true;
  }
  const relatedListItems = await Listitem.find({ brandId: _id });
  if (relatedListItems?.length > 0) {
    return true;
  }
  const relatedKaids = await Kaid.find({ brandId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteBrand = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedBrand(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const brand: any = await Brand.findById(_id);
    if (!brand) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await brand.deleteOne();
      return {
        ok: true,
        message: "Category Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteCategory");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteCategory",
      error,
    };
  }
};

const hasRelatedGroup = async (_id: any) => {
  const relatedItems = await Task.find({ groupId: _id });
  if (relatedItems?.length > 0) {
    return true;
  }
  return false;
};
export const deleteGroup = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedGroup(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const grp: any = await Group.findById(_id);
    if (!grp) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await grp.deleteOne();
      return {
        ok: true,
        message: "Group Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteGroup");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteGroup",
      error,
    };
  }
};

export const updateCompany = async (payload: any) => {
  try {
    const company: any = await Company.findOne({ kind: "company" });
    if (!company) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(payload).forEach(([key, value]) => {
      company[key] = value;
    });
    await company.save();
    return {
      ok: true,
      message: "ERROR updateCompany",
      data: JSON.stringify(company),
    };
  } catch (error) {
    console.log("ERROR updateCompany");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateCompany",
      error,
    };
  }
};

export const createDepartment = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const autoNo = await getAutoNo(autoNoTypes.department);
  const docNo = autoNo;
  try {
    const depart = await Department.create({
      autoNo,
      docNo,
      branch,
      ...payload,
    });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(depart),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedDepartment = async (doc: any) => {
  const { _id, name, nameAr, color } = doc;
  try {
    await Item.updateMany(
      { departmentId: _id },
      {
        $set: {
          departmentName: name,
          departmentNameAr: nameAr,
          departmentColor: color,
        },
      }
    );
    await Operation.updateMany(
      { departmentId: _id },
      {
        $set: {
          departmentName: name,
          departmentNameAr: nameAr,
          departmentColor: color,
        },
      }
    );
    await Kaid.updateMany(
      { departmentId: _id },
      {
        $set: {
          departmentName: name,
          departmentNameAr: nameAr,
          departmentColor: color,
        },
      }
    );
    await Listitem.updateMany(
      { departmentId: _id },
      {
        $set: {
          departmentName: name,
          departmentNameAr: nameAr,
          departmentColor: color,
        },
      }
    );
    await Employee.updateMany(
      { departmentId: _id },
      {
        $set: {
          departmentName: name,
          departmentNameAr: nameAr,
          departmentColor: color,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateDepartment = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const dept: any = await Department.findById(_id);
    if (!dept) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      dept[key] = value;
    });
    await dept.save();
    await updateRelatedDepartment(dept);
    return {
      ok: true,
      message: "updateDepartment",
      data: JSON.stringify(dept),
    };
  } catch (error) {
    console.log("ERROR updateDepartment");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateDepartment",
      error,
    };
  }
};

const hasRelatedDepartment = async (_id: any) => {
  const relatedItems = await Item.find({ departmentId: _id });
  if (relatedItems?.length > 0) {
    return true;
  }
  const relatedOps = await Operation.find({ departmentId: _id });
  if (relatedOps?.length > 0) {
    return true;
  }
  const relatedListItems = await Listitem.find({ departmentId: _id });
  if (relatedListItems?.length > 0) {
    return true;
  }
  const relatedKaids = await Kaid.find({ departmentId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  const relatedEmployee = await Employee.find({ departmentId: _id });
  if (relatedEmployee?.length > 0) {
    return true;
  }
  return false;
};

export const deleteDepartment = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedDepartment(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }

    const dept: any = await Department.findById(_id);
    if (!dept) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await dept.deleteOne();
      return {
        ok: true,
        message: "Department Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteDepartment");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteDepartment",
      error,
    };
  }
};

export const createEmployee = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const autoNo = await getAutoNo(autoNoTypes.employee);
  const docNo = autoNo;
  const { department, ...rest } = payload;
  try {
    const empl = await Employee.create({
      autoNo,
      docNo,
      branch,
      ...department,
      ...rest,
    });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(empl),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedEmployee = async (doc: any) => {
  const { _id, name, nameAr, phone, color } = doc;
  try {
    await Item.updateMany(
      { employeeId: _id },
      {
        $set: {
          employeeName: name,
          employeeNameAr: nameAr,
          employeePhone: phone,
          employeeColor: color,
        },
      }
    );
    await Operation.updateMany(
      { employeeId: _id },
      {
        $set: {
          employeeName: name,
          employeeNameAr: nameAr,
          employeePhone: phone,
          employeeColor: color,
        },
      }
    );
    await Kaid.updateMany(
      { employeeId: _id },
      {
        $set: {
          employeeName: name,
          employeeNameAr: nameAr,
          employeePhone: phone,
          employeeColor: color,
        },
      }
    );
    await Listitem.updateMany(
      { employeeId: _id },
      {
        $set: {
          employeeName: name,
          employeeNameAr: nameAr,
          employeePhone: phone,
          employeeColor: color,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const empl: any = await Employee.findById(_id);
    if (!empl) {
      return {
        ok: false,
        message: "Error updateEmployee",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        empl.departmentId = value.departmentId;
        empl.departmentName = value.departmentName;
        empl.departmentNameAr = value.departmentNameAr;
        empl.departmentColor = value.departmentColor;
      } else {
        empl[key] = value;
      }
    });
    await empl.save();
    await updateRelatedEmployee(empl);
    return {
      ok: true,
      message: "update Employee",
      data: JSON.stringify(empl),
    };
  } catch (error) {
    console.log("ERROR updateEmployee");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateEmployee",
      error,
    };
  }
};

const hasRelatedEmployee = async (_id: any) => {
  const relatedItems = await Item.find({ employeeId: _id });
  if (relatedItems?.length > 0) {
    return true;
  }
  const relatedOps = await Operation.find({ employeeId: _id });
  if (relatedOps?.length > 0) {
    return true;
  }
  const relatedListItems = await Listitem.find({ employeeId: _id });
  if (relatedListItems?.length > 0) {
    return true;
  }
  const relatedKaids = await Kaid.find({ employeeId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteEmployee = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedEmployee(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }

    const empl: any = await Employee.findById(_id);
    if (!empl) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await empl.deleteOne();
      return {
        ok: true,
        message: "Employee Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteEmployee");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteEmployee",
      error,
    };
  }
};

export const createCustomer = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const autoNo = await getAutoNo(autoNoTypes.customer);
  const docNo = autoNo;
  const { employee, ...rest } = payload;
  try {
    const cust = await Customer.create({
      autoNo,
      docNo,
      branch,
      ...employee,
      ...rest,
    });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(cust),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedCustomer = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Kaid.updateMany(
      { customerId: _id },
      { $set: { customerName: name, customerNameAr: nameAr } }
    );
    await Operation.updateMany(
      { customerId: _id },
      { $set: { customerName: name, customerNameAr: nameAr } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const cust: any = await Customer.findById(_id);
    if (!cust) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "employee") {
        cust.employeeId = value.employeeId;
        cust.employeeName = value.employeeName;
        cust.employeeNameAr = value.employeeNameAr;
        cust.employeeColor = value.employeeColor;
        cust.employeePhone = value.employeePhone;
      } else {
        cust[key] = value;
      }
    });
    await cust.save();
    await updateRelatedCustomer(cust);
    return {
      ok: true,
      message: "updateCustomer",
      data: JSON.stringify(cust),
    };
  } catch (error) {
    console.log("ERROR updateCustomer");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateCustomer",
      error,
    };
  }
};

const hasRelatedCustomer = async (_id: any) => {
  const relatedOps = await Operation.find({ customerId: _id });
  if (relatedOps?.length > 0) {
    return true;
  }

  const relatedKaids = await Kaid.find({ customerId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteCustomer = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedCustomer(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }

    const cust: any = await Customer.findById(_id);
    if (!cust) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await cust.deleteOne();
      return {
        ok: true,
        message: "Customer Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteCustomer");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteCustomer",
      error,
    };
  }
};
export const createSupplier = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const autoNo = await getAutoNo(autoNoTypes.supplier);
  const docNo = autoNo;
  const { employee, ...rest } = payload;
  try {
    const cust = await Supplier.create({
      autoNo,
      docNo,
      branch,
      ...employee,
      ...rest,
    });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(cust),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedSupplier = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Kaid.updateMany(
      { supplierId: _id },
      { $set: { supplierName: name, supplierNameAr: nameAr } }
    );
    await Operation.updateMany(
      { supplierId: _id },
      { $set: { supplierName: name, supplierNameAr: nameAr } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateSupplier = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const cust: any = await Supplier.findById(_id);
    if (!cust) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "employee") {
        cust.employeeId = value.employeeId;
        cust.employeeName = value.employeeName;
        cust.employeeNameAr = value.employeeNameAr;
        cust.employeeColor = value.employeeColor;
        cust.employeePhone = value.employeePhone;
      } else {
        cust[key] = value;
      }
    });
    await cust.save();
    await updateRelatedSupplier(cust);
    return {
      ok: true,
      message: "updateSupplier",
      data: JSON.stringify(cust),
    };
  } catch (error) {
    console.log("ERROR updateSupplier");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateSupplier",
      error,
    };
  }
};

const hasRelatedSupplier = async (_id: any) => {
  const relatedOps = await Operation.find({ supplierId: _id });
  if (relatedOps?.length > 0) {
    return true;
  }

  const relatedKaids = await Kaid.find({ supplierId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteSupplier = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedSupplier(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }

    const cust: any = await Supplier.findById(_id);
    if (!cust) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await cust.deleteOne();
      return {
        ok: true,
        message: "Supplier Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteSupplier");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteSupplier",
      error,
    };
  }
};

export const createItem = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const autoNo = await getAutoNo(autoNoTypes.item);
  const docNo = autoNo;
  const { category, brand, department, employee, ...rest } = payload;
  try {
    const itm = await Item.create({
      autoNo,
      docNo,
      branch,
      ...category,
      ...brand,
      ...department,
      ...employee,
      ...rest,
    });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(itm),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedItem = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Operation.updateMany(
      { itemId: _id },
      {
        $set: {
          itemName: name,
          itemNameAr: nameAr,
        },
      }
    );
    await Kaid.updateMany(
      { itemId: _id },
      {
        $set: {
          itemName: name,
          itemNameAr: nameAr,
        },
      }
    );
    await Listitem.updateMany(
      { itemId: _id },
      {
        $set: {
          itemName: name,
          itemNameAr: nameAr,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const itm: any = await Item.findById(_id);
    if (!itm) {
      return {
        ok: false,
        message: "Error updateDepartment",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      if (key === "department") {
        itm.departmentId = value.departmentId;
        itm.departmentName = value.departmentName;
        itm.departmentNameAr = value.departmentNameAr;
        itm.departmentColor = value.departmentColor;
      } else if (key === "employee") {
        itm.employeeId = value.employeeId;
        itm.employeeName = value.employeeName;
        itm.employeeNameAr = value.employeeNameAr;
        itm.employeeColor = value.employeeColor;
        itm.employeePhone = value.employeePhone;
      } else if (key === "category") {
        itm.categoryId = value.categoryId;
        itm.categoryName = value.categoryName;
        itm.categoryNameAr = value.categoryNameAr;
      } else if (key === "brand") {
        itm.brandId = value.brandId;
        itm.brandName = value.brandName;
        itm.brandNameAr = value.brandNameAr;
      } else {
        itm[key] = value;
      }
    });
    await itm.save();
    await updateRelatedItem(itm);
    return {
      ok: true,
      message: "updateItem",
    };
  } catch (error) {
    console.log("ERROR updateItem");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateItem",
      error,
    };
  }
};

const hasRelatedItems = async (_id: any) => {
  const relatedOps = await Operation.find({ itemId: _id });
  if (relatedOps?.length > 0) {
    return true;
  }
  const relatedListItems = await Listitem.find({ itemId: _id });
  if (relatedListItems?.length > 0) {
    return true;
  }
  const relatedKaids = await Kaid.find({ itemId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }

  return false;
};

export const deleteItem = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedItems(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const itm: any = await Item.findById(_id);
    if (!itm) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await itm.deleteOne();
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

export const runClosing = async (req: any) => {
  const { user } = req;
  const { branch } = user;

  try {
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
      tarseedAccounts();
    }
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
