const makeSuccessResponse = (data) => {
    return {
        success: true,
        data
    }
};

const makeFailResponse = (message) => {
    return {
        success:false,
        message
    }
}

module.exports = {
    makeSuccessResponse,
    makeFailResponse
};