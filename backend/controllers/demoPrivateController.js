exports.demoPrivateRoute = (req, res, next)=>{
    res.status(200).json({
        success: true,
        data: "this is private data"
    });
}
