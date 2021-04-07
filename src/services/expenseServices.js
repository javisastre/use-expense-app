import axios from "axios";

class ExpenseService {
  constructor() {
    this.expense = axios.create({
      baseURL: `http://localhost:6000/api`,
      withCredentials: true,
    });
  }

  getAllExpenses() {
    const pr = this.expense
      .get("/expenses")
      .then(({ data }) => data)
      .catch((err) => console.log(err));
    return pr;
  }
}

const expenseService = new ExpenseService();
export default expenseService;
