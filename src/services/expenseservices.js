import axios from "axios";

class ExpenseService {
  constructor() {
    this.expense = axios.create({
      baseURL: "https://useexpense-api.herokuapp.com/api", //"http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAllExpenses() {
    return this.expense
      .get("/expenses")
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  getExpense(id) {
    return this.expense
      .get(`/expenses/${id}`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  createExpense(amount, category, isIncome) {
    return this.expense
      .post("/expenses", { amount, category, isIncome })
      .then(({ data }) => data);
  }

  updateExpense(id, amount, category, isIncome) {
    return this.expense
      .put(`/expenses/${id}`, { amount, category, isIncome })
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  deleteExpense(id) {
    return this.expense.delete(`/expenses/${id}`).then(({ data }) => data);
  }
}

const expenseService = new ExpenseService();
export default expenseService;
