import userServices from "../services/userServices.js";

const register = async (request, response) => {
  const body = request.body;
  const files = request.files;

  const result = await userServices.registerUser(body, files);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response.status(result.statusCode).send(result);
};

const getUsers = async (request, response) => {
  const result = await userServices.getAllUsers();

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response.status(result.statusCode).send(result);
};

// login user
const login = async (request, response) => {
  const { userName, password } = request.body;
  const result = await userServices.login(userName, password);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .cookie("accessToken", result.data.accessToken, result.data.options)
    .cookie("refreshToken", result.data.refreshToken, result.data.options)
    .send(result);
};

const logout = async (request, response) => {
  const userId = request.userInfo._id;
  
  const result = await userServices.logout(userId);
  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .clearCookie("accessToken", result.data.options)
    .clearCookie("refreshToken", result.data.options)
    .send(result.message);
};

const refreshAccessToken = async (request, response) => {
  
  let incomingRefreshToken = request.cookies.refreshToken || request.body.refreshToken; 

  const result = await userServices.refreshAccessToken(incomingRefreshToken);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .cookie("accessToken", result.data.accessToken, result.data.options)
    .cookie("refreshToken", result.data.refreshToken, result.data.options)
    .send(result);
}

// Change user password
const changePassword = async (request, response) => {
  
  const { oldPassword, newPassword } = request.body;
  const userId = request.userInfo._id;

  const result = await userServices.changePassword(oldPassword, newPassword, userId);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .send(result);
}

// Subscribe channel
const subscribeChannel = async (request, response) => {
  
  const { channelUserId } = request.body;
  const userId = request.userInfo._id;
  

  const result = await userServices.subscribeChannel(channelUserId, userId);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .send(result);
}

// get user info
const getChannelInfo = async (request, response) => {
  
  const {channelUserId}  = request.query;
  const result = await userServices.getChannelInfo(channelUserId);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .send(result);
}

const usercontroller = {
  register,
  getUsers,
  login,
  logout,
  refreshAccessToken,
  changePassword,
  subscribeChannel,
  getChannelInfo
};
export default usercontroller;
