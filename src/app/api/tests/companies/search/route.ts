import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("name");

  if (!searchTerm) {
    return NextResponse.json({ companies: [] });
  }

  try {
    const { data, error } = await supabase
      .from("companies")
      .select("id, name")
      .ilike("name", `%${searchTerm}%`)

      .limit(30);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ companies: data });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
