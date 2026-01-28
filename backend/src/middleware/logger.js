/**
 * Custom Logger Middleware
 * Logs all incoming HTTP requests with timestamp, method, URL, and response time
 */

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log request
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  
  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const reset = '\x1b[0m';
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${statusColor}${res.statusCode}${reset} - ${duration}ms`);
  });
  
  next();
};

module.exports = { requestLogger };
