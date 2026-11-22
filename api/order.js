
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    try {
        const { name, phone, address, items, total } = req.body;

        if (!name || !phone || !address || !items || !total) {
            return res.status(400).json({
                message: "Please fill all order details"
            });
        }

        const { data, error } = await supabase
            .from("orders")
            .insert([{
                customer_name: name,
                phone: phone,
                address: address,
                items: items,
                total: total,
                status: "Pending"
            }])
            .select();

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Could not save order"
            });
        }

        return res.status(200).json({
            message: "Your order received successfully!",
            order: data[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
