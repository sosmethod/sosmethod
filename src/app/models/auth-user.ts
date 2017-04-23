export class AuthUser {
    public age: number;
    public salt: String;
    public purchases: any[];
    public surveys: any[];
    public completed: any;
    public resetPasswordToken: String;
    public created: Date;
    public lastActivity: Date;
    public resetPasswordExpires: Date;
    public completed_5_day_essentials: Boolean;
    public completed_11_day_essentials: Boolean;

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