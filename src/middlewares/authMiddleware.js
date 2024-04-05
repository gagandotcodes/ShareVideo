import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import Jwt from "jsonwebtoken";

export const verifyJwt = async(request, _ , next) => {
    try {
        const token = request.cookies?.accessToken || request.header('Authorization')?.replace('Bearer ', '');
    
        if(!token){
            return new ApiError(401, 'Unauthorized request!');
        }
    
        const decodedtokenInfo = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const userInfo = await User.findById(decodedtokenInfo?._id).select('-password -refreshToken');
    
        if(!userInfo){
            return new ApiError(401, 'Invalid access token!');
        }
    
        request.userInfo = userInfo
        next();
    } catch (error) {
        return new ApiError(500, 'Something went wrong while checking token!')
        
    }
}