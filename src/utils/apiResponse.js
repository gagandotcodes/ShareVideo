class ApiResponse{
    constructor(
        statusCode,
        message = 'Success',
        data,
    ){
        
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = true
        return {
            statusCode:this.statusCode,
            data:this.data,
            message:this.message,
            success:this.success,
        }
    }
}

export {ApiResponse}