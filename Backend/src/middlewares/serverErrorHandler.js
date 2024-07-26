// for handling server side errors
// error will be passed from asyncHandler
const serverErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        error: err.message || "Internal server error",
        success: false,
    });
};

export { serverErrorHandler };
