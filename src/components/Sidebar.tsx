"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginUser } from "@/context/login";
import SnackbarComponent from "./Snackbar";
import { useFavorites } from "@/hooks/favorites/useFavorites";

interface MenuItem {
  id: string; // ✅ 유니크한 ID 추가
  title: string;
  path: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function Sidebar() {
  const user = useLoginUser();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { favorites, isLoading, isError, removeFavorite } = useFavorites(
    user?.id
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) return <></>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <>
      <motion.div
        className="w-56 bg-[#F8F8F7] min-h-screen border-r-2 px-2 pt-2 text-sm text-[#5F5E5B] transition-all duration-300"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="py-1 px-2 rounded-sm flex items-center">
          {user?.position} {user?.name} {user?.level}
        </div>
        <nav className="mt-2">
          <div>
            <div
              className="py-2 px-3 cursor-pointer hover:bg-slate-300 rounded-sm font-bold flex justify-between"
              onClick={() => setOpenFavorites((prev) => !prev)}
            >
              ⭐ 즐겨찾기
              <motion.span
                animate={{ rotate: openFavorites ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.span>
            </div>

            <AnimatePresence>
              {openFavorites && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {favorites.length > 0 ? (
                    favorites.map((menu: any) => (
                      <motion.div
                        key={menu.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between py-2 px-4 hover:bg-slate-200 transition-all rounded-sm"
                      >
                        <Link href={`/consultations/${menu.item_id}`}>
                          <span>{menu.name}</span>
                        </Link>
                        {/* <span
                          className="text-red-500 cursor-pointer"
                          onClick={async () => {
                            await removeFavorite(menu.id);
                            setSnackbarMessage("즐겨찾기에서 삭제되었습니다.");
                          }}
                        >
                          삭제
                        </span> */}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center my-1">
                      즐겨찾기 없음
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {menuSections.map((section) => (
            <div key={section.title}>
              <div
                className="py-2 px-3 cursor-pointer hover:bg-slate-300 rounded-sm font-bold flex justify-between"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <motion.span
                  animate={{ rotate: openSections[section.title] ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▶
                </motion.span>
              </div>

              {/* 메뉴 리스트 애니메이션 적용 */}
              <AnimatePresence>
                {openSections[section.title] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {section.items.map((menu) => (
                      <Link href={menu.path} key={menu.id}>
                        <div className="py-2 px-4 cursor-pointer hover:bg-slate-200 transition-all rounded-sm">
                          <span>{menu.title}</span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </motion.div>

      {/* 스낵바 알림 */}
      <SnackbarComponent
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </>
  );
}

const menuSections: MenuSection[] = [
  {
    title: "📊 대시보드",
    items: [
      { id: "dashboard", title: "대시보드", path: "/" },
      { id: "todos", title: "할일", path: "" },
      { id: "calendar", title: "캘린더", path: "" },
    ],
  },
  {
    title: "🏢 거래처 관리",
    items: [
      { id: "customers", title: "거래처 검색", path: "/manage/customers" },
      { id: "contacts", title: "담당자 검색", path: "/manage/contacts" },
      { id: "recent", title: "최근 상담내역", path: "/consultations/recent" },
    ],
  },
  {
    title: "📄 문서 관리",
    items: [
      // { id: "documents", title: "문서 전체", path: "/documents" },
      {
        id: "estimate",
        title: "견적서 관리",
        path: "/documents/details?type=estimate&status=pending",
      },
      {
        id: "order",
        title: "발주서 관리",
        path: "/documents/details?type=order&status=pending",
      },
      {
        id: "requestQuote",
        title: "의뢰서 관리",
        path: "/documents/details?type=requestQuote&status=pending",
      },
    ],
  },
  {
    title: "💰 매입/매출 관리",
    items: [
      {
        id: "order-unit",
        title: "매입 단가 관리",
        path: "/products/unit?type=order",
      },
      {
        id: "estimate-unit",
        title: "매출 단가 관리",
        path: "/products/unit?type=estimate",
      },
    ],
  },
  {
    title: "📈 영업 성과 분석",
    items: [
      {
        id: "sales-report",
        title: "매출/매입 리포트",
        path: "/reports",
      },
      {
        id: "sales-users",
        title: "영업 직원",
        path: `/reports/users`,
      },
      // {
      //   id: "performance",
      //   title: "영업 성과 요약",
      //   path: `/reports/performance?year=${new Date().getFullYear()}`,
      // },
      {
        id: "performance-order",
        title: "영업 상세 (매입)",
        path: `/reports/performance/details?type=order`,
      },
      {
        id: "performance-estimate",
        title: "영업 상세 (매출)",
        path: `/reports/performance/details?type=estimate`,
      },
    ],
  },
];
