const DICT = {
  vi: {
    appTitle: "Decision Sandbox",
    appSubtitle: "Mô phỏng tương lai trước khi bạn quyết định.",
    footer: "Trải nghiệm mô phỏng tương lai, không phải lời khuyên.",
    intentTitle: "Ý định",
    intentDesc: "Bạn đang muốn mô phỏng quyết định nào?",
    intentPlaceholder: "Ví dụ: Tôi muốn mở CLB AI trong trường",
    startSimulation: "Bắt đầu mô phỏng",
    socraticTitle: "Phản tư Socratic",
    socraticDesc: "Chọn câu trả lời phù hợp nhất với bạn.",
    continue: "Tiếp tục",
    realityTitle: "Reality Mode",
    realityDesc: "Các chế độ này thay đổi logic mô phỏng.",
    modeStartTitle: "Bắt đầu ngay",
    modeStartDesc: "Tăng tốc, nhận phản hồi sớm.",
    modeDelayTitle: "Trì hoãn",
    modeDelayDesc: "Lên kế hoạch nhiều hơn, cam kết chậm hơn.",
    modeSafeTitle: "An toàn",
    modeSafeDesc: "Giảm rủi ro, bước đi thận trọng.",
    simulating: "Đang mô phỏng các tương lai...",
    outputTitle: "Kết quả mô phỏng",
    outputDesc: "Dữ liệu cấu trúc, không phải lời khuyên.",
    difficulty: "Độ khó",
    duration: "Thời lượng",
    riskTitle: "Phân tích rủi ro",
    outcomesTitle: "Các vũ trụ tương lai",
    questionsTitle: "Câu hỏi phản tư",
    timelineTitle: "Dòng thời gian tương lai",
    timelineDesc: "Tiến trình narrative của các khả năng tương lai.",
    noData: "Không có dữ liệu trả về.",
    noTimeline: "Không có timeline trả về.",
    unknown: "Chưa rõ",
    langLabel: "Ngôn ngữ",
    errorTitle: "Không thể mô phỏng",
    errorGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    errorQuota: "Hệ thống đang quá tải hoặc hết lượt miễn phí. Hãy thử lại sau ít phút."
  },
  en: {
    appTitle: "Decision Sandbox",
    appSubtitle: "Simulate futures before you commit.",
    footer: "Interactive future simulation, not advice.",
    intentTitle: "Intent",
    intentDesc: "What decision are you simulating?",
    intentPlaceholder: "Example: I want to start an AI club at school",
    startSimulation: "Start Simulation",
    socraticTitle: "Socratic Reflection",
    socraticDesc: "Choose the answers that best match your mindset.",
    continue: "Continue",
    realityTitle: "Reality Mode",
    realityDesc: "These modes change the simulation logic.",
    modeStartTitle: "Start Now",
    modeStartDesc: "Aggressive momentum and early feedback.",
    modeDelayTitle: "Delay",
    modeDelayDesc: "More planning, slower commitment.",
    modeSafeTitle: "Safe Mode",
    modeSafeDesc: "Risk control and conservative steps.",
    simulating: "Simulating futures...",
    outputTitle: "Simulation Output",
    outputDesc: "Structured futures, not advice.",
    difficulty: "Difficulty",
    duration: "Duration",
    riskTitle: "Risk Analysis",
    outcomesTitle: "Outcome Universes",
    questionsTitle: "Socratic Reflection",
    timelineTitle: "Time Travel Timeline",
    timelineDesc: "A narrative progression of possible outcomes.",
    noData: "No data returned.",
    noTimeline: "No timeline returned.",
    unknown: "Unknown",
    langLabel: "Language",
    errorTitle: "Simulation Unavailable",
    errorGeneric: "Something went wrong. Please try again later.",
    errorQuota: "Quota limit reached. Please wait and try again."
  }
};

export function createI18n(locale) {
  const lang = DICT[locale] ? locale : "vi";
  const dict = DICT[lang];
  return {
    lang,
    t(key) {
      return dict[key] || DICT.en[key] || key;
    }
  };
}
