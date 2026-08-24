export class UserService {
    private users: { email: string; password: string }[] = [];

    createUser(email: string, password: string): void {
        const newUser = { email, password };
        this.users.push(newUser);
    }

    findUserByEmail(email: string): { email: string; password: string } | undefined {
        return this.users.find(user => user.email === email);
    }
}