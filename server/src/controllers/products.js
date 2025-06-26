const pool = require('../config/db');

const createProduct = async (req, res) => {
  try {
    const { name, sku, price, category, status, enterprise_id } = req.body;
    if (!name || !sku || !enterprise_id) {
      return res.status(400).json({ message: 'Name, SKU, and enterprise ID required' });
    }

    await pool.query(
      'INSERT INTO products (name, sku, price, category, status, enterprise_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, sku, price || null, category || null, status || null, enterprise_id]
    );

    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT p.*, e.name as enterprise FROM products p LEFT JOIN enterprises e ON p.enterprise_id = e.id'
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, price, category, status, enterprise_id } = req.body;
    if (!name || !sku || !enterprise_id) {
      return res.status(400).json({ message: 'Name, SKU, and enterprise ID required' });
    }

    await pool.query(
      'UPDATE products SET name = ?, sku = ?, price = ?, category = ?, status = ?, enterprise_id = ? WHERE id = ?',
      [name, sku, price || null, category || null, status || null, enterprise_id, id]
    );

    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };