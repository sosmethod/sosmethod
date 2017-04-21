export class AuthUser {
    constructor(
        public name: {
            first: string,
            last: string
        },
        public email: string,
        public password: string,
        public database: string,
        public serverUrl: string,
        public roles: string[]) {
    }
}