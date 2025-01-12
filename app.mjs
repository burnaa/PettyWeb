import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'; // PostgreSQL холболтод зориулсан модуль
import swaggerUi from 'swagger-ui-express';

const { Pool } = pkg;

// PostgreSQL холболт тохируулах
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'urnaa',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('PostgreSQL холболтын алдаа:', err.stack);
    } else {
        console.log('PostgreSQL-д амжилттай холбогдлоо!');
    }
});

// Express сервер үүсгэх
const app = express();

// Статик файлуудыг ачаалах
app.use(express.static('public'));

// JSON өгөгдлийн хязгаарыг томсгох
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Swagger тохиргоо
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Product Management API",
        version: "1.0.0",
        description: "API for managing products including images, sizes, and colors.",
    },
    paths: {
        "/products": {
            post: {
                summary: "Add a new product",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Example Product" },
                                    code: { type: "string", example: "123ABC" },
                                    type: { type: "string", example: "type1" },
                                    sizes: { type: "string", example: "XS,L,M" },
                                    colors: { type: "string", example: "Red,Blue,Green" },
                                    origin: { type: "string", example: "import" },
                                    certification: { type: "string", example: "Y" },
                                    start_date: { type: "string", format: "date", example: "2025-01-01" },
                                    end_date: { type: "string", format: "date", example: "2025-12-31" },
                                    images: {
                                        type: "array",
                                        items: { type: "string", format: "url" },
                                        example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
                                    },
                                    price: { type: "number", example: 5000 },
                                    piece: { type: "integer", example: 100 },
                                },
                                required: [
                                    "name",
                                    "code",
                                    "type",
                                    "sizes",
                                    "colors",
                                    "origin",
                                    "certification",
                                    "price",
                                    "images",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Product added successfully" },
                    400: { description: "Invalid input" },
                    500: { description: "Error saving product" },
                },
            },
            get: {
                summary: "Get all products",
                responses: {
                    200: {
                        description: "A list of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            prod_name: { type: "string", example: "Example Product" },
                                            prod_code: { type: "string", example: "123ABC" },
                                            prod_type: { type: "string", example: "type1" },
                                            prod_size: { type: "array", items: { type: "string" }, example: ["XS", "L", "M"] },
                                            prod_color: { type: "array", items: { type: "string" }, example: ["Red", "Blue", "Green"] },
                                            origin: { type: "string", example: "import" },
                                            manufacture_date: { type: "string", format: "date", example: "2025-01-01" },
                                            expiry_date: { type: "string", format: "date", example: "2025-12-31" },
                                            price_amount: { type: "number", example: 5000 },
                                            piece: { type: "integer", example: 100 },
                                            subpic: {
                                                type: "array",
                                                items: { type: "string", format: "url" },
                                                example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Failed to fetch products",
                    },
                },
            },
        },
        "/adoptions": {
            post: {
                summary: "Add a new adoption information",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Example Adoption" },
                                    factory: { type: "string", example: "Havchaarik" },
                                    age: { type: "integer", example: 3 },
                                    sex: { type: "string", example: "эр" },
                                    type: { type: "string", example: "type1" },
                                    details: { type: "text", example: "Good dog. i love dog." },
                                    phone: { type: "number", example: 89259999 },
                                    image: { type: "text", format: "url", example: "https://example.com/image1.jpg" },
                                    text: { type: "text", example:"nohoinii maani zurag"},
                                },
                                required: [
                                    "name",
                                    "factory",
                                    "age",
                                    "sex",
                                    "type",
                                    "phone",
                                    "image",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Adoption added successfully" },
                    400: { description: "Invalid input Adoption" },
                    500: { description: "Error saving Adoption" },
                },
            },
            get: {
                summary: "Get all adoption information",
                responses: {
                    200: {
                        description: "A list of all adoption information",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            name: { type: "string", example: "Example Adoption" },
                                            factory: { type: "string", example: "Havchaarik" },
                                            age: { type: "integer", example: 3 },
                                            sex: { type: "char", example: "F" },
                                            type: { type: "string", example: "type1" },
                                            details: { type: "text", example: "Good dog. i love dog." },
                                            phone: { type: "number", example: 89259999 },
                                            image: { type: "text", format: "url", example: "https://example.com/image1.jpg" },
                                            text: { type: "text", example: "nohoinii maani zurag" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: { description: "Failed to fetch adoption information" },
                },
            },
        },
    },
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// POST API: Бүтээгдэхүүний өгөгдлийг хадгалах
app.post("/products", async (req, res) => {
    const {
        name,
        code,
        type,
        sizes,
        colors,
        origin,
        start_date,
        end_date,
        price,
        piece,
        images = [],
    } = req.body;

    // Validation
    if (!name || !code || !type || !sizes || !colors || !origin || !price) {
        return res.status(400).json({ error: "Required fields are missing or images are empty." });
    }

    try {
        const query = `
            INSERT INTO products (prod_name, prod_code, prod_type, prod_size, prod_color, origin, manufacture_date, expiry_date, price_amount, piece, subpic) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *`;

        const values = [
            name,
            code,
            type,
            `{${sizes.split(",").map((size) => size.trim()).join(",")}}`,
            `{${colors.split(",").map((color) => color.trim()).join(",")}}`,
            origin,
            start_date,
            end_date,
            price,
            piece,
            `{${images.map((img) => `"${img}"`).join(",")}}`,
        ];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error saving product:", err.message);
        res.status(500).json({ error: "Failed to add product" });
    }
});

app.get('/products', async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        res.status(200).json(result.rows); // PostgreSQL-ээс ирсэн өгөгдлөө JSON-ээр буцаана
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// POST API: Бүтээгдэхүүний өгөгдлийг хадгалах
app.post("/adoptions", async (req, res) => {
    const {
        name,
        factory,
        age,
        sex,
        type,
        details,
        phone,
        image,
        text,
    } = req.body;

    // Validation
    if (!name || !factory || !age || !sex|| !type || !image|| !phone) {
        return res.status(400).json({ error: "Required fields are missing or images are empty." });
    }

    try {
        const query = `
            INSERT INTO adoptions (adopt_name, adopt_factory, age, sex, animal_type, details, phone, image, text) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`;

        const values = [
            name,
            factory,
            age,
            sex,
            type,
            details,
            phone,
            image,
            text,
        ];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error saving adoption:", err.message);
        res.status(500).json({ error: "Failed to add adoption" });
    }
});

// GET API: adoptions хүснэгтийн бүх өгөгдлийг татах
app.get("/adoptions", async (req, res) => {
    try {
        // Query to fetch all records from adoptions table
        const query = "SELECT * FROM adoptions";
        
        // Execute the query
        const result = await pool.query(query);
        
        // Send back the rows as response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching adoptions:", err.message);
        res.status(500).json({ error: "Failed to fetch adoptions" });
    }
});


// Redirect to index.html
app.get('*', (req, res) => {
    res.redirect('/htmls/index.html');
});

// Сервер эхлүүлэх
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    console.log(`📄 Swagger docs available at: http://localhost:${PORT}/api-docs`);
});
