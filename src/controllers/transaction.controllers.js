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
  const { description, amount } = res.locals.body;

  try {
    await db.collection("transactions").insertOne({
      description: stripHtml(description).result,
      amount: new Decimal128(amount.toString()),
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
    const result = await db
      .collection("transactions")
      .aggregate([
        { $match: { author: new ObjectId(user) } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    if (result.length === 0) {
      return res.send({ total: "00.00" });
    }

    const total = result.at(0).total;
    return res.send({ total: total.toString() });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
