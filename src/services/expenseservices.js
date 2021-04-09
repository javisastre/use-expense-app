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
    return this.expense.get("/expenses").then(({ data }) => {
      const newData = [...data];

      return newData.reduce((acc, element) => {
        const newAcc = element.isIncome
          ? acc + element.amount
          : acc - element.amount;
        return newAcc;
      }, 0);
    });
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
