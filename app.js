const express = require("express");
const app = express();
const AppError = require("./error_handlers/appError");
const userRoutes = require("./user/userRoute");
const projectRoutes = require("./project/projectRoute");
const objectRoutes = require("./object/objectRoute");
const systemAdminRoutes = require("./system_admin/route");
const superUserRoutes = require("./system_admin/superUserRoute");
const objectDashboardRoutes = require("./object/dashboardRoute");
const projectDashboardRoutes = require("./project/dashboardRoute");
const globalErrorHandler = require("./error_handlers/errorController");
const morgan = require("morgan");
const cors = require("cors");

// Use the cors middleware
app.use(cors());
// Parsing data in the urls
// This will limit the data to be sent through url to only 10kb

app.use(
  cors({
    origin: "*", // Specify the allowed origin
    // methods: 'GET,POST', // Specify the allowed HTTP methods
    // allowedHeaders: 'Content-Type,Authorization' // Specify the allowed headers
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(morgan("combined"));
app.use("", userRoutes);
app.use("/projects/", projectRoutes);
app.use("/objects/", objectRoutes);
app.use("/dashboard/object/", objectDashboardRoutes);
app.use("/dashboard/projects/", projectDashboardRoutes);
app.use("/system-admins/", systemAdminRoutes);
app.use("/super-users/", superUserRoutes);

// // Not found error handler
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on our server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
