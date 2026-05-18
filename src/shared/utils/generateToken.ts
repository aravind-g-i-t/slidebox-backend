import {randomBytes} from "crypto"

export const  generateToken= (): string=> {
    const token = randomBytes(32).toString("hex");
    return token;
    
}