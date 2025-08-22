import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/products  → list products from DB
export async function GET() {
  const client = await clientPromise;
  const db = client.db("easy_shop");
  const docs = await db.collection("products").find({}).sort({ _id: -1 }).limit(100).toArray();
  return NextResponse.json(docs);
}

// POST /api/products  → create product (auth required)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price } = body || {};
  if (!name || !description || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("easy_shop");

  const doc = {
    name,
    description,
    price,
    createdAt: new Date(),
    createdBy: session.user?.email || session.user?.id || "unknown",
  };

  const result = await db.collection("products").insertOne(doc);
  return NextResponse.json({ _id: result.insertedId, ...doc }, { status: 201 });
}
