class RequestUtils {


    static validateRequest = (requestBody, validations) =>
    {
        console.log("RequestUtils.validateRequest:");
        for(var i in validations)
        {
            if(validations[i].criterias.includes('required'))
            {
                if(!requestBody[validations[i].key])
                    throw {status: 400, errorDescription: validations[i].key + " required in request body"};
            }
        }            
    }
}

module.exports = RequestUtils;