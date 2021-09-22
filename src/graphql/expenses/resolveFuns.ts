import { Operation } from "../../models";

import { operationTypes } from "../../constant";
import {
  createOperation,
  deleteOperation,
  updateOperation,
} from "../../common";

export const getExpenses = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;

  const { start, end, ...rest } = payload;

  const ops = await Operation.find({
    branch,
    opType: operationTypes.expenses,
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

export const createExpenses = async (payload: any, req: any) => {
  const { user } = req;
  const { branch } = user;
  const data = {
    branch,
    opType: operationTypes.expenses,
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

export const updateExpenses = async (payload: any) => {
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

export const deleteExpenses = async (payload: any) => {
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
