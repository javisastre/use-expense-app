import axios from "axios";

class ExpenseService {
  constructor() {
    this.expense = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAllExpenses() {
    const pr = this.expense
      .get("/expenses")
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    return pr;
  }

  getTotalBalance() {
    let balance = this.expense.get("/expenses").then(({ data }) => {
      const newData = [...data];

      balance = newData.reduce((acc, element) => {
        const newAcc = acc + element.amount;
        return newAcc;
      }, 0);

      return balance;
    });
    // FIX THIS BALANCE CALCULATION
    return balance;
  }

  createExpense(amount, category) {
    const pr = this.expense
      .post("/expenses", { amount, category })
      .then(({ data }) => data);
    return pr;
  }
}

const expenseService = new ExpenseService();
export default expenseService;
