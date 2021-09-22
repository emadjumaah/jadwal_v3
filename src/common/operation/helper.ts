import {
  autoNoTypes,
  deliveryOps,
  itemTypes,
  operationTypes,
} from "../../constant";
import {
  Branch,
  Item,
  Kaid,
  Listitem,
  Operation,
  Sequence,
} from "../../models";
import { calculatYear } from "./../accounts";

export const getAutoNo = async (name: string) => {
  try {
    const doc: any = await Sequence.findOneAndUpdate(
      { _id: name },
      { $inc: { sequenceValue: 1 } },
      { upsert: true, new: true }
    );
    if (doc) {
      return doc.sequenceValue;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const setAutoNo = async ({ name, value }: any) => {
  try {
    const doc: any = await Sequence.findOneAndUpdate(
      { _id: name },
      { sequenceValue: value }
    );
    if (doc) {
      return doc.sequenceValue;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const objectFromList = (data: any) => {
  if (data) {
    const obj: any = {};
    data.map((item: any) => {
      const id = item._id ? item._id : item.id;
      obj[id] = item;
    });
    return obj;
  } else {
    return null;
  }
};

export const getDeliveyType = async (opType: any, basename: any) => {
  const branch: any = await Branch.findOne({ basename });
  if (branch) {
    const isInventory = branch.systems.includes("inv");
    if (isInventory) {
      if (
        opType === operationTypes.salesDelivery ||
        opType === operationTypes.interDeliveryOut
      ) {
        return "out";
      }
      if (
        opType === operationTypes.purchaseDelivery ||
        opType === operationTypes.interDeliveryIn
      ) {
        return "in";
      }
    } else {
      return null;
    }
  }
  return null;
};

export const handleCostAndQty = async ({ item, delivery, reverse }: any) => {
  const itemId = item?.itemId ? item?.itemId : item?._id;
  const itemPrice = item.itemPrice ? item.itemPrice : item.price;
  const itemCost = item.itemCost ? item.itemCost : item.cost;

  const newCost = delivery === "in" ? itemPrice : itemCost;
  const newQty = item.qty;
  const newTotal = newCost * newQty;

  const original: any = await Item.findById(itemId);
  const originalCost = original.cost ? original.cost : 0;
  const originalQty = original.qty ? original.qty : 0;
  const originalTotal = originalCost * originalQty;

  if (reverse) {
    if (delivery === "out") {
      original.qty = originalQty + newQty;
      original.save();
    }
    if (delivery === "in") {
      const ncost = (originalTotal - newTotal) / (originalQty - newQty);
      original.qty = originalQty - newQty;
      original.cost = Math.round(ncost * 100) / 100;
      original.save();
    }
  } else {
    if (delivery === "in") {
      const ncost = (originalTotal + newTotal) / (originalQty + newQty);
      original.qty = originalQty + newQty;
      original.cost = Math.round(ncost * 100) / 100;
      original.save();
    }
    if (delivery === "out") {
      original.qty = originalQty - newQty;
      original.save();
    }
  }
};

export const getNameOfDocument = (opType: number) => {
  const name = Object.keys(operationTypes).find(
    // @ts-ignore
    (key) => operationTypes[key] === opType
  );
  // @ts-ignore
  return autoNoTypes[name];
};

export const inforceConnections = async (operations: any) => {
  const ops = operations.filter((o: any) => o);
  const ids = ops.map((op: any) => op._id);
  for (const op of ops) {
    const links = op.links ? [...op.links, ...ids] : [...ids];
    op.links = Array.from(new Set(links));
    await op.save();
  }
};

export const inforceConnectionsWithMain = async ({ main, operations }: any) => {
  const ops = operations.filter((o: any) => o);
  const mainlinks = main?.links ? main.links : [];
  const ids = ops?.length > 0 ? ops.map((op: any) => op._id) : [];

  const listOfIds = Array.from(new Set([...mainlinks, ...ids]));
  if (listOfIds?.length > 0) {
    for (const link of listOfIds) {
      await Operation.findOneAndUpdate({ _id: link }, { links: listOfIds });
    }
  }
};

export const inforceRefrences = async ({ ref, operations }: any) => {
  const ops = operations.filter((o: any) => o);
  for (const op of ops) {
    op.refNo = ref.docNo;
    op.refType = ref.opType;
    await op.save();
  }
};
export const inforceKaidsRefrences = async ({ ref, operations }: any) => {
  const ops = operations.filter((o: any) => o);
  for (const op of ops) {
    const opkaids: any = await Kaid.find({ opId: op._id });
    for (const opkaid of opkaids) {
      opkaid.refNo = ref.docNo;
      opkaid.refType = ref.opType;
      await opkaid.save();
    }
  }
};

export const addEditedToClosing = async ({ time, branch }: any) => {
  const now = new Date();
  const year = now.getFullYear();

  const optime = new Date(time);
  const opyear = optime.getFullYear();

  if (year > opyear) {
    await calculatYear({ branch, time });
  }
};

export const calcItemsCostQty = async (items: any) => {
  if (!items || items.length === 0) {
    return;
  }
  const products = items.filter((li: any) => li.itemType === itemTypes.product);

  if (products && products.length > 0) {
    for (const product of products) {
      let dataOut: any;
      let dataIn: any;

      const itemdata = await Listitem.aggregate([
        {
          $match: {
            itemId: product._id,
            opType: { $in: deliveryOps },
          },
        },
        {
          $group: {
            _id: { opType: "$opType" },
            opType: { $last: "$opType" },
            total: { $sum: "$total" },
            qty: { $sum: "$qty" },
          },
        },
      ]);

      itemdata.map((itmd: any) => {
        if (itmd.opType === operationTypes.salesDelivery) {
          const qty = itmd?.qty ? itmd.qty : 0;
          dataOut = { qty };
        }
        if (itmd.opType === operationTypes.purchaseDelivery) {
          const qty = itmd?.qty ? itmd.qty : 0;
          const cost = itmd?.total && itmd?.qty ? itmd.total / itmd.qty : 0;
          dataIn = { cost, qty };
        }
      });
      const cost = dataIn?.cost;
      const qty = dataIn?.qty - dataOut?.qty;
      await Item.findOneAndUpdate(
        { _id: product._id },
        {
          cost,
          qty,
        }
      );
    }
  }
};
