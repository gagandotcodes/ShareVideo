import userServices from "../services/userServices.js";

const register = async (request, response) => {

    const body = request.body;
    const files = request.files;

    const result = await userServices.registerUser(body, files);


    if(!result.success){
        return response.status(result.statusCode).send(result)
    }
    return response.status(result.statusCode).send(result)
}

const getUsers = async (request, response) => {
    
    console.log(request)
    const result = await userServices.getAllUsers();

    if(!result.success){
        return response.status(result.statusCode).send(result)
    }
    return response.status(result.statusCode).send(result)
}

const usercontroller = {
    register,
    getUsers
}
export default usercontroller
