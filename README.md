# PostgreSQL тохируулах заавар

Энэхүү заавар нь PostgreSQL суулгаж, төслийн шаардлагатай хүснэгтүүдийг үүсгэх зааварчилгааг агуулна.

---

## Урьдчилсан нөхцөлүүд

- PostgreSQL суулгасан байх. [PostgreSQL татах](https://www.postgresql.org/download/).
- PostgreSQL болон SQL командын үндсэн ойлголттой байх.

---

## Алхам 1: PostgreSQL-д холбогдох

1. Терминал эсвэл командын мөрийг нээнэ үү.
2. Доорх командыг ашиглан PostgreSQL-д холбогдоно:
   ```bash
   psql -U postgres -d testdb
   ```
   `postgres`-ыг хэрэглэгчийн нэрээр, `testdb`-ыг баазын нэрээр солино.

   Хэрэв `testdb` бааз байхгүй бол доорх командыг ашиглан үүсгэнэ:
   ```sql
   CREATE DATABASE testdb;
   ```

---

## Алхам 2: Хүснэгтүүд үүсгэх

Доорх SQL командыг ашиглан шаардлагатай хүснэгтүүдийг үүсгэнэ:

### 1. **Хүснэгт: `products`**

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    prod_name VARCHAR(255) NOT NULL,
    prod_code VARCHAR(100) NOT NULL UNIQUE,
    prod_type VARCHAR(100) NOT NULL,
    prod_size TEXT[] NOT NULL,
    prod_color TEXT[] NOT NULL,
    origin VARCHAR(50) NOT NULL,
    manufacture_date DATE,
    expiry_date DATE,
    price_amount NUMERIC(10, 2) NOT NULL,
    piece INT NOT NULL,
    subpic TEXT[]
);
```

### 2. **Хүснэгт: `adoptions`**

```sql
CREATE TABLE adoptions (
    id SERIAL PRIMARY KEY,
    adopt_name VARCHAR(255) NOT NULL,
    adopt_factory VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    sex CHAR(1) NOT NULL,
    animal_type VARCHAR(100) NOT NULL,
    details TEXT,
    phone BIGINT NOT NULL,
    image TEXT NOT NULL,
    text TEXT
);
```

### 3. **Хүснэгт: `users`**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

---

## Алхам 3: Хүснэгтүүдийг шалгах

1. Доорх командыг ажиллуулна:

   ```sql
   \dt
   ```

2. `products`, `adoptions`, `users` хүснэгтүүд гарч ирэх ёстой.

---

## Алхам 4: Жишээ өгөгдөл оруулах

### Жишээ бүтээгдэхүүн нэмэх:

```sql
INSERT INTO products (prod_name, prod_code, prod_type, prod_size, prod_color, origin, manufacture_date, expiry_date, price_amount, piece, subpic)
VALUES ('Example Product', '123ABC', 'type1', ARRAY['XS', 'L', 'M'], ARRAY['Red', 'Blue', 'Green'], 'import', '2025-01-01', '2025-12-31', 5000.00, 100, ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
```

### Жишээ үрчлэлт нэмэх:

```sql
INSERT INTO adoptions (adopt_name, adopt_factory, age, sex, animal_type, details, phone, image, text)
VALUES ('Example Adoption', 'Havchaarik', 3, 'F', 'Dog', 'Good dog. i love dog.', 89259999, 'https://example.com/image1.jpg', 'nohoinii maani zurag');
```

### Жишээ хэрэглэгч нэмэх:

```sql
INSERT INTO users (username, phone_number, password)
VALUES ('Nomin', 89259999, '0120');
```

---

## Алхам 5: Өгөгдлийг авах

### Бүх бүтээгдэхүүнийг авах:

```sql
SELECT * FROM products;
```

### Бүх үрчлэлтийг авах:

```sql
SELECT * FROM adoptions;
```

### Бүх хэрэглэгчийг авах:

```sql
SELECT * FROM users;
```

---

## Сервер ажиллуулах

1. **PostgreSQL интеграцийн сервер:**
   ```bash
   node app.mjs
   ```

2. **Вэб сервер ажиллуулах:**
   ```bash
   node server.mjs
   ```

3. **Шалгах:**
   Хөтөч дээр `http://localhost:3000` хаягаар ороорой.

---

Амжилт хүсье! 🚀

