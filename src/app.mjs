import express from "express";
import AccountRoutes from "./routes/accounts.route.mjs";
import CustomerRoutes from "./routes/customers.route.mjs";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ strict: true }));

app.use("/accounts", AccountRoutes);
app.use("/customers", CustomerRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export { app };
