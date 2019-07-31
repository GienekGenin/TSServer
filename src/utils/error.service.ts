export class ErrorService {
    private readonly customErrors: ({ code: number; message: string })[];

    constructor() {
        /** Array of custom errors */
        this.customErrors = [
            {message: 'Wrong password', code: 1},
            {message: 'User did not exist', code: 2},
            {message: 'User with such email already exists', code: 3},
            {message: 'jwt expired', code: 4},
            {message: 'jwt malformed', code: 5},
            {message: 'invalid token', code: 6},
            {message: 'Unexpected token', code: 7},

            // new mongo errors
            {message: 'Role with such _id does not exist', code: 8},
            {message: 'Firm with such _id does not exist', code: 9}
        ];

    }

    /**
     * @param err - error object
     * @return Error
     */
    createCustomError(err: any) {
        if (err.errors) {
            const errorPayload = [];
            for (const key in err.errors) {
                for (let c = 0; c < this.customErrors.length; c += 1) {
                    if (err.errors[key].message === this.customErrors[c].message ||
                        err.errors[key].message.includes(this.customErrors[c].message)) {
                        errorPayload.push(this.customErrors[c]);
                    }
                }
            }
            if (errorPayload.length >= 1) {
                return errorPayload;
            }
            for (const key in err.errors) {
                errorPayload.push({message: err.errors[key].message});
            }
            return errorPayload;
        }
        if (err.name === 'MongoError') {
            return {
                message: err.errmsg,
                code: err.code
            }
        }
        if (err.message) {
            for (let i = 0; i < this.customErrors.length; i += 1) {
                if (err.message === this.customErrors[i].message ||
                    err.message.includes(this.customErrors[i].message)) {
                    return this.customErrors[i];
                }
            }
            return {
                message: err.message,
                stack: err.stack
            };
        }
        if (typeof err === 'string') {
            for (let i = 0; i < this.customErrors.length; i += 1) {
                if (err === this.customErrors[i].message ||
                    err.includes(this.customErrors[i].message)) {
                    return this.customErrors[i];
                }
            }
        }
        return err;
    }
}

