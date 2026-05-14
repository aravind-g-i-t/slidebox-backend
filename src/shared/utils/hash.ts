import bcrypt from "bcryptjs";


export const hashPassword=async (password: string): Promise<string> =>{
    return bcrypt.hash(password, 10);
}

export const comparePassword=async (plain: string, hashed: string): Promise<boolean>=> {
    return bcrypt.compare(plain, hashed);
}
