import {
  createTransaction,
  deleteTransaction,
  getTotal,
  getTransactions,
  patchTransaction,
} from "../services/transaction.services.js";

export async function getTransactionsController(req, res) {
  const user = res.locals.user;

  try {
    const transactions = await getTransactions(user);

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

export async function postTransactionController(req, res) {
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

export async function patchTransactionController(req, res) {
  const user = res.locals.user;
  const transaction = req.params.id;
  const { description, amount } = res.locals.body;

  try {
    const { matchedCount } = await patchTransaction(
      user,
      transaction,
      description,
      amount
    );

    if (matchedCount === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function deleteTransactionController(req, res) {
  const user = res.locals.user;
  const transaction = req.params.id;

  try {
    const { deletedCount } = await deleteTransaction(user, transaction);

    if (deletedCount === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function getTotalController(req, res) {
  const user = res.locals.user;

  try {
    const total = await getTotal(user);
    return res.send(total);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
