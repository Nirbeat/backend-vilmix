import db from '../database/mysql.config.js'
import { createHash, isValidPassword } from '../functions/bcrypt.js';

class UserManager{

    static async userExists(email){
        const data = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]);

        return data[0].length!=0
    }

    async logIn(email, password){

        const data = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]);

        if(data[0].length==0) throw new Error('Usuario no encontrado');
        const user = data[0][0]
        // console.log(data[0][0])
        isValidPassword(user, password);

        delete user.password;
        return user;
    }

    async signIn(email, password, role = 'usuario'){

        //AL CREAR USUARIO CREAR TAMBIÉN CARRITO ASOCIADO
        const user = await UserManager.userExists(email)
        if (user) throw new Error("Ya existe ese usuario");

        const newUser = await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [email, createHash(password), role]);

        //ACA SE CREA EL CARRITO CON EL MISMO ID QUE EL USUARIO
        (await import('./CartManager.js')).default.createCart(newUser[0].insertId);
    }

    async getUserProfile(userId){
        const data = await db.query(
            'SELECT email, name FROM users WHERE user_id = ?',
            [userId]);
            if(data[0].length==0) throw new Error('Usuario no encontrado');

            return {
                email:data[0][0].email,
                name:data[0][0].name,

            }
        
        
    }
}

export default UserManager;
