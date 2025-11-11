import { NextResponse } from "next/server";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function GET() {
  try {
    await dbServer.connect(process.env.DATABASE_URL);

    const embalses = await embalsesRepository.obtenerEmbalses();

    await dbServer.disconnect();
    return NextResponse.json(embalses);
  } catch (error) {
    console.error("Error fetching embalses:", error);
    return NextResponse.json(
      { error: "Failed to fetch embalses" },
      { status: 500 }
    );
  }
}
