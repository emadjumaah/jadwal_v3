import { Branch, User } from "../../models";
import { createToken, hashPassword, validPassword } from "../../common";
import { checkLastYearClosing } from "../../common/accounts";

export const getUsers = async (req: any) => {
  const { user } = req;
  const usrs = await User.find({});
  const filtered = user.isSuperAdmin
    ? usrs
    : usrs.filter((u: any) => !u.isSuperAdmin);
  if (filtered) {
    return {
      ok: true,
      data: filtered,
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

export const signup = async (payload: any) => {
  const { username, password, ...rest } = payload;
  const hPassword = hashPassword(password);

  try {
    const usr: any = await User.create({
      username,
      password: hPassword,
      ...rest,
    });
    const branch: any = await Branch.findOne({ basename: usr.branch });
    if (usr) {
      const accessToken = createToken({
        _id: usr._id,
        type: usr.type,
        isSuperAdmin: usr.isSuperAdmin,
        isDepartAdmin: usr.isSuperAdmin,
        roles: usr.roles,
        branch: usr.branch,
        systems: branch.systems,
        // expiresIn: "15m",
        count: usr.count,
      });
      const refreshToken = createToken({
        _id: usr._id,
        type: usr.type,
        isSuperAdmin: usr.isSuperAdmin,
        isDepartAdmin: usr.isSuperAdmin,
        roles: usr.roles,
        branch: usr.branch,
        systems: branch.systems,
        // expiresIn: "7d",
        count: usr.count,
      });

      return {
        ok: true,
        accessToken,
        refreshToken,
        data: usr,
      };
    } else {
      return {
        ok: false,
        error: "User Issue",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Server Error",
    };
  }
};

export const login = async (payload: any) => {
  const { username, password } = payload;

  try {
    const user: any = await User.findOne({ username });
    if (user && !user.block) {
      const hash = user.password;
      const isValid = validPassword(password, hash);
      if (isValid) {
        const branch: any = await Branch.findOne({ basename: user.branch });

        const accessToken = createToken({
          _id: user._id,
          type: user.type,
          isSuperAdmin: user.isSuperAdmin,
          isDepartAdmin: user.isSuperAdmin,
          roles: user.roles,
          branch: user.branch,
          systems: branch.systems,
          // expiresIn: "1m",
          count: user.count,
        });
        const refreshToken = createToken({
          _id: user._id,
          type: user.type,
          isSuperAdmin: user.isSuperAdmin,
          isDepartAdmin: user.isSuperAdmin,
          roles: user.roles,
          branch: user.branch,
          systems: branch.systems,
          // expiresIn: "7d",
          count: user.count,
        });
        checkLastYearClosing();
        return {
          ok: true,
          data: user,
          accessToken,
          refreshToken,
          message: "user updated",
        };
      } else {
        return {
          ok: false,
          error: "username or pawssword not correct",
          message: "username or pawssword not correct",
        };
      }
    } else {
      return {
        ok: false,
        error: "username or pawssword not correct",
        message: "username or pawssword not correct",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "Server error",
      message: "Server error",
    };
  }
};

export const changePassword = async (payload: any) => {
  const { _id, password, newPassword } = payload;
  try {
    const usr: any = await User.findById(_id);
    if (!usr) {
      return {
        ok: false,
        message: "user not found",
      };
    }
    const hash = usr.password;
    const isValid = validPassword(password, hash);
    if (isValid) {
      const npasshash = hashPassword(newPassword);
      usr.password = npasshash;
      usr.count = usr.count + 1;
      await usr.save();
      return {
        ok: true,
        message: "password updated",
      };
    } else {
      return {
        ok: false,
        error: "Error, Password not correct",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "Server Error",
    };
  }
};

export const updateUser = async (payload: any) => {
  const { _id, ...rest } = payload;
  try {
    const usr: any = await User.findById(_id);
    if (!usr) {
      return {
        ok: false,
        message: "user not found",
      };
    }
    Object.entries(rest).forEach(([key, value]: any) => {
      usr[key] = value;
    });
    await usr.save();

    return {
      ok: true,
      message: "user updated",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Server Error",
    };
  }
};

export const deleteUser = async (payload: any, req: any) => {
  const { user } = req;
  const { _id } = payload;
  if (user._id == _id) {
    return {
      ok: false,
      message: "ERROR deleteUser yourself",
    };
  }
  try {
    const usr: any = await User.findById(_id);
    if (usr.isSuperAdmin) {
      return {
        ok: false,
        message: "ERROR deleteUser superuser",
      };
    }
    if (!usr) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      await usr.deleteOne();
      return {
        ok: true,
        message: "deleteUser done",
      };
    }
  } catch (error) {
    console.log("ERROR deleteUser");
    console.log(error);
    return {
      ok: false,
      message: "ERROR deleteUser",
      error,
    };
  }
};
export const blockUser = async (payload: any) => {
  const { _id, block } = payload;
  try {
    const usr: any = await User.findById(_id);
    if (!usr) {
      return {
        ok: false,
        message: "Error",
        error: "Not Found",
      };
    } else {
      usr.block = block;
      await usr.save();
      return {
        ok: true,
        message: "blockUser done",
      };
    }
  } catch (error) {
    console.log("ERROR blockUser");
    console.log(error);
    return {
      ok: false,
      message: "ERROR blockUser",
      error,
    };
  }
};
