require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const farmerRoutes = require("./routes/api/farmers");
const employeeRoutes = require("./routes/api/employees");
const buyersRoutes = require("./routes/api/buyers");
const buyerCompaniesRouter = require("./routes/api/buyers");
const godownsRouter = require("./routes/api/godowns");
const billsRouter = require("./routes/api/bills");
const companiesRouter = require("./routes/api/companies");
const consigneeRouter = require("./routes/api/consignees");
const bidsRouter = require("./routes/api/bids");
const dealsRouter = require("./routes/api/deals");
const brokenRiceQualityParametersRouter = require("./routes/api/brokenRiceQualityParameters");
const maizeQualityParametersRoutes = require("./routes/api/maizeQualityParameters");
const soyaQualityParametersRoutes = require("./routes/api/soyaQualityParameters");
const participateOnBidRoutes = require("./routes/api/participateOnBid");
const farmerProductsRoutes = require("./routes/api/farmerProducts");
const pickupLocationsRoutes = require("./routes/api/participateOnBid");
const ordersRoutes = require("./routes/api/orders");
const farmerOrdersRoutes = require("./routes/api/farmerOrders");
const qualitiesRoutes = require("./routes/api/qualities");
const orderByFarmerRoutes = require("./routes/api/orderByFarmer");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/farmers", farmerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/buyers", buyersRoutes);
app.use("/api/buyerCompanies", buyerCompaniesRouter);
app.use("/api/godowns", godownsRouter);
app.use("/api/bills", billsRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/consignees", consigneeRouter);
app.use("/api/bids", bidsRouter);
app.use("/api/deals", dealsRouter);
app.use("/api/brokenRiceQualityParameters", brokenRiceQualityParametersRouter);
app.use("/api/maizeQualityParameters", maizeQualityParametersRoutes);
app.use("/api/soyaQualityParameters", soyaQualityParametersRoutes);
app.use("/api/participateOnBid", participateOnBidRoutes);
app.use("/api/farmerProducts", farmerProductsRoutes);
app.use("/api/pickupLocations", pickupLocationsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/farmerOrders", farmerOrdersRoutes);
app.use("/api/quality-parameter", qualitiesRoutes);
app.use("/api/orderByFarmer", orderByFarmerRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
