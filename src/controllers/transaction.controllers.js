import { Decimal128, ObjectId } from "mongodb";
import db from "../database/database.js";
import { stripHtml } from "string-strip-html";

export async function getTransactions(req, res) {
  const user = res.locals.user;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ author: new ObjectId(user) })
      .toArray();

    return res.send(
      transactions.map((transaction) => {
        return { ...transaction, amount: transaction.amount.toString() };
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function setTransaction(req, res) {
  const user = res.locals.user;
  const { description, amount, type } = res.locals.body;

  try {
    await db.collection("transactions").insertOne({
      description: stripHtml(description).result,
      amount: new Decimal128(amount.toString()),
      type,
      author: new ObjectId(user),
      createdAt: Date.now(),
    });

    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function getTotal(req, res) {
  const user = res.locals.user;

  try {
    const resultArray = await db
      .collection("transactions")
      .aggregate([
        { $match: { author: new ObjectId(user) } },
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

    return res.send(stringfiedResult);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
