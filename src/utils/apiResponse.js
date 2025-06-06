class ApiResponse {
    constructor(success, data = null, message = '') {
        this.success = success;
        if (data) this.data = data;
        if (message) this.message = message;
    }

    static success(data, message = '') {
        return new ApiResponse(true, data, message);
    }

    static error(message = 'Something went wrong', statusCode = 500) {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }

    static validationError(errors) {
        const error = new Error('Validation Failed');
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }
}

module.exports = ApiResponse;