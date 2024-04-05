import bcrypt from 'bcrypt';

export function createHash(password){
    
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(user, password){

    const comparation =  bcrypt.compareSync(password, user.password);

    if(!comparation) throw new Error(' Contraseña incorrecta');
}