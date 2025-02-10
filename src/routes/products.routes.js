const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager('./products.json');

// GET /api/products/ -> Lista todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:pid -> Retorna el producto con el id especificado
router.get('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products/ -> Agrega un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/products/:pid -> Actualiza el producto con los campos enviados
router.put('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    const updatedProduct = await productManager.updateProduct(pid, req.body);
    res.json({ product: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/products/:pid -> Elimina el producto indicado
router.delete('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
