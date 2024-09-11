require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const cacheMiddleware = require("./middleware/cacheMiddleware");
const errorMiddleware = require("./middleware/errorMiddlewarefunction");
const errorHandler = require("./middleware/errorMiddleware");

require("events").EventEmitter.defaultMaxListeners = 15;

const app = express();
const corsOptions = {
  origin: "https://hans-emp.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/farmers", cacheMiddleware, async (req, res, next) => {
  const farmerRoutes = (await import("./routes/api/farmers")).default;
  farmerRoutes(req, res, next);
});

app.use("/api/employees", cacheMiddleware, async (req, res, next) => {
  const employeeRoutes = (await import("./routes/api/employees")).default;
  employeeRoutes(req, res, next);
});

app.use("/api/buyers", cacheMiddleware, async (req, res, next) => {
  const buyersRoutes = (await import("./routes/api/buyers")).default;
  buyersRoutes(req, res, next);
});

app.use("/api/buyerCompanies", cacheMiddleware, async (req, res, next) => {
  const buyerCompaniesRouter = (await import("./routes/api/buyers")).default;
  buyerCompaniesRouter(req, res, next);
});

app.use("/api/godowns", cacheMiddleware, async (req, res, next) => {
  const godownsRouter = (await import("./routes/api/godowns")).default;
  godownsRouter(req, res, next);
});

app.use("/api/bills", cacheMiddleware, async (req, res, next) => {
  const billsRouter = (await import("./routes/api/bills")).default;
  billsRouter(req, res, next);
});

app.use("/api/companies", cacheMiddleware, async (req, res, next) => {
  const companiesRouter = (await import("./routes/api/companies")).default;
  companiesRouter(req, res, next);
});

app.use("/api/consignees", cacheMiddleware, async (req, res, next) => {
  const consigneeRouter = (await import("./routes/api/consignees")).default;
  consigneeRouter(req, res, next);
});

app.use("/api/bids", cacheMiddleware, async (req, res, next) => {
  const bidsRouter = (await import("./routes/api/bids")).default;
  bidsRouter(req, res, next);
});

app.use("/api/bidsSupplier", cacheMiddleware, async (req, res, next) => {
  const bidsSupplierRouter = (await import("./routes/api/bidsSupplier"))
    .default;
  bidsSupplierRouter(req, res, next);
});

app.use("/api/deals", cacheMiddleware, async (req, res, next) => {
  const dealsRouter = (await import("./routes/api/deals")).default;
  dealsRouter(req, res, next);
});

app.use(
  "/api/brokenRiceQualityParameters",
  cacheMiddleware,
  async (req, res, next) => {
    const brokenRiceQualityParametersRouter = (
      await import("./routes/api/brokenRiceQualityParameters")
    ).default;
    brokenRiceQualityParametersRouter(req, res, next);
  }
);

app.use(
  "/api/maizeQualityParameters",
  cacheMiddleware,
  async (req, res, next) => {
    const maizeQualityParametersRoutes = (
      await import("./routes/api/maizeQualityParameters")
    ).default;
    maizeQualityParametersRoutes(req, res, next);
  }
);

app.use(
  "/api/soyaQualityParameters",
  cacheMiddleware,
  async (req, res, next) => {
    const soyaQualityParametersRoutes = (
      await import("./routes/api/soyaQualityParameters")
    ).default;
    soyaQualityParametersRoutes(req, res, next);
  }
);

app.use("/api/participateOnBid", cacheMiddleware, async (req, res, next) => {
  const participateOnBidRoutes = (await import("./routes/api/participateOnBid"))
    .default;
  participateOnBidRoutes(req, res, next);
});

app.use("/api/pickupLocations", cacheMiddleware, async (req, res, next) => {
  const pickupLocationsRoutes = (await import("./routes/api/pickupLocations"))
    .default;
  pickupLocationsRoutes(req, res, next);
});

app.use("/api/orders", cacheMiddleware, async (req, res, next) => {
  const ordersRoutes = (await import("./routes/api/orders")).default;
  ordersRoutes(req, res, next);
});

app.use("/api/farmerOrders", cacheMiddleware, async (req, res, next) => {
  const farmerOrdersRoutes = (await import("./routes/api/farmerOrders"))
    .default;
  farmerOrdersRoutes(req, res, next);
});

app.use("/api/quality-parameter", cacheMiddleware, async (req, res, next) => {
  const qualitiesRoutes = (await import("./routes/api/qualities")).default;
  qualitiesRoutes(req, res, next);
});

app.use("/api/orderByFarmer", cacheMiddleware, async (req, res, next) => {
  const orderByFarmerRoutes = (await import("./routes/api/orderByFarmer"))
    .default;
  orderByFarmerRoutes(req, res, next);
});

app.use("/api/balance", cacheMiddleware, async (req, res, next) => {
  const balanceRoutes = (await import("./routes/api/balance")).default;
  balanceRoutes(req, res, next);
});

app.use("/api/products", cacheMiddleware, async (req, res, next) => {
  const productRoutes = (await import("./routes/api/products")).default;
  productRoutes(req, res, next);
});

app.use("/api/self-company", cacheMiddleware, async (req, res, next) => {
  const selfCompanyRoutes = (await import("./routes/api/selfCompany")).default;
  selfCompanyRoutes(req, res, next);
});

app.use("/api", cacheMiddleware, async (req, res, next) => {
  const taskRoutes = (await import("./routes/api/taskRoutes")).default;
  taskRoutes(req, res, next);
});

app.use("/api/farmer-data", cacheMiddleware, async (req, res, next) => {
  const farmerDataRoutes = (await import("./routes/api/farmerData")).default;
  farmerDataRoutes(req, res, next);
});

app.use("/api/rice-mills", cacheMiddleware, async (req, res, next) => {
  const riceMillRoutes = (await import("./routes/api/riceMillRoutes")).default;
  riceMillRoutes(req, res, next);
});

app.use("/api/travel-details", cacheMiddleware, async (req, res, next) => {
  const travelRoutes = (await import("./routes/api/travelRoutes")).default;
  travelRoutes(req, res, next);
});

app.use(errorHandler);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
