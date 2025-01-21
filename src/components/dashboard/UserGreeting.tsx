"use client";

import React, { useState, useEffect } from "react";

// 랜덤 환영 메시지 배열
// 랜덤 환영 메시지 배열
const greetings = [
  "안녕하세요, {position}의 {name} {level}님! 오늘도 좋은 하루 되세요. 😊",
  "{position}의 에이스, {name} {level}님을 환영합니다! 💪",
  "우양신소재 {position}에서 또 하나의 멋진 하루를 만들어가요, {name} {level}님! 🚀",
  "{position}의 든든한 기둥, {name} {level}님 반갑습니다! 🌟",
  "우양신소재 {position}과 함께 도약할 준비 되셨나요, {name} {level}님?",
  "{position}의 열정적인 리더, {name} {level}님 환영합니다!",
  "{name} {level}님, {position}에서 오늘도 최선을 다해주세요!",
  "안녕하세요, {position}의 {name} {level}님! 새로운 성과가 기다리고 있습니다. ✨",
  "{position}의 밝은 미래를 함께 만들어가요, {name} {level}님! 🌈",
  "{position}의 활약이 기대되는 하루입니다. 화이팅, {name} {level}님! 😊",
  "우양신소재 {position}에서 빛나는 성과를 만들어가요, {name} {level}님.",
  "{name} {level}님, {position}에서 멋진 결과 기대할게요!",
  "{position}의 성공 파트너 {name} {level}님, 오늘도 힘내세요! 💼",
  "안녕하세요, {position}의 {name} {level}님! 영업관리 페이지에 오신 것을 환영합니다.",
  "우양신소재 {position}과 함께 목표를 달성해봐요, {name} {level}님! 🎯",
  "안녕하세요, {position}의 {name} {level}님! 오늘도 화이팅입니다! 💪",
  "{position}의 소중한 일원 {name} {level}님, 감사합니다.",
  "우양신소재 {position}과 함께 새로운 도전에 나서봅시다, {name} {level}님!",
  "{position}의 {name} {level}님, 오늘도 멋진 하루 되세요! 🌟",
  "안녕하세요, {position}의 열정 가득한 {name} {level}님!",
  "{position}에서의 오늘 하루도 기대됩니다, {name} {level}님!",
  "{name} {level}님, {position}에서의 성공을 응원합니다! 🎉",
  "{position}에서 함께 성장하는 하루 되세요, {name} {level}님. 🌱",
  "우양신소재 {position}의 에너지 넘치는 하루를 응원합니다, {name} {level}님!",
  "{position}의 성공 열쇠, {name} {level}님 환영합니다. 🗝️",
  "{position}에서의 빛나는 성과를 만들어보세요, {name} {level}님!",
  "{position}의 {name} {level}님, 오늘도 화이팅! 😊",
  "안녕하세요, {position}의 든든한 리더 {name} {level}님!",
  "우양신소재 {position}과 함께 더 높은 곳으로! 🚀 {name} {level}님!",
  "{position}의 {name} {level}님, 멋진 하루 보내세요. ✨",
  "오늘도 {position}에서 멋진 도전을 기대합니다, {name} {level}님!",
  "{position}의 힘찬 하루를 만들어가요, {name} {level}님. 💼",
  "우양신소재 {position}의 든든한 지원군, {name} {level}님 환영합니다!",
  "{position}의 {name} {level}님, 오늘도 활기차게 시작하세요!",
  "{position}과 함께 성장하는 하루가 되기를 바랍니다, {name} {level}님.",
  "안녕하세요, {position}의 멋진 리더십을 기대합니다, {name} {level}님!",
  "{name} {level}님, 우양신소재 {position}에서 빛나는 성과를 기대합니다.",
  "오늘 하루도 성공으로 가득 채워보세요, {name} {level}님! 💪",
  "{name} {level}님, {position}에서의 도전과 성공을 응원합니다. 🌟",
  "{name} {level}님, {position}에서 최고를 향해 나아가세요! 🚀",
  "함께 힘을 모아 {position}의 목표를 달성해봐요, {name} {level}님!",
  "우양신소재 {position}에서 {name} {level}님과 함께하는 하루를 기대합니다. ✨",
  "{position}의 {name} {level}님, 오늘도 화이팅입니다! 😊",
  "당신의 노력은 {position}의 성공을 만듭니다. 힘내세요, {name} {level}님! 💼",
  "오늘도 {position}에서 최고를 목표로 달려봅시다, {name} {level}님!",
  "안녕하세요, {name} {level}님! {position}에서의 새로운 성과를 기대합니다.",
  "우양신소재 {position}의 미래를 함께 만들어갑시다, {name} {level}님!",
  "{position}의 {name} {level}님, 오늘도 힘차게 출발하세요! 🚀",
  "우양신소재 {position}과 함께 멋진 성과를 만들어봅시다! 🌟",
  "{position}의 든든한 지원군, {name} {level}님 반갑습니다. 😊",
  "{name} {level}님, {position}에서 목표 달성을 응원합니다! 🎯",
  "{position}의 {name} {level}님, 도전은 언제나 옳습니다. 화이팅! 💼",
  "오늘도 {position}에서 빛나는 하루가 되길 바라요, {name} {level}님! 🌈",
  "우양신소재 {position}의 {name} {level}님과 함께합니다. 💪",
  "{name} {level}님, {position}에서 최선을 다해주세요. 😊",
  "{position}의 {name} {level}님, 성공을 응원합니다! 🌟",
  "안녕하세요, {position}의 {name} {level}님! 새로운 도전을 기대합니다.",
  "우양신소재 {position}의 리더, {name} {level}님 환영합니다! 🚀",
  "{position}의 {name} {level}님, 오늘도 활기찬 하루 되세요! 😊",
  "우양신소재 {position}과 함께 더 나은 미래를 만들어봐요! 🌟",
  "{name} {level}님, {position}에서 멋진 결과를 기대합니다. 💼",
  "오늘도 {position}에서 새로운 성과를 창출하세요, {name} {level}님! ✨",
  "우양신소재 {position}의 {name} {level}님, 열정적인 하루를 응원합니다! 🌈",
  "{position}의 {name} {level}님, 목표를 향해 달려가요! 🚀",
  "{name} {level}님, {position}에서의 성공을 응원합니다! 🎉",
  "안녕하세요, {position}의 {name} {level}님! 오늘도 화이팅입니다. 💪",
  "{position}의 {name} {level}님, 멋진 결과를 기대할게요. 😊",
  "우양신소재 {position}의 에너지 넘치는 {name} {level}님 환영합니다! 🌟",
  "안녕하세요, {name} {level}님! {position}에서 함께 성장해봐요. 🌱",
  "{position}의 성공을 함께 만들어가요, {name} {level}님! 💼",
  "{position}에서의 오늘 하루도 기대됩니다, {name} {level}님! 😊",
  "우양신소재 {position}과 함께 새로운 가능성을 열어가요, {name} {level}님! 🌟",
  "{position}의 {name} {level}님, 오늘도 멋진 하루를 응원합니다. 🚀",
  "{name} {level}님, {position}에서의 활약을 기대합니다. 🌈",
  "우양신소재 {position}의 빛나는 별, {name} {level}님 환영합니다! 😊",
  "안녕하세요, {position}의 {name} {level}님! 성공적인 하루 되세요. ✨",
  "{position}의 {name} {level}님, 오늘도 도전을 응원합니다! 💼",
  "우양신소재 {position}에서의 성장을 응원합니다, {name} {level}님! 🌱",
  "안녕하세요, {position}의 {name} {level}님! 목표를 향해 함께해요. 🚀",
  "{position}의 든든한 리더, {name} {level}님 반갑습니다! 😊",
  "우양신소재 {position}의 {name} {level}님, 최고의 하루 되세요. 🌟",
  "{name} {level}님, {position}에서 힘차게 시작해봐요! 💪",
  "우양신소재 {position}과 함께 성과를 만들어가요, {name} {level}님! ✨",
  "{position}의 {name} {level}님, 오늘도 최선을 다해주세요. 😊",
  "안녕하세요, {position}의 {name} {level}님! 성공적인 하루 되세요! 🚀",
  "{position}에서의 도전을 응원합니다, {name} {level}님! 🌟",
  "우양신소재 {position}의 {name} {level}님, 환영합니다! 😊",
  "{position}에서의 성과를 응원합니다, {name} {level}님! 💼",
  "{position}의 {name} {level}님, 오늘도 화이팅입니다. 🚀",
  "우양신소재 {position}의 빛나는 별, {name} {level}님 환영합니다. 🌟",
  "안녕하세요, {position}의 {name} {level}님! 멋진 하루 되세요! 😊",
  "{name} {level}님, {position}에서의 성공을 응원합니다! 🚀",
  "우양신소재 {position}의 열정 가득한 {name} {level}님과 함께합니다! 💼",
  "안녕하세요, {position}의 {name} {level}님! 오늘도 화이팅입니다. 🌈",
  "우양신소재 {position}의 {name} {level}님, 최고의 성과를 기대합니다. 🚀",
];
// 컴포넌트

const UserGreeting = ({
  name,
  position,
  level,
}: {
  name: string;
  position: string;
  level: string;
}) => {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    // 랜덤으로 그리팅 메시지 선택 및 동적 값 대체
    const randomGreeting = greetings[
      Math.floor(Math.random() * greetings.length)
    ]
      .replace("{name}", name)
      .replace("{position}", position)
      .replace("{level}", level);

    setGreeting(randomGreeting);
  }, [name, position, level]);

  return (
    <div>
      <p className="font-semibold text-lg">{greeting}</p>
    </div>
  );
};

export default UserGreeting;
