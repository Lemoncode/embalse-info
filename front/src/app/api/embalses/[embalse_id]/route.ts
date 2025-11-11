import { NextResponse } from "next/server";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function GET(
  request: Request,
  { params }: { params: { embalse_id: string } }
) {
  try {
    await dbServer.connect(process.env.DATABASE_URL);
    const embalse = await embalsesRepository.obtenerEmbalsePorId(
      params.embalse_id
    );
    if (!embalse) {
      return NextResponse.json({ error: "Embalse not found" }, { status: 404 });
    }
    await dbServer.disconnect();
    return NextResponse.json(embalse);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
