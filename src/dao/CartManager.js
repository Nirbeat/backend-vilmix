import db from "../database/mysql.config.js";

class CartManager{
    
    static async createCart(userId){

        await db.query(
            'INSERT INTO carts (user_id, products) VALUES (?, ?);',
            [userId ,JSON.stringify([])]
        );
    }

    async getCartProducts(cartId){

        try {
            const data = await db.query(
                `SELECT products FROM carts WHERE cart_id = ${cartId};`
            )
            return data[0][0].products;
            
        } catch (error) {
            throw new Error('carrito inexistente')
        }
    }

    async addProductToCart(cartId, {productId, quantity}){
        
        const products = await this.getCartProducts(cartId);

        products.push({productId, quantity});

        await db.query(
            `UPDATE carts SET products = '${JSON.stringify(products)}' WHERE cart_id = ${cartId};`
        );
    }

    async removeProductFromCart(cartId, productId){
        let products = await this.getCartProducts(cartId);

        products = products.filter(el=> el.productId != productId);

        await db.query(
            `UPDATE carts SET products = '${JSON.stringify(products)}' WHERE cart_id = ${cartId};`
        );
    }
}

export default CartManager;

// new CartManager().createCart()
// new CartManager().addProductToCart(1, {productId:6, quantity:2})
// new CartManager().removeProductFromCart(1, 3)
// CartManager.getCartProducts(1)
