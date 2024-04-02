// wrapper function to make a function asynchronous

const asyncHandler = (fn) => async (req,res,next) => {
    try {
        return fn(req, res, next)
    } catch (error) {
        throw error.message
        
    }
}

export  {asyncHandler}