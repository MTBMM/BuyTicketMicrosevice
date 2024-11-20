import {scrypt, randomBytes} from 'crypto'
import {promisify} from 'util'
const scryptAsynce = promisify(scrypt)

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex')
        const buf = (await scryptAsynce(password, salt, 16)) as Buffer

        return `${buf.toString('hex')}.${salt}`
    }

    static async compare(storedPassword: String, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split(".")

        const buf = (await scryptAsynce(suppliedPassword, salt, 16)) as Buffer

        return buf.toString("hex") === hashedPassword
    }
}