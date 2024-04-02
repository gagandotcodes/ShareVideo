import registerUser from "../services/userServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = async (request, response) => {

    const body = request.body;
    const files = request.files;

    const result = await registerUser(body, files);


    if(!result.success){
        return response.status(result.statusCode).send(result)
    }
    return response.status(result.statusCode).send(result)
}

export {register}
// export default registerController