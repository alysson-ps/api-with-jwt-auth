import bcrypt from "bcrypt";


export async function hashPassword(password:string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export async function compareHash(password:string, encrypted: string) {
	const result = await bcrypt.compare(password, encrypted);
	return result
}