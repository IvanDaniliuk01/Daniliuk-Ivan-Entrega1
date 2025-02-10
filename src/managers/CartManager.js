const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Lee el archivo de carritos y retorna un arreglo
  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []; // Si no existe el archivo, retorna un arreglo vacío. Esto se ejecuta únicamente por primera vez.
      } else {
        throw error;
      }
    }
  }

  // Guarda el arreglo de carritos en el archivo con formato legible
  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // Crea un nuevo carrito con un id autogenerado y arreglo vacío de productos
  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  // Retorna el carrito según el id
  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  // Agrega un producto al carrito; si ya existe, incrementa su quantity
  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex === -1) {
      throw new Error("Carrito no encontrado");
    }
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      // Incrementar la cantidad si ya existe
      cart.products[productIndex].quantity += 1;
    } else {
      // Agregar nuevo producto con cantidad 1
      cart.products.push({ product: productId, quantity: 1 });
    }
    carts[cartIndex] = cart;
    await this.saveCarts(carts);
    return cart;
  }
}

module.exports = CartManager;
