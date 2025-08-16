import Joi from "joi";
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
})
    .xor("email", "mobile")
    .keys({
        email: Joi.string().email().allow('').optional(),
        mobile: Joi.string().pattern(/^[6-9]\d{9}$/).allow('').optional(),
    });


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

        const result = await db.collection("users").insertOne(value);

        return Response.json({ insertedId: result.insertedId });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

