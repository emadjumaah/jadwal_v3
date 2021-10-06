import { verify } from "jsonwebtoken";
import { JWT_SECRET, HEADER_BEARER } from "../constant";
import { User } from "../models";

export const createResolver = (resolver: any) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver: any) => {
    const newResolver = async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver(
  async (_: any, __: any, ctx: { user: { _id: any } }) => {
    if (ctx) {
      if (!ctx.user || !ctx.user._id) {
        throw new Error("auth token error");
      }
    }
  }
);

export const requiresSuperAdmin = requiresAuth.createResolver(
  (_: any, __: any, ctx: { user: { isSuperAdmin: any } }) => {
    if (ctx) {
      if (!ctx.user.isSuperAdmin) {
        throw new Error("Requires admin access");
      }
    }
  }
);

const decodeToken = async (token: any) => {
  if (!token) return null;
  const arr = token.split(" ");
  if (arr[0] === HEADER_BEARER) {
    const tokens = JSON.parse(arr[1]);
    try {
      const accessToken: any = verify(tokens.accessToken, JWT_SECRET);
      if (accessToken) {
        return accessToken;
      } else {
        return null;
      }
      // const { _id, count, branch, systems } = accessToken;
      // const user: any = await User.findById(_id);

      // if (user && user.count === count && !user.block) {
      //   return {
      //     _id: user._id,
      //     type: user.type,
      //     isSuperAdmin: user.isSuperAdmin,
      //     isDepartAdmin: user.isDepartAdmin,
      //     roles: user.roles,
      //     branch,
      //     systems,
      //     count: user.count,
      //   };
      // } else {
      //   return null;
      // }
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export const getUserFromToken = async (token: any) => {
  try {
    if (!token || token === "") return null;
    return decodeToken(token);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getReadyPhone = (phone: string) => {
  if (phone) {
    const countryCode = "974";
    const phone1 = phone.replace(/^0+/, "");
    const phone2 = phone1.replace(/^\+/, "");
    const phone3 = arabicToNum(phone2);
    if (phone3.startsWith(countryCode)) {
      return phone3;
    } else {
      return `974${phone3}`;
    }
  }
};

export const arabicToNum = (arNumStr: any) => {
  const regex = /[٠١٢٣٤٥٦٧٨٩٫]/g;
  const regexnumbers = /[٠١٢٣٤٥٦٧٨٩]/g;
  const found = arNumStr.match(regex);
  const foundnumbers = arNumStr.match(regexnumbers);
  if (found) {
    if (foundnumbers) {
      const finalNumber = arNumStr.replace(regex, (d: any) => {
        return d.charCodeAt(0) - 1632;
      });
      return finalNumber;
    } else {
      return arNumStr.replace("٫", ".");
    }
  } else {
    return arNumStr;
  }
};

export const getTimeDirName = (time: any) => {
  const y = time.getFullYear();
  const m = ("0" + (time.getMonth() + 1)).slice(-2);
  const d = ("0" + time.getDate()).slice(-2);
  const h = ("0" + time.getHours()).slice(-2);
  const mm = ("0" + time.getMinutes()).slice(-2);

  return `${y}-${m}-${d}_${h}-${mm}`;
};
