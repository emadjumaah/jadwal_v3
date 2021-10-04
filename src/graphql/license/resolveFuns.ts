/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Branch, Account, Kaid } from "../../models";

export const getBranches = async () => {
  try {
    const itms = await Branch.find({});
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
export const getAccounts = async () => {
  try {
    const accs = await Account.find({}).sort({ branch: 1 });
    if (accs) {
      return {
        ok: true,
        data: accs,
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

export const createBranch = async (payload: any) => {
  try {
    const brand = await Branch.create({ ...payload });
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
export const updateBranch = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const branch: any = await Branch.findById(_id);
    if (!branch) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      branch[key] = value;
    });
    await branch.save();
    return {
      ok: true,
      message: "updateBranch",
      data: JSON.stringify(branch),
    };
  } catch (error) {
    console.log("ERROR updateBranch");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateBranch",
      error,
    };
  }
};

export const deleteBranch = async (payload: any) => {
  const { _id } = payload;
  try {
    const brand: any = await Branch.findById(_id);
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
        message: "Branch Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteBranch");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteBranch",
      error,
    };
  }
};
export const createAccount = async (payload: any) => {
  try {
    const acc = await Account.create({ ...payload });
    return {
      ok: true,
      message: "success",
      data: JSON.stringify(acc),
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error",
      error: error,
    };
  }
};

const updateRelatedAccount = async (doc: any) => {
  const { _id, name, nameAr } = doc;
  try {
    await Kaid.updateMany(
      { accId: _id },
      { $set: { accName: name, accNameAr: nameAr } }
    );
    await Kaid.updateMany(
      { opaccId: _id },
      { $set: { opaccName: name, opaccNameAr: nameAr } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const acc: any = await Account.findById(_id);
    if (!acc) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    }
    Object.entries(rest).forEach(([key, value]) => {
      acc[key] = value;
    });
    await acc.save();
    await updateRelatedAccount(acc);

    return {
      ok: true,
      message: "updateAccount",
      data: JSON.stringify(acc),
    };
  } catch (error) {
    console.log("ERROR updateAccount");
    console.log(error);
    return {
      ok: false,
      message: "ERROR updateAccount",
      error,
    };
  }
};

const hasRelatedAccount = async (_id: any) => {
  const relatedKaids = await Kaid.find({ accId: _id });
  if (relatedKaids?.length > 0) {
    return true;
  }
  return false;
};

export const deleteAccount = async (payload: any) => {
  const { _id } = payload;
  try {
    const isRelated = await hasRelatedAccount(_id);
    if (isRelated === true) {
      return {
        ok: false,
        message: "Error",
        error: "Item has related",
      };
    }
    const acc: any = await Account.findById(_id);
    if (!acc) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await acc.deleteOne();
      return {
        ok: true,
        message: "Account Deleted",
      };
    }
  } catch (error) {
    console.log("ERROR deleteAccount");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteAccount",
      error,
    };
  }
};
export const initAccounts = async (payload: any) => {
  const { baccounts } = payload;
  try {
    const branchsAccounts = JSON.parse(baccounts);
    branchsAccounts.map((branchAccounts: any) => {
      branchAccounts.map(async (ba: any) => {
        const { code, branch, ...rest } = ba;
        await Account.findOneAndUpdate(
          { code, branch },
          { ...rest },
          { setDefaultsOnInsert: true, upsert: true, new: true }
        );
      });
    });
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
