const mysql = require('mysql2/promise');
const pool = require('../database/connect'); // Adjust path as needed

const createOrder = async (req, res) => {
    const { customerId, productId, quantity, totalPrice } = req.body;

    if (!customerId || !productId || quantity <= 0 || totalPrice <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Check current stock quantity
        const [product] = await connection.execute('SELECT stockQuantity FROM products WHERE product_id = ?', [productId]);
        if (product.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Product not found' });
        }

        const currentStock = product[0].stockQuantity; // Ensure column name matches the database
        if (currentStock < quantity) {
            await connection.rollback();
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Insert new order
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)',
            [customerId, totalPrice]
        );
        const orderId = orderResult.insertId;

        // Insert order item
        await connection.execute(
            'INSERT INTO order_items (order_id, product_id, quantity, unit_price,order_status) VALUES (?, ?, ?, ?,"pending")',
            [orderId, productId, quantity, totalPrice / quantity]
        );

        // Update stock quantity
        await connection.execute(
            'UPDATE products SET stockQuantity = stockQuantity - ? WHERE product_id = ?',
            [quantity, productId]
        );

        await connection.commit();
        res.status(201).json({ orderId });

    } catch (error) {
        // Rollback transaction in case of error
        await connection.rollback();
        console.error('Error creating order:', error.message);
        res.status(500).json({ error: 'Failed to create order' });

    } finally {
        connection.release();
    }
};

const getAllOrderDetails = async (req, res) => {
    console.log("hello")
    try {
        const [rows] = await pool.execute(`
            SELECT 
                c.FirstName,
                c.LastName,
                c.PhoneNumber,
                o.order_id,
                o.total_amount,
                oi.quantity,
                oi.unit_price,
                oi.order_status,
                p.name AS product_name,
                p.price AS product_price
            FROM 
                orders o
            INNER JOIN 
                customers c ON o.customer_id = c.CustomerID
            INNER JOIN 
                order_items oi ON o.order_id = oi.order_id
            INNER JOIN 
                products p ON oi.product_id = p.product_id
            ORDER BY 
                o.order_id;
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving order details:', error);
        res.status(500).json({ error: 'Failed to retrieve order details' });
    }
};

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    console.log("hello")

    try {
        const [order] = await pool.execute('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        const [orderItems] = await pool.execute('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

        if (order.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ ...order[0], items: orderItems });
    } catch (error) {
        console.error('Error retrieving order details:', error);
        res.status(500).json({ error: 'Failed to retrieve order details' });
    }
};

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails
};
