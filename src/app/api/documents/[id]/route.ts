import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // URL 파라미터에서 문서 ID 추출

  // 문서 데이터를 삭제
  const { data, error } = await supabase
    .from("documents")
    .delete() // 데이터 삭제
    .eq("id", id); // 특정 ID의 데이터만 삭제

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 삭제 성공 시 메시지 반환
  return NextResponse.json(
    { message: "Document deleted successfully.", data },
    { status: 200 }
  );
}
