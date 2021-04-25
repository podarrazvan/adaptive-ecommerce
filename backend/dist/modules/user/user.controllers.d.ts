import { UsersService } from './user.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<void>;
    signup(user: any): Promise<void>;
    login(user: any): Promise<void>;
}
