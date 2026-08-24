class AuthController {
    constructor(private userService: UserService) {}

    async registerUser(req: AuthRequest, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const newUser = await this.userService.createUser(email, password);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req: AuthRequest, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await this.userService.findUserByEmail(email);
            if (!user || !user.validatePassword(password)) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            // Generate token logic here (if applicable)
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;