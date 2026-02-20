import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고객 지원 — Mistakr",
  description: "미스테이커 앱 사용 중 문의 사항이 있으시면 아래 이메일로 연락해주세요.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">고객 지원</h1>
        <p className="text-gray-400 mb-12">
          미스테이커 앱 사용 중 문의 사항이 있으시면 아래 이메일로 연락해주세요.
        </p>

        <div className="border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold mb-1">이메일 문의</h2>
          <p className="text-gray-400 text-sm mb-4">
            문의 내용을 이메일로 보내주시면 영업일 기준 1~2일 내로 답변 드립니다.
          </p>
          <a
            href="mailto:mistakr.official@gmail.com"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            mistakr.official@gmail.com
          </a>
        </div>

        <div className="border border-gray-800 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-4">자주 묻는 질문</h2>
          <div className="space-y-6">
            <div>
              <p className="font-medium mb-1">계정 삭제는 어떻게 하나요?</p>
              <p className="text-gray-400 text-sm">
                프로필 탭 → 설정 → 계정 삭제에서 직접 탈퇴하실 수 있습니다.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">AI 진단 기능은 어떻게 작동하나요?</p>
              <p className="text-gray-400 text-sm">
                입력하신 아이디어 텍스트를 Anthropic(Claude AI)에 전송하여 분석합니다.
                전송 데이터 및 개인정보 처리에 대한 자세한 내용은{" "}
                <a href="/privacy" className="underline text-gray-300">
                  개인정보처리방침
                </a>
                을 확인해주세요.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">로그인이 되지 않아요.</p>
              <p className="text-gray-400 text-sm">
                소셜 로그인(구글/애플) 계정의 상태를 확인해주세요. 문제가 지속되면 이메일로 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
