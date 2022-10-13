
const errorHandler = (err,req,res,next)=>{
    let error = { ...err };
    // console.log(error.message);

    error.message = err.message;

    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
};

module.exports = errorHandler;