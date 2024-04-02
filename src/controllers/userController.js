import {registerUser} from "../services/userServices.js";
import {getAllUsers} from "../services/userServices.js";

const register = async (request, response) => {

    const body = request.body;
    const files = request.files;

    const result = await registerUser(body, files);


    if(!result.success){
        return response.status(result.statusCode).send(result)
    }
    return response.status(result.statusCode).send(result)
}

const getUsers = async (request, response) => {
    
    console.log(request)
    const result = await getAllUsers();

    if(!result.success){
        return response.status(result.statusCode).send(result)
    }
    return response.status(result.statusCode).send(result)
}

export {register, getUsers}
// export default registerController