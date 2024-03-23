import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/userModel.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // get request body
    const body = req.body;
    console.log('body', body)

    // validate fields
    if(body.password === ''){
        throw new ApiError(400, 'Empty password not allowed!');
    }

    //check if user exist
    const user = await User.findOne({ $or: [{email: body.email}, { username: body.username } ] });
    // console.log('user', user)

    
    // get local file paths for avatar and cover image
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if(req.files.cover){
        coverImageLocalPath = req.files?.cover[0]?.path;
    }
    
    // check if avatar exist
    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar file is required!');
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath, 'Avatar');
    let cover;
    if(coverImageLocalPath){
        cover = await uploadOnCloudinary(coverImageLocalPath);
    }

    if(!avatar){
        throw new ApiError(400, 'Error in upload avatar on cloudinary');
    }
    if(req.files.cover && !cover){
        throw new ApiError(400, 'Error in upload cover on cloudinary');
    }

    const createUser = await User.create(
        {
            email: body.email,
            userName: body.userName.toLowerCase(),
            fullName: body.fullName,
            avatar: avatar.url,
            coverImage: cover?.url || '',
            password: body.password,
        }
    );

    console.log('createUser', createUser)
    if(createUser){
        return res.status(201).json(
        new ApiResponse(200, createUser, 'User registered sucecssfully!')
    )
    }
    
    
})

export default registerUser