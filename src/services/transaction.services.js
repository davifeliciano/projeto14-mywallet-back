import { ObjectId, Decimal128 } from "mongodb";
import { stripHtml } from "string-strip-html";
import db from "../database/database.js";

export function getTransactionsFromUser(userId) {
  return db
    .collection("transactions")
    .find({ author: new ObjectId(userId) })
    .toArray();
}

export function createTransaction(userId, description, amount, type) {
  return db.collection("transactions").insertOne({
    description: stripHtml(description).result,
    amount: new Decimal128(amount.toString()),
    type,
    author: new ObjectId(userId),
    createdAt: Date.now(),
  });
}

export async function getTotalFromUser(userId) {
  const resultArray = await db
    .collection("transactions")
    .aggregate([
      { $match: { author: new ObjectId(userId) } },
      {
        $group: {
          _id: null,
          credit: {
            $sum: {
              $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0],
            },
          },
          debit: {
            $sum: {
              $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $addFields: {
          _id: null,
          total: {
            $subtract: ["$credit", "$debit"],
          },
        },
      },
    ])
    .toArray();

  if (resultArray.length === 0) {
    return res.send({
      credit: "0",
      debit: "0",
      total: "0",
    });
  }

  const [result] = resultArray;
  delete result._id;

  const stringfiedResult = Object.fromEntries(
    Object.entries(result).map(([key, value]) => [key, value.toString()])
  );

  console.log(stringfiedResult);
  return stringfiedResult;
}
