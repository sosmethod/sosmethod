export class AuthUser {
    constructor(
        public name: string,
        public password: string,
        public database: string,
        public serverUrl: string,
        public roles: string[]) {
    }
}