import { Account, Branch, Company, User } from "../models";
import { initAccounts } from "./accountsnames";
import { hashPassword } from "./user";

const createMainBranch = async () => {
  const brn = await Branch.create({
    name: "Main Branch",
    nameAr: "الفرع الرئيسي",
    basename: "branch1",
    users: 50,
    systems: ["cal", "pos", "exp", "pur", "inv", "hr", "ass", "acc"],
  });
  return brn;
};

const createMainAccounts = async (branch: any) => {
  for (let acc of initAccounts) {
    await Account.create({ ...acc, branch });
  }
};

const createLicense = async (license: any) => {
  await Company.findOneAndUpdate(
    { kind: "company" },
    { license },
    { upsert: true, new: true }
  );

  // admin user
  const roles = JSON.stringify({ isSuperAdmin: true });
  await User.findOneAndUpdate(
    { username: "admin" },
    {
      branch: "branch1",
      password: hashPassword("Qatar2022"),
      isSuperAdmin: true,
      roles,
    },
    { upsert: true, new: true }
  );
};

export const initServer = async () => {
  const branchs: any = await Branch.find({});
  if (branchs?.length === 0) {
    const branch = await createMainBranch();
    if (branch) {
      createMainAccounts(branch?.basename);
      const license = JSON.stringify(branch);
      await createLicense(license);
    }
  }
};
