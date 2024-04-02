import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = async (body, files) => {
  try {
    // validate password

    if (body.password === "") {
      return new ApiError(400, "Password cannot be empty!");
    }
    if (body.password.length < 8) {
      return new ApiError(400, "Empty password not allowed!");
    }
    // validate email
    await validateEmail(body.email);
    //check if user exist
    const user = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    // get local file paths for avatar and cover image
    const avatarLocalPath = files?.avatar[0]?.path;
    let coverImageLocalPath;
    if (files.cover) {
      coverImageLocalPath = files?.cover[0]?.path;
    }

    // check if avatar exist
    if (!avatarLocalPath) {
      throw "Avatar file is required!";
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath, "Avatar");
    let cover;
    if (coverImageLocalPath) {
      cover = await uploadOnCloudinary(coverImageLocalPath);
    }

    if (!avatar) {
      throw "Error in upload avatar on cloudinary";
    }
    if (files.cover && !cover) {
      throw "Error in upload cover on cloudinary";
    }

    const createUser = await User.create({
      email: body.email,
      userName: body.userName.toLowerCase(),
      fullName: body.fullName,
      avatar: avatar.url,
      coverImage: cover?.url || "",
      password: body.password,
    });

    return new ApiResponse(201, "User Created Successfully!", createUser);
  } catch (error) {
    console.log("error in creating user", error);
    return new ApiError(500, error.message);
  }
};

async function validateEmail(email) {
  //checks if first letter of email is a alphabet
  if (
    (email[0] > "a" && email[0] < "z") ||
    (email[0] > "A" && email[0] < "Z")
  ) {
    let count1 = 0;
    let count2 = 0;
    let indexOfAt = 0;
    indexOfAt = email.indexOf("@");
    // checks that . should be after @
    if (email.indexOf(".") < email.indexOf("@")) {
      return new ApiError(400, "Email not vaid , enter a valid Email!");
    }
    // checks if there are more than one occurance of '@' and '.'
    for (let char of email) {
      if (
        (char > "a" && char < "z") ||
        (char > "A" && char < "Z") ||
        (char > 0 && char < 10) ||
        char == "@" ||
        char == "."
      ) {
        if (char == "@") {
          count1 = count1 + 1;
        }
        if (char == ".") {
          count2 = count2 + 1;
        }
      }
    }
    if (count1 > 1 || count2 > 1 || count1 < 1 || count2 < 1) {
      return new ApiError(400, "Email not vaid , enter a valid Email!");
    }
  } else {
    return new ApiError(400, "Email not vaid , enter a valid Email!");
  }
}

// get all users
const getAllUsers = async () => {
  
    const allUsers = await User.find();

    if(allUsers.length === 0){
      return new ApiError(404, "Data Not Found!");
    }

    return new ApiResponse(200, "User Data", allUsers);
}

export {registerUser, getAllUsers};
