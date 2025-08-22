import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = await params; // Next 15: params is async
  try {
    const client = await clientPromise;
    const db = client.db("easy_shop");
    const doc = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch {
    // allow non-ObjectId mock IDs gracefully (optional)
    const client = await clientPromise;
    const db = client.db("easy_shop");
    const doc = await db.collection("products").findOne({ id }); // fallback
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  }
}
