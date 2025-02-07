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
                                    animal: { type: "string", example: "dog" },
                                    size: { type: "string", example: "XS" },
                                    colors: { type: "string", example: "Red,Blue,Green" },
                                    origin: { type: "string", example: "import" },
                                    certification: { type: "string", example: "Yes" },
                                    start_date: { type: "string", format: "date", example: "2025-01-01" },
                                    end_date: { type: "string", format: "date", example: "2025-12-31" },
                                    images: { type: "text", example: "https://example.com/image1.jpg" },
                                    price: { type: "number", example: 5000 },
                                    piece: { type: "integer", example: 100 },
                                },
                                required: [
                                    "name",
                                    "code",
                                    "type",
                                    "animal",
                                    "size",
                                    "colors",
                                    "origin",
                                    "certification",
                                    "piece",
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
                                            price: { type: "number", example: 5000 },
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


        
        "/products/search/{search}": {
            get: {
                summary: "Search products by name or code",
                parameters: [
                    {
                        name: "search",
                        in: "path",
                        required: true,
                        description: "Хайх утга (e.g., бүтээгдэхүүний нэр эсвэл код)",
                        schema: { type: "string",
                                 example: "test"  },
                    },
                ],
                responses: {
                    200: {
                        description: "Амжилттай хайлт",
                        content: {
                            "application/json": {
                                schema: {
                                        type: "object",
                                        properties: {
                                            prod_id: { type: "integer", example: 1 },
                                            prod_name: { type: "string", example: "Example Product" },
                                            prod_code: { type: "string", example: "123ABC" },
                                            prod_type: { type: "string", example: "type1" },
                                            prod_size: { type: "string", example: "XS" },
                                            prod_color: { type: "array", items: { type: "string" }, example: ["Red", "Blue", "Green"] },
                                            origin: { type: "string", example: "import" },
                                            certification: { type: "string", example: "Yes" },
                                            start_date: { type: "string", format: "date", example: "2025-01-01" },
                                            end_date: { type: "string", format: "date", example: "2025-12-31" },
                                            piece: { type: "integer", example: 100 },
                                            price: { type: "number", example: 5000 },
                                            subpic: { type: "string", format: "uri", example: "https://example.com/image1.jpg" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: "Хайх утга буруу байна." },
                    500: { description: "Хайлтын алдаа." },
            },
        },

        "/products/{id}": {
            get: {
                summary: "Retrieve a product by ID",
                description: "Fetch a specific product's details using its unique ID.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Unique ID of the product to retrieve.",
                        schema: {
                            type: "integer",
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Product details retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        prod_id: { type: "integer", example: 1 },
                                        prod_name: { type: "string", example: "Example Product" },
                                        prod_code: { type: "string", example: "123ABC" },
                                        prod_type: { type: "string", example: "type1" },
                                        prod_animal: { type: "string", example: "dog" },
                                        prod_size: { type: "string", example: "XS" },
                                        colors: { type: "array", "items": { type: "string" }, example: ["Red", "Blue", "Green"] },
                                        origin: { type: "string", example: "import" },
                                        certification: { type: "string", example: "Yes" },
                                        start_date: { type: "string", format: "date", example: "2025-01-01" },
                                        end_date: { type: "string", format: "date", example: "2025-12-31" },
                                        piece: { type: "integer", example: 100 },
                                        price: { type: "number", example: 5000.00 },
                                        subpic: { type: "text", example: "https://example.com/image1.jpg" },
                                    }
                                }
                            }
                        }
                    },
                    400: { description: "Invalid product ID provided" },
                    404: { description: "Product not found" },
                    500: { description: "Error retrieving product" }
                }
            }
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
                                    text: { type: "text", example: "nohoinii maani zurag" },
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
        animal,
        size,
        colors,
        origin,
        certification,
        start_date,
        end_date,
        piece,
        price,
        images,
    } = req.body;

    // Validation
    if (isNaN(piece) || isNaN(price)) {
        return res.status(400).json({ error: "Piece and price should be numeric values." });
    }
    if (!name || !code || !type || !animal || !size || !colors || !origin || !price || !images) {
        return res.status(400).json({ error: "Required fields are missing or images are empty." });
    }
    try {
        const query = `
            INSERT INTO products (prod_name, prod_code, prod_type, prod_animal, prod_size, prod_color, origin, certification, start_date, end_date, piece, price, subpic) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
            RETURNING *`;

        const values = [
            name,
            code,
            type,
            animal,
            size,
            `{${colors.split(",").map((color) => color.trim()).join(",")}}`,
            origin,
            certification,
            start_date,
            end_date,
            piece,
            price,
            images
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


app.get('/products/search/:search', async (req, res) => {
    const { search } = req.params; // "query" биш "search" гэж зөв оноож авна

    console.log('Query параметр:', search);

    try {
        const sqlQuery = `
            SELECT prod_id , 
                prod_name , 
                prod_code, 
                prod_type, 
                prod_animal, 
                prod_size, 
                ARRAY(SELECT UNNEST(prod_color)) AS prod_color, 
                origin, 
                certification, 
                start_date, 
                end_date, 
                piece, 
                price, 
                subpic
            FROM products 
            WHERE prod_name ILIKE $1 OR prod_code ILIKE $1
        `;
        const values = [`%${search}%`]; // LIKE хайлт хийхийн тулд '%search%' гэж бичнэ

        const result = await pool.query(sqlQuery, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Бүтээгдэхүүн олдсонгүй.' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error searching products:', err.message);
        res.status(500).json({ error: 'Failed to search products.' });
    }
});



app.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    // Validation: Check if ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID. It should be a numeric value." });
    }

    try {
        const query = `
            SELECT 
                prod_id , 
                prod_name , 
                prod_code, 
                prod_type, 
                prod_animal, 
                prod_size, 
                ARRAY(SELECT UNNEST(prod_color)) AS colors, 
                origin, 
                certification, 
                start_date, 
                end_date, 
                piece, 
                price, 
                subpic
            FROM products 
            WHERE prod_id = $1
        `;
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error retrieving product:", err.message);
        res.status(500).json({ error: "Failed to retrieve product" });
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
    if (!name || !factory || !age || !sex || !type || !image || !phone) {
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

// Сервер эхлүүлэх
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    console.log(`📄 Swagger docs available at: http://localhost:${PORT}/api-docs`);
});
