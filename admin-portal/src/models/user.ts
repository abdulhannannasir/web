export class User {
    id: string;
    email: string;
    password: string;

    constructor(id: string, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    // Method to hash the password before saving to the database
    hashPassword(): string {
        // Implement password hashing logic here
        return this.password; // Placeholder for hashed password
    }

    // Method to validate the password during login
    validatePassword(inputPassword: string): boolean {
        // Implement password validation logic here
        return this.password === inputPassword; // Placeholder for validation
    }
}