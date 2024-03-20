const { createLogger, transports, format } = require("winston");
// ---- Logger function
const studentManagementLogger = createLogger({
  transports: [
    new transports.File({
      filename: "app.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "app-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = { studentManagementLogger };
