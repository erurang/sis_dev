import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // context.params에서 회사 ID 추출

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id) // 특정 ID에 해당하는 회사 검색
    .single(); // 단일 결과 반환

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // context.params에서 회사 ID 추출
  const body = await req.json(); // 요청에서 수정할 데이터 추출

  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("companies")
    .update(body) // body의 데이터를 업데이트
    .eq("id", id); // 특정 ID의 회사만 업데이트

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Company updated successfully", data },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // context.params에서 회사 ID 추출

  const { data, error } = await supabase
    .from("companies")
    .delete() // 데이터 삭제
    .eq("id", id); // 특정 ID의 데이터만 삭제

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Company deleted successfully.", data },
    { status: 200 }
  );
}
