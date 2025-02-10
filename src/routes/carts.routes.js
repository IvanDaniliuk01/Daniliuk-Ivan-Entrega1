const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

const cartManager = new CartManager('./carts.json');
const productManager = new ProductManager('./products.json');

// POST /api/carts/ -> Crea un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/carts/:cid -> Lista los productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid, 10);
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/carts/:cid/product/:pid -> Agrega un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid, 10);
    const pid = parseInt(req.params.pid, 10);

    // Verificar que el producto exista
    const product = await productManager.getProductById(pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Si el producto existe, proceder a agregarlo al carrito
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.json({ cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
