Productos:
    GET http://localhost:8080/api/products para listar todos los productos.
    GET http://localhost:8080/api/products/1 para consultar el producto con id 1.
    POST http://localhost:8080/api/products para agregar un producto (en el body enviar un JSON con los campos: title, description, code, price, status, stock, category, thumbnails).
    PUT http://localhost:8080/api/products/1 para actualizar el producto (no se puede modificar el id).
    DELETE http://localhost:8080/api/products/1 para eliminar el producto.

Carritos:
    POST http://localhost:8080/api/carts para crear un nuevo carrito.
    GET http://localhost:8080/api/carts/1 para consultar el carrito con id 1.
    POST http://localhost:8080/api/carts/1/product/2 para agregar el producto con id 2 al carrito 1.