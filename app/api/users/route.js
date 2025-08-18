import Joi from "joi";
import bcrypt from "bcrypt";   // ✅ Add bcrypt
import clientPromise from "../../lib/db";

const userPostSchema = Joi.object({
    googleId: Joi.string().optional(),
    name: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid("user", "admin").default("user").optional(),
    date_of_birth: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // matches "DD-MM-YYYY"
        .optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email(),
    mobile: Joi.string().pattern(/^[6-9]\d{9}$/),
})
    .or("email", "mobile")   // ✅ at least one required
    .messages({
        "object.missing": "Either email or mobile is required",
    });


const resetPasswordSchema = Joi.object({
    email: Joi.string().email(),
    mobile: Joi.string().pattern(/^[6-9]\d{9}$/),
    newPassword: Joi.string().min(6).required(),
}).xor("email", "mobile");

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);
        const users = await db.collection("users").find().toArray();

        return Response.json(users);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { error, value } = userPostSchema.validate(body);

        if (error) {
            return Response.json({ error: error.details[0].message }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword;

        const result = await db.collection("users").insertOne(value);

        return Response.json({ insertedId: result.insertedId });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// 🔹 Reset Password API
export async function PUT(req) {
    try {
        const body = await req.json();
        const { error, value } = resetPasswordSchema.validate(body);

        if (error) {
            return Response.json({ error: error.details[0].message }, { status: 400 });
        }

        const { email, mobile, newPassword } = value;

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);

        // find user by email or mobile
        const query = email ? { email } : { mobile };
        const user = await db.collection("users").findOne(query);

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // ✅ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password
        await db.collection("users").updateOne(query, {
            $set: { password: hashedPassword },
        });

        return Response.json({ message: "Password updated successfully" });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
