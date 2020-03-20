const makeSuccessResponse = (data) => {
    return {
        success: true,
        data
    }
};

module.exports = {
    makeSuccessResponse
};