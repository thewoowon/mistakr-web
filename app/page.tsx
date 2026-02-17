"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.5);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = 0;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────── Hero Section ─────────────── */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--blue-500)] opacity-[0.06] blur-[120px]" />
        <div className="animate-pulse-slow delay-500 absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[var(--gradient-end)] opacity-[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="animate-fade-up rounded-full border border-[var(--gray-200)] bg-white px-5 py-2 text-sm font-medium text-[var(--gray-600)] shadow-sm">
          실패를 자산으로 바꾸는 첫 번째 서비스
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up delay-100 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[var(--gray-900)] opacity-0 sm:text-6xl lg:text-7xl">
          남의 실패에서 배우면,
          <br />
          <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            내 성공 확률이 올라가요
          </span>
        </h1>

        {/* Sub copy */}
        <p className="animate-fade-up delay-200 max-w-xl text-lg leading-relaxed text-[var(--gray-600)] opacity-0 sm:text-xl">
          성공 사례는 넘쳐나는데, 실패 사례는 묻혀요.
          <br />
          Mistakr가 그 실패를 꺼내서 당신의 자산으로 만들어 드릴게요.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-300 flex flex-col gap-4 opacity-0 sm:flex-row">
          <button className="rounded-2xl bg-[var(--blue-500)] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[var(--blue-600)] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]">
            지금 시작하기
          </button>
          <button className="rounded-2xl border border-[var(--gray-200)] bg-white px-8 py-4 text-lg font-semibold text-[var(--gray-700)] transition-all hover:border-[var(--gray-300)] hover:bg-[var(--gray-50)] active:scale-[0.98]">
            실패 사례 둘러보기
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in delay-800 absolute bottom-12 flex flex-col items-center gap-2 opacity-0">
        <span className="text-xs text-[var(--gray-400)]">scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-[var(--gray-300)] to-transparent" />
      </div>
    </section>
  );
}

/* ─────────────── Problem Section ─────────────── */
function ProblemSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <div
        ref={ref}
        className={`mx-auto flex max-w-4xl flex-col items-center gap-16 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-base font-semibold tracking-wide text-[var(--blue-500)]">
            PROBLEM
          </span>
          <h2 className="text-4xl font-bold leading-tight text-[var(--gray-900)] sm:text-5xl">
            90%의 스타트업이 실패해요.
            <br />
            근데 &apos;왜&apos;인지 아는 사람은
            <br />
            <span className="text-[var(--red-500)]">거의 없어요.</span>
          </h2>
        </div>

        <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-3">
          {[
            {
              emoji: "🤐",
              title: "당사자는\n말하기 싫어해요",
              desc: "실패 경험은 아프니까요.",
            },
            {
              emoji: "📺",
              title: "미디어는\n관심이 없어요",
              desc: "성공 스토리가 더 잘 팔리거든요.",
            },
            {
              emoji: "🧩",
              title: "정보는\n파편화되어 있어요",
              desc: "흩어진 조각을 맞추기엔\n시간이 없죠.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--gray-100)] bg-[var(--gray-50)] p-8 transition-all duration-300 hover:border-[var(--gray-200)] hover:shadow-lg"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="whitespace-pre-line text-lg font-bold text-[var(--gray-900)]">
                {item.title}
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--gray-500)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Solution Section ─────────────── */
function SolutionSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[var(--gray-900)] px-6 py-32">
      <div
        ref={ref}
        className={`mx-auto flex max-w-4xl flex-col items-center gap-16 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-base font-semibold tracking-wide text-[var(--blue-500)]">
            SOLUTION
          </span>
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Mistakr는
            <br />
            이 문제를 정면으로 풀어요.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--gray-400)]">
            실제 스타트업 실패 사례를 수집하고, 시각화해서
            <br className="hidden sm:block" />
            &quot;어디서부터 잘못됐는지&quot;를 누구나 직관적으로 파악할 수
            있게 했어요.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          {[
            {
              icon: "🔍",
              title: "노드 그래프",
              desc: "실패의 인과관계를 한눈에.\n어디서 잘못됐는지 시각적으로 파악해요.",
              gradient: "from-blue-500/20 to-purple-500/20",
            },
            {
              icon: "⏱",
              title: "타임라인 슬라이더",
              desc: "시간순으로 사건 흐름을 재생해요.\n마치 다큐멘터리처럼.",
              gradient: "from-purple-500/20 to-pink-500/20",
            },
            {
              icon: "🎯",
              title: "스마트 필터",
              desc: "산업별, 실패유형별, 투자금액별.\n내 상황과 가장 비슷한 사례만 콕.",
              gradient: "from-pink-500/20 to-orange-500/20",
            },
            {
              icon: "💡",
              title: "교훈 카드",
              desc: "각 사례에서 뽑아낸 핵심 교훈.\n실패를 자산으로 바꾸는 순간.",
              gradient: "from-orange-500/20 to-blue-500/20",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <span className="relative text-3xl">{item.icon}</span>
              <h3 className="relative text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="relative whitespace-pre-line text-sm leading-relaxed text-[var(--gray-400)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── AI Section ─────────────── */
function AISection() {
  const { ref, isInView } = useInView();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <div
        ref={ref}
        className={`mx-auto flex max-w-4xl flex-col items-center gap-16 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-base font-semibold tracking-wide text-[var(--gradient-end)]">
            FAILURE AI
          </span>
          <h2 className="text-4xl font-bold leading-tight text-[var(--gray-900)] sm:text-5xl">
            수백만 원짜리 컨설팅,
            <br />
            <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              이제 AI가 해드릴게요.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--gray-600)]">
            내 아이디어를 입력하면, 유사한 실패 사례를 자동 매칭하고
            <br className="hidden sm:block" />
            7가지 리스크 점수를 산출해 드려요.
          </p>
        </div>

        {/* AI flow steps */}
        <div className="flex w-full max-w-2xl flex-col gap-0">
          {[
            {
              step: "01",
              title: "아이디어 입력",
              desc: "4단계로 간단하게. 기본정보부터 비즈니스 모델까지.",
            },
            {
              step: "02",
              title: "유사 실패 매칭",
              desc: "AI가 수백 개 사례에서 비슷한 실패 패턴을 찾아요.",
            },
            {
              step: "03",
              title: "리스크 분석",
              desc: "PMF, 재무, 경쟁 등 7가지 축으로 리스크 점수를 산출해요.",
            },
            {
              step: "04",
              title: "액션 플랜",
              desc: "위기 시점 예측과 지금 당장 실행할 체크리스트까지.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-6 py-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {item.step}
                </div>
                {i < 3 && (
                  <div className="mt-2 h-12 w-px bg-gradient-to-b from-[var(--blue-500)] to-transparent opacity-30" />
                )}
              </div>
              <div className="flex flex-col gap-1 pt-1 text-left">
                <h3 className="text-xl font-bold text-[var(--gray-900)]">
                  {item.title}
                </h3>
                <p className="text-base text-[var(--gray-500)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Stats Section ─────────────── */
function StatsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="flex flex-col items-center justify-center bg-[var(--gray-50)] px-6 py-32">
      <div
        ref={ref}
        className={`mx-auto flex max-w-4xl flex-col items-center gap-12 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <h2 className="text-4xl font-bold text-[var(--gray-900)] sm:text-5xl">
          숫자로 보는 Mistakr
        </h2>
        <div className="grid w-full gap-8 sm:grid-cols-3">
          {[
            { end: 500, suffix: "+", label: "수집된 실패 사례" },
            { end: 7, suffix: "가지", label: "리스크 분석 축" },
            { end: 90, suffix: "%", label: "스타트업 실패율" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-[var(--blue-500)] sm:text-6xl">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </span>
              <span className="text-base text-[var(--gray-500)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Target Section ─────────────── */
function TargetSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <div
        ref={ref}
        className={`mx-auto flex max-w-4xl flex-col items-center gap-16 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-base font-semibold tracking-wide text-[var(--blue-500)]">
            FOR YOU
          </span>
          <h2 className="text-4xl font-bold leading-tight text-[var(--gray-900)] sm:text-5xl">
            이런 분들을 위해
            <br />
            만들었어요.
          </h2>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-3">
          {[
            {
              emoji: "🚀",
              title: "예비 · 초기 창업자",
              desc: "\"이 아이디어 괜찮은 건가?\"\n비슷한 시도가 왜 실패했는지\n한눈에 파악하고 싶은 분",
              tag: "실패 사례 탐색",
            },
            {
              emoji: "🎯",
              title: "스타트업 대표",
              desc: "지금 방향이 맞는지,\n어떤 리스크를 놓치고 있는지\n객관적으로 점검받고 싶은 분",
              tag: "AI 리스크 진단",
            },
            {
              emoji: "💼",
              title: "투자자 · 멘토",
              desc: "투자 심사나 멘토링에서\n\"이전에 비슷한 시도가 왜 실패했는지\"\n레퍼런스가 필요한 분",
              tag: "데이터 활용",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-5 rounded-3xl border border-[var(--gray-100)] bg-white p-8 transition-all duration-300 hover:border-[var(--blue-500)]/20 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <span className="text-5xl">{item.emoji}</span>
              <span className="rounded-full bg-[var(--blue-500)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--blue-500)]">
                {item.tag}
              </span>
              <h3 className="text-xl font-bold text-[var(--gray-900)]">
                {item.title}
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--gray-500)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA Section ─────────────── */
function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--gray-900)] px-6 py-40">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/3 top-1/3 h-[600px] w-[600px] rounded-full bg-[var(--blue-500)] opacity-[0.08] blur-[150px]" />
        <div className="animate-pulse-slow delay-500 absolute bottom-1/3 right-1/3 h-[500px] w-[500px] rounded-full bg-[var(--gradient-end)] opacity-[0.08] blur-[150px]" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          실패도 자산이에요.
          <br />
          <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            지금 시작하세요.
          </span>
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--gray-400)]">
          남의 실패에서 배워서, 내 성공 확률을 높이세요.
          <br />
          Mistakr와 함께라면 실패는 더 이상 끝이 아니에요.
        </p>
        <button className="rounded-2xl bg-white px-10 py-5 text-lg font-bold text-[var(--gray-900)] shadow-lg transition-all hover:bg-[var(--gray-100)] hover:shadow-xl active:scale-[0.98]">
          무료로 시작하기
        </button>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-[var(--gray-100)] px-6 py-12">
      <div className="flex items-center gap-2">
        <span className="text-xl font-black tracking-tight text-[var(--gray-900)]">
          Mistakr
        </span>
        <span className="text-sm text-[var(--gray-400)]">
          실패를 자산으로.
        </span>
      </div>
      <p className="text-xs text-[var(--gray-400)]">
        &copy; 2025 Mistakr. All rights reserved.
      </p>
    </footer>
  );
}

/* ─────────────── Navbar ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 sm:px-12 ${
        scrolled
          ? "border-b border-[var(--gray-100)] bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <span className="text-xl font-black tracking-tight text-[var(--gray-900)]">
        Mistakr
      </span>
      <button className="rounded-xl bg-[var(--gray-900)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--gray-800)] active:scale-[0.97]">
        앱 다운로드
      </button>
    </nav>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <AISection />
        <StatsSection />
        <TargetSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
