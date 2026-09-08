// প্রোডাক্টগুলো সাময়িকভাবে জমা রাখার জন্য ইন-মেমোরি অ্যারে
const products = [
    // টেস্ট করার জন্য আগে থেকেই একটি ডামি প্রোডাক্ট রেখে দিলাম
    {
        _id: "prod1",
        title: "Premium Wireless Headphone",
        description: "High-quality sound with bass boost and 40h battery life.",
        price: 2500,
        imageUrl: "https://unsplash.com",
        category: "Electronics",
        stockCount: 15
    }
];

// ১. সব প্রোডাক্ট গেট (Get) করার লজিক (কাস্টমারদের জন্য)
const getProducts = async (req, res) => {
    try {
        res.json({
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ message: "প্রোডাক্ট লোড করতে সমস্যা হয়েছে", error: error.message });
    }
};

// ২. নতুন প্রোডাক্ট অ্যাড (Add) করার লজিক (অ্যাডমিনের জন্য)
const createProduct = async (req, res) => {
    try {
        const { title, description, price, imageUrl, category, stockCount } = req.body;

        const newProduct = {
            _id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            price: Number(price),
            imageUrl: imageUrl || "https://placehold.co",
            category,
            stockCount: Number(stockCount) || 10
        };

        products.push(newProduct);

        res.status(201).json({
            message: "নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে! 📦",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ message: "পণ্য যুক্ত করতে সমস্যা হয়েছে", error: error.message });
    }
};

module.exports = { getProducts, createProduct };
