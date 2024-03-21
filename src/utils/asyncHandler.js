// wrapper function to make a function asynchronous

const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error || 500).json({
            success: false,
            message: error.message
        })
    }
}

export {asyncHandler}