import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    /** 📌 1️⃣ 최근 상담한 고객 리스트 가져오기 */
    const { data: recentConsultations, error: consultationsError } =
      await supabase
        .from("contacts_consultations")
        .select("contacts(contact_name), created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

    if (consultationsError) {
      return NextResponse.json(
        {
          error: `Error fetching recent consultations: ${consultationsError.message}`,
        },
        { status: 500 }
      );
    }

    const formattedConsultations = recentConsultations.map((rc) => ({
      created_at: rc.created_at,
      contact_name: (rc as any).contacts?.contact_name,
    }));

    /** 📌 2️⃣ 최근 문서를 진행한 고객 리스트 가져오기 */
    const { data: recentDocuments, error: documentsError } = await supabase
      .from("contacts_documents")
      .select("created_at, documents(content)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (documentsError) {
      return NextResponse.json(
        { error: `Error fetching recent documents: ${documentsError.message}` },
        { status: 500 }
      );
    }

    const formattedDocuments = recentDocuments?.map((doc) => ({
      company_name: (doc as any).documents?.content?.company_name,
      created_at: doc.created_at,
    }));

    return NextResponse.json({
      recent_consultations: formattedConsultations,
      recent_documents: formattedDocuments,
    });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}
