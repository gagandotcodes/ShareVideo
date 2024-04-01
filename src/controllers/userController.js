import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/userModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // get request body
    const body = req.body;
    console.log('body', body)

    // validate password
    if (body.password === '' || body.password.length < 8) {
        throw new ApiError(400, 'Empty password not allowed!');
    }
    // validate email
    await validateEmail(body.email);
    //check if user exist
    const user = await User.findOne({ $or: [{email: body.email}, { username: body.username } ] });
     console.log('user', user)


    // // get local file paths for avatar and cover image
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if(req.files.cover){
        coverImageLocalPath = req.files?.cover[0]?.path;
    }

    // // check if avatar exist
    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar file is required!');
    }

    // // upload on cloudinary
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

async function validateEmail(email) {
    console.log('inside function validateEmail')
    if ((email[0] > 'a' && email[0] < 'z') || (email[0] > 'A' && email[0] < 'Z')) {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        count3 = email.indexOf('@')
    if (email.indexOf('.') < email.indexOf('@')) {
        throw new ApiError(400, 'Email not vaid , enter a valid Email!');
    }

for (let char of email) {
    if ((char > 'a' && char < 'z') || (char > 'A' && char < 'Z') || (char > 0 && char < 10) || char == '@' || char == '.') {
        if (char == '@') {
            count1 = count1 + 1;
        }
        if (char == '.') {
            count2 = count2 + 1;
        }
    }
}
if (count1 > 1 || count2 > 1 || count1 < 1 || count2 < 1) {
    throw new ApiError(400, 'Email not vaid , enter a valid Email!');
}

    } else { throw new ApiError(400, 'Email not vaid , enter a valid Email!') }
}