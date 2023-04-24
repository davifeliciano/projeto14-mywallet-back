import {
  createTransaction,
  getTotalFromUser,
  getTransactionsFromUser,
} from "../services/transaction.services.js";

export async function getTransactions(req, res) {
  const user = res.locals.user;

  try {
    const transactions = await getTransactionsFromUser(user);

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
    await createTransaction(user, description, amount, type);
    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function getTotal(req, res) {
  const user = res.locals.user;

  try {
    const total = await getTotalFromUser(user);
    return res.send(total);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
