import { ObjectId } from "mongodb";
import Joi from "joi";
import clientPromise from "../../../lib/db";


const userPostSchema = Joi.object({
    googleId: Joi.string().optional(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid("user", "admin").default("user").required(),
    date_of_birth: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // matches "DD-MM-YYYY"
        .optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    password: Joi.string().min(6).required(), // must hash before saving
});

export async function GET(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);
        const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) });

        if (!user) return Response.json({ error: "Not found" }, { status: 404 });

        return Response.json(user);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        const { error, value } = userPostSchema.validate(body);

        if (error) return Response.json({ error: error.details[0].message }, { status: 400 });

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(params.id) },
            { $set: value }
        );

        return Response.json({ modifiedCount: result.modifiedCount });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);

        const result = await db.collection("users").deleteOne({ _id: new ObjectId(params.id) });

        return Response.json({ deletedCount: result.deletedCount });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
