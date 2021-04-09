import axios from "axios";

class ExpenseService {
  constructor() {
    this.expense = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAllExpenses() {
    return this.expense
      .get("/expenses")
      .then(({ data }) => data)
      .catch((error) => console.log(error));
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

  createExpense(amount, category, isIncome) {
    return this.expense
      .post("/expenses", { amount, category, isIncome })
      .then(({ data }) => data);
  }

  deleteExpense(id) {
    return this.expense.delete(`/expenses/${id}`).then(({ data }) => data);
  }
}

const expenseService = new ExpenseService();
export default expenseService;
