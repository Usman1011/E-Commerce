const errorCode = {
    '000': "Success",
    '001': "Login Unsuccefull, User Not Found",
    '002': "Login Unsuccefull, Invalid Crentials",
    '500': "Internal Server Error"
}

class ResponseUtils {

    
    static setResponseObject = (responseModel) => {
        if(responseModel.responseCode !== '000')
            responseModel.error = errorCode[responseModel.responseCode];
    }

}

module.exports = ResponseUtils;