// কাস্টমারদের অর্ডারের ডেটা সাময়িকভাবে জমা রাখার জন্য ইন-মেমোরি অ্যারে
const orders = [];

// ১. নতুন অর্ডার তৈরি বা প্লেস করার লজিক
const placeOrder = async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, phone } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "আপনার কার্টটি খালি! কোনো পণ্য ছাড়া অর্ডার করা যাবে না।" });
        }

        // ডেলিভারি চার্জ এবং সর্বমোট মূল্য হিসাব করা (যেমন: ডেলিভারি চার্জ ৬০ টাকা)
        const deliveryCharge = 60;
        const grandTotal = Number(totalPrice) + deliveryCharge;

        // নতুন অর্ডার অবজেক্ট তৈরি
        const newOrder = {
            orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000), // একটি র্যান্ডম অর্ডার নাম্বার জেনারেট করা
            userId,
            products: cartItems,
            itemsCount: cartItems.length,
            subTotal: Number(totalPrice),
            deliveryCharge: deliveryCharge,
            grandTotal: grandTotal,
            shippingAddress,
            phone,
            paymentStatus: "Cash on Delivery (COD)", // আপাতত ক্যাশ অন ডেলিভারি
            orderStatus: "Pending", // নতুন অর্ডারের ডিফল্ট স্ট্যাটাস
            orderDate: new Date().toLocaleString()
        };

        // অর্ডারের লিস্টে পুশ করা
        orders.push(newOrder);

        res.status(201).json({
            message: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! 🛍️",
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ message: "অর্ডার প্লেস করতে সমস্যা হয়েছে", error: error.message });
    }
};

// ২. নির্দিষ্ট ইউজারের সব অর্ডারের হিস্টোরি দেখার লজিক
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        // ফিল্টার করে শুধু এই ইউজারের অর্ডারগুলো বের করা
        const userOrders = orders.filter(order => order.userId === userId);

        res.json({
            userId,
            totalOrders: userOrders.length,
            orders: userOrders
        });
    } catch (error) {
        res.status(500).json({ message: "অর্ডারের তথ্য লোড করতে সমস্যা হয়েছে", error: error.message });
    }
};

module.exports = { placeOrder, getUserOrders };
