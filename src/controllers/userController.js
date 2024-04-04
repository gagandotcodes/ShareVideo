import userServices from "../services/userServices.js";

const register = async (request, response) => {
  const body = request.body;
  const files = request.files;

  const result = await userServices.registerUser(body, files);

  if (!result.success) {
    return response.status(result.statusCode).send(result);
  }
  return response
    .status(result.statusCode)
    .send(result);
};

const getUsers = async (request, response) => {
  
    console.log(request)
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

const usercontroller = {
  register,
  getUsers,
  login,
};
export default usercontroller;
