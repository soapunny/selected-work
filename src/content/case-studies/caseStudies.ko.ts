// src/content/case-studies/caseStudies.ko.ts

import type { CaseStudy } from "./types";

export const caseStudiesKo: Record<string, CaseStudy> = {
  reel: {
    labels: {
      demoTitle: "데모",
      demoBadge: "라이브",
      architectureTitle: "시스템 아키텍처",
      architectureBadge: "구조",
      domainTitle: "설계 원칙",
      domainBadge: "원칙",
      selectedTitle: "코드 발췌",
      selectedBadge: "코드",
    },
    demo: {
      embedUrl: "https://d3j1066xoxz7fm.cloudfront.net",
      caption: "REEL - 영화 탐색 앱 (React + TypeScript)",
    },
    architectureIntro:
      "REEL은 React와 TypeScript로 구축한 프론트엔드 중심의 영화 탐색 앱입니다. API 호출은 전용 레이어에 격리하고, 전역 상태는 Zustand로 관리하며, UI 컴포넌트는 단일 책임을 갖도록 설계했습니다.",
    architectureFlow: `TMDB API
↓
API 레이어 (tmdb.ts)
↓
커스텀 훅 / 화면
↓
Zustand 스토어 (위시리스트)
↓
localStorage (persist)
↓
UI 컴포넌트 (MovieCard, Modal, Skeleton)`,
    domainIntro:
      "REEL은 예측 가능한 데이터 흐름과 일관된 UX 패턴을 목표로 설계했습니다. API 호출은 debounce로 과도한 요청을 방지하고, 무한 스크롤은 Intersection Observer로 구현했으며, 로딩 상태는 분리하여 레이아웃 이동을 방지했습니다.",
    impact:
      "API 레이어를 UI 컴포넌트에서 분리함으로써 새로운 엔드포인트나 화면을 추가할 때 기존 컴포넌트를 수정할 필요가 없습니다. Zustand와 localStorage persist 미들웨어를 조합하여 백엔드 없이도 새로고침 후 위시리스트 데이터가 유지됩니다.",
    tradeoffs:
      "클라이언트 상태 관리(Zustand + localStorage)는 단일 사용자 앱에서 간단하고 효과적이지만, 멀티 기기 동기화나 인증이 필요한 경우 백엔드 솔루션으로 대체해야 합니다. SearchScreen의 debounce 로직은 재사용 가능한 커스텀 훅으로 추출하면 더 나은 구조가 될 수 있습니다.",
    domainCards: [
      {
        title: "격리된 API 레이어",
        body: "모든 TMDB fetch 로직은 tmdb.ts에 위치합니다. 화면 컴포넌트는 fetch를 직접 호출하지 않고, 타입이 명시된 함수를 통해 데이터를 소비합니다.",
      },
      {
        title: "분리된 로딩 상태",
        body: "초기 로드와 페이지네이션은 별도의 로딩 플래그(loading / pageLoading)를 사용합니다. 이를 통해 무한 스크롤 중 스크롤 위치 초기화와 레이아웃 이동을 방지합니다.",
      },
      {
        title: "타입 안전한 데이터 계약",
        body: "Movie와 MovieDetail은 별도의 TypeScript 인터페이스입니다. MovieDetail은 Omit을 사용해 genre_ids를 제거하고, 상세 API가 반환하는 더 풍부한 genres 배열로 대체합니다.",
      },
      {
        title: "영속적 클라이언트 상태",
        body: "위시리스트 상태는 Zustand의 persist 미들웨어로 관리되며, localStorage에 자동으로 동기화됩니다. 백엔드 없이도 새로고침 후 데이터가 유지됩니다.",
      },
    ],
    exampleNote:
      "SearchScreen은 이 원칙들이 함께 적용된 대표적인 사례입니다: debounce 실시간 검색, Intersection Observer 기반 무한 스크롤, Set을 활용한 중복 제거, 스크롤 위치 유지를 위한 분리된 로딩 상태.",
    selectedIntro:
      "핵심 프론트엔드 패턴을 보여주는 코드 발췌입니다: API 격리, TypeScript 계약, 무한 스크롤, 영속 상태 관리.",
    snippets: [
      {
        title: "타입이 명시된 API 레이어",
        subtitle:
          "모든 TMDB 호출은 타입이 명시된 함수 뒤에 격리됩니다. 화면은 fetch 로직이 아닌 데이터를 소비합니다.",
        lang: "ts",
        code: `// src/api/tmdb.ts
export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await fetch(
    \`\${BASE_URL}/movie/\${id}?api_key=\${API_KEY}&language=\${API_LANGUAGE}&append_to_response=videos\`
  );
  const json: MovieDetail = await response.json();
  return json;
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<PaginatedResponse> => {
  const response = await fetch(
    \`\${BASE_URL}/search/movie?api_key=\${API_KEY}&language=\${API_LANGUAGE}&query=\${query}&page=\${page}\`
  );
  return response.json();
};`,
      },
      {
        title: "TypeScript 계약: MovieDetail extends Movie",
        subtitle:
          "MovieDetail은 Omit을 사용해 genre_ids를 제거하고 더 풍부한 genres 배열로 대체합니다.",
        lang: "ts",
        code: `// src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Genre[];           // genre_ids보다 풍부한 데이터
  runtime: number | null;
  tagline: string;
  videos: { results: Video[] };
}`,
      },
      {
        title: "Debounce 실시간 검색",
        subtitle:
          "setTimeout cleanup을 활용한 debounce로 타이핑 중 과도한 API 호출을 방지합니다.",
        lang: "ts",
        code: `// src/screens/SearchScreen.tsx
useEffect(() => {
  if (!keyword) return;
  setLoading(true);

  const timer = setTimeout(async () => {
    try {
      const res = await searchMovies(keyword);
      setMovies(res.results);
      setTotalPages(res.total_pages);
    } finally {
      setLoading(false);
    }
  }, 300); // debounce: 마지막 입력 후 300ms 대기

  return () => clearTimeout(timer); // cleanup: keyword 변경 시 취소
}, [keyword]);`,
      },
      {
        title: "Intersection Observer 무한 스크롤",
        subtitle:
          "목록 하단의 sentinel div가 뷰포트에 진입하면 다음 페이지 로드를 트리거합니다.",
        lang: "ts",
        code: `// src/screens/SearchScreen.tsx
const handleObserver = useCallback(
  (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !pageLoading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  },
  [pageLoading, page, totalPages],
);

useEffect(() => {
  const observer = new IntersectionObserver(handleObserver, {
    threshold: 0.5,
  });
  if (observerRef.current) observer.observe(observerRef.current);
  return () => observer.disconnect();
}, [handleObserver]);`,
      },
      {
        title: "Set을 활용한 중복 제거",
        subtitle:
          "TMDB는 페이지 간 중복 영화를 반환할 수 있습니다. 기존 ID의 Set으로 추가 전 필터링합니다.",
        lang: "ts",
        code: `// src/screens/SearchScreen.tsx
setMovies((prev) => {
  const existingIds = new Set(prev.map((m) => m.id));
  const newMovies = res.results.filter((m) => !existingIds.has(m.id));
  return [...prev, ...newMovies];
});`,
      },
      {
        title: "Zustand 스토어와 localStorage 영속성",
        subtitle:
          "위시리스트 상태는 Zustand로 전역 관리되며, persist 미들웨어를 통해 localStorage에 자동 저장됩니다.",
        lang: "ts",
        code: `// src/store/wishlistStore.ts
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (movie) =>
        set((state) => ({ wishlist: [...state.wishlist, movie] })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((m) => m.id !== id),
        })),
      isInWishlist: (id) => get().wishlist.some((m) => m.id === id),
    }),
    { name: "reel-wishlist" }, // localStorage 키
  ),
);`,
      },
      {
        title: "공식 트레일러 필터링 및 폴백",
        subtitle:
          "공식 YouTube 트레일러를 우선합니다. 없으면 첫 번째 YouTube 영상으로 폴백합니다.",
        lang: "ts",
        code: `// src/screens/MovieDetailScreen.tsx
const videos = res.videos?.results ?? [];

const officialTrailer = videos.find(
  (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
);
const fallback = videos.find((v) => v.site === "YouTube");

setTrailer(officialTrailer ?? fallback ?? null);`,
      },
    ],
    selectedFooter:
      "각 코드 발췌는 핵심 프론트엔드 패턴을 보여줍니다: 타입이 명시된 API 경계, TypeScript 계약, debounce 검색, Intersection Observer 페이지네이션, Set 기반 중복 제거, Zustand 영속성, 트레일러 필터링 로직.",
    patternNote:
      "이 패턴들 — API 격리, 타입 계약, 예측 가능한 상태 관리 — 은 모든 화면(HomeScreen, SearchScreen, WishlistScreen, MovieDetailScreen)에 일관되게 적용되어 앱을 확장하고 유지보수하기 쉽게 만듭니다.",
  },
  pocketquest: {
    labels: {
      demoTitle: "데모",
      demoBadge: "영상",
      architectureTitle: "시스템 아키텍처",
      architectureBadge: "구조",
      domainTitle: "도메인 원칙",
      domainBadge: "원칙",
      selectedTitle: "코드 발췌",
      selectedBadge: "코드",
    },
    demo: {
      embedUrl: "https://www.youtube.com/embed/O8kaFSF4egs",
      caption: "PocketQuest - Mobile Demo (React Native + Expo)",
    },
    architectureIntro:
      "이 프로젝트는 명확한 아키텍처 경계를 기반으로 설계되었습니다. 경계 계층에는 공유 계약을 두고, 서비스 계층에는 도메인 규칙을 배치했으며, 영속성은 리포지토리 계층 뒤에 명확히 분리했습니다.",
    architectureFlow: `Mobile (React Native)
↓
공유 계약 (SSOT)
↓
API Route (경계)
↓
Service (도메인 규칙)
↓
Repository (Prisma)
↓
Database (PostgreSQL)`,
    domainIntro:
      "PocketQuest는 예측 가능한 동작과 장기적인 유지보수성을 목표로 설계되었습니다. 도메인 정책은 서비스 계층에 명확히 위치하며, 아키텍처 경계는 분명하게 정의되어 있습니다. 인프라 구현 세부사항은 UI 계층으로 전달되지 않도록 분리했습니다.",
    impact:
      "이 구조는 클라이언트와 서버 간 API 형태의 불일치를 방지하고, 중복된 검증 로직을 제거하며, 타임존 차이로 인한 집계 오류를 예방합니다. 리팩터링은 특정 계층 내부에 국한되므로, UI 전반에 연쇄적인 수정이 발생하지 않습니다.",
    tradeoffs:
      "명시적인 계층 구조(route → service → repository)를 도입하면 단일 핸들러 방식보다 코드가 다소 늘어날 수 있습니다. 그러나 장기적인 유지보수성이 향상되고, 도메인 정책을 독립적으로 테스트할 수 있는 구조를 갖추게 됩니다.",
    domainCards: [
      {
        title: "명확한 경계",
        body: "라우트는 인증과 요청 파싱을 담당하고, 서비스는 도메인 정책을 적용하며, 리포지토리는 영속성 처리를 분리합니다. 각 계층는 단일하고 명확한 책임을 가집니다.",
      },
      {
        title: "공유 계약 (SSOT)",
        body: "클라이언트와 서버가 동일한 enum과 스키마를 공유하여 API 구조를 안정적으로 유지합니다. 이를 통해 API 드리프트를 줄이고, 리팩터링을 보다 안전하고 예측 가능하게 수행할 수 있습니다.",
      },
      {
        title: "결정적 동작",
        body: "보고 및 집계는 사용자 시간대를 고려한 경계를 기준으로 서버에서 계산됩니다. 그 결과, 다양한 기기 환경에서도 UI 동작이 일관되게 유지됩니다.",
      },
      {
        title: "일관된 오류 처리",
        body: "인프라 수준의 오류는 HTTP 의미 체계로 변환되어 처리됩니다. 이를 통해 클라이언트의 에러 처리 로직을 일관되게 유지하면서, 내부 구현 세부사항이 외부로 노출되지 않도록 합니다.",
      },
    ],
    exampleNote:
      "이러한 원칙은 Transactions 모듈에서 구체적으로 구현됩니다. EXPENSE / INCOME / SAVING은 단순한 분류가 아닌 도메인 규칙을 가지는 핵심 개념으로 설계되었습니다.",
    selectedIntro:
      "Transactions 모듈의 아키텍처 경계와 도메인 정책을 보여주는 핵심 코드 발췌입니다.",
    snippets: [
      {
        title: "공유 계약 (SSOT)",
        subtitle:
          "클라이언트와 서버가 동일한 enum과 스키마를 공유해, API 형태가 흔들리지 않도록 일관성을 유지합니다.",
        lang: "ts",
        code: `// packages/shared/src/transactions/types.ts
export const RANGE_VALUES = ["THIS_MONTH","LAST_MONTH","THIS_YEAR","ALL"] as const;
export const rangeSchema = z.enum(RANGE_VALUES as any);

export const transactionCreateSchema = z.object({
  type: z.enum(["EXPENSE","INCOME","SAVING"] as any),
  amountMinor: z.number().int().nonnegative(),
  category: z.string().min(1),
  savingsGoalId: z.string().nullable().optional(),
  occurredAtISO: z.string().datetime(),
});`,
      },
      {
        title: "카테고리 정규화",
        subtitle:
          "별칭(alias)은 서버에서 사용하는 표준 키로 정규화됩니다. 또한 SAVING은 카테고리를 항상 `savings`로 고정합니다.",
        lang: "ts",
        code: `// packages/shared/src/transactions/categories.ts
const ALIASES: Record<string, string> = {
  restaurant: "dining",
  transportation: "transport",
};

export function canonicalCategoryKeyForServer(raw: string, type?: string) {
  const key = String(raw ?? "").trim().toLowerCase();
  const folded = ALIASES[key] ?? key;
  if (type === "SAVING") return "savings";
  return folded || "other";
}`,
      },
      {
        title: "라우트 경계",
        subtitle:
          "라우트는 인증, 스키마 파싱/검증까지만 수행하고, 도메인 정책은 서비스에서 처리합니다.",
        lang: "ts",
        code: `// apps/server/src/app/api/transactions/route.ts
const auth = await requireUserId(request);
if (!auth.ok) return auth.response;

const parsedRange = rangeSchema.safeParse(rawRange.toUpperCase());
if (!parsedRange.success) return json400();

const data = transactionCreateSchema.parse(body);
return NextResponse.json(
  await createTransactionForUser({ userId: auth.userId, data }),
  { status: 201 },
);`,
      },
      {
        title: "도메인 규칙: SAVING 시맨틱",
        subtitle:
          "SAVING은 특정 저축 목표에 연결되어야 하며, 사용자 소유권 검증을 강제하는 도메인 타입입니다.",
        lang: "ts",
        code: `// apps/server/src/domain/transaction/transaction.service.ts
if (type === "SAVING") {
  if (!savingsGoalId) {
    throw new HttpError(400, "savingsGoalId required");
  }
  await assertSavingsGoalOwnership({ userId, savingsGoalId });
  category = "savings";
}`,
      },
      {
        title: "사용자 시간대 기반 집계",
        subtitle:
          "집계 로직은 사용자 시간대를 기준으로 서버에서 계산되어, 기기나 환경에 관계없이 항상 일관된 결과를 제공합니다.",
        lang: "ts",
        code: `// apps/server/src/domain/transaction/transaction.service.ts
const { fromISO, toISO } = computeOccurredAtFilter({
  range, // THIS_MONTH / LAST_MONTH / ...
  timezone: user.timeZone,
});

return repo.listTransactions({
  userId,
  occurredAtGte: fromISO,
  occurredAtLt: toISO,
});`,
      },
      {
        title: "인프라 오류의 도메인 추상화",
        subtitle:
          "Prisma 레벨의 예외를 HTTP 계층의 의미로 매핑하여, 인프라 구현 세부사항이 API 경계를 넘어 유출되지 않도록 했습니다.",
        lang: "ts",
        code: `// apps/server/src/lib/prismaErrors.ts
return prismaHttpGuard(async () => {
  return await prisma.transaction.update({
    where: { id, userId },
    data,
  });
});`,
      },
      {
        title: "클라이언트 데이터 정규화",
        subtitle:
          "UI 계층은 단일 데이터 모델만을 소비하도록 유지하고, 레거시 필드나 API 스펙 변화는 스토어에서 정규화하여 흡수합니다.",
        lang: "ts",
        code: `// apps/mobile/src/app/store/transactionsStore.ts
const amountMinor =
  typeof tx.amountMinor === "number" ? tx.amountMinor :
  typeof tx.amountCents === "number" ? tx.amountCents : 0;

const occurredAtISO = tx.occurredAtISO ?? tx.occurredAt ?? "";
return { ...tx, amountMinor, occurredAtISO };`,
      },
      {
        title: "전송 계층 규칙 (DTO 정규화)",
        subtitle:
          "API 경계에 도달하기 전에, 표준 카테고리 매핑과 부분 업데이트 안전성이 사전 보장됩니다.",
        lang: "ts",
        code: `// apps/mobile/src/app/api/transactionsApi.ts
function normalizeCreateDTO(input: any) {
  return {
    ...input,
    category: canonicalCategoryKeyForServer(input.category, input.type),
    savingsGoalId: input.type === "SAVING" ? input.savingsGoalId : undefined,
  };
}`,
      },
    ],
    selectedFooter:
      "각 코드 발췌는 애플리케이션의 핵심 아키텍처 경계를 드러냅니다: 공유 계약(SSOT), 카테고리 정규화, API 라우트 경계, 서비스 계층 정책, 사용자 시간대 기반 집계 필터, 영속성 계층 추상화, 클라이언트 데이터 정규화, 전송 계층 규칙.",
    patternNote:
      "이 아키텍처 패턴은 Savings, Plans(기간 로직), Dashboard 집계 등 다른 도메인 모듈에도 일관되게 확장되어, 시스템 전체의 동작을 구조적으로 안정화합니다.",
  },

  "facebook-chatbot": {
    labels: {
      demoTitle: "데모",
      demoBadge: "영상",
      architectureTitle: "시스템 아키텍처",
      architectureBadge: "구조",
      domainTitle: "도메인 원칙",
      domainBadge: "원칙",
      selectedTitle: "코드 발췌",
      selectedBadge: "코드",
    },
    demo: null,
    architectureIntro:
      "내부 운영용으로 구축한 규칙 기반 메시징 어시스턴트입니다. 수신 메시지를 분류하고 정책에 매칭한 뒤, UI/제어(데스크톱), 자동화 로직, 영속성/내보내기 계층을 명확히 분리해 예측 가능한 흐름으로 라우팅합니다.",
    architectureFlow: `메시징 채널 (Facebook)
↓
봇 오케스트레이터 (정책 엔진)
↓
정책 데이터 (키워드 / 템플릿)
↓
저장 계층 (SQLite/CSV/Excel)
↓
에스컬레이션 / 이관 (Email / 수동 대응)`,
    domainIntro:
      "목표는 실제 운영 환경의 변동성 속에서도 일관된 동작을 유지하는 것입니다. 메시지 분류는 결정적으로 수행되고, 정책 조회는 중앙화되며, 불확실한 경우에는 침묵적으로 추측하지 않고 명시적인 폴백(질문 감지/에스컬레이션) 경로로 전환합니다.",
    impact:
      "반복적인 수동 응답을 줄이고 더 빠르고 일관된 고객 응답을 가능하게 했습니다. 또한 정책(키워드/템플릿)은 데이터로 관리되어, 핵심 오케스트레이션 로직을 크게 수정하지 않고도 동작을 점진적으로 개선할 수 있습니다.",
    tradeoffs:
      "중앙화된 정책 엔진은 소규모 내부 도구에선 운영이 단순하지만, 정책이 늘어나면 복잡도가 증가할 수 있습니다. 향후 개선에서는 전략(Strategy) 핸들러와 더 강한 타입의 메시지 의도 모델을 도입해 관심사를 분리하고 확장성을 높일 수 있습니다.",
    domainCards: [
      {
        title: "정책 우선 워크플로우",
        body: "메시지는 예측 가능한 파이프라인으로 처리됩니다: 분류 → 정책 매칭 → 응답 → 로깅 → 필요 시 이관(에스컬레이션).",
      },
      {
        title: "명시적 폴백",
        body: "확신 있는 매칭이 없으면 임의로 추측하지 않고, 질문 감지 또는 에스컬레이션 등 명시적인 폴백 경로로 전환합니다.",
      },
      {
        title: "스토리지 경계",
        body: "영속성 및 내보내기(SQLite/CSV/Excel)는 헬퍼 계층 뒤로 격리하여, 정책 로직이 읽기 쉽고 변경에 안전하도록 유지합니다.",
      },
      {
        title: "운영 중심",
        body: "실제 운영을 전제로 설계했습니다: 예측 가능한 규칙, 로그 기반 관찰 가능성, 그리고 사람이 개입할 수 있는 안전한 이관.",
      },
    ],
    exampleNote:
      "PocketQuest와 동일한 경계 원칙을 적용했습니다. 오케스트레이션 흐름은 간결하게 유지하고, 인프라 세부사항(Selenium/SMTP/저장소)은 헬퍼 계층 뒤에 격리했습니다.",
    selectedIntro:
      "다음 발췌문은 메시징 오케스트레이션의 핵심 경계를 담고 있습니다: 결정적 분기, 중앙화된 정책 조회, 격리된 인프라 헬퍼, 그리고 명시적인 담당자 이관 경로.",
    snippets: [
      {
        title: "오케스트레이터 분기 (핵심 정책 흐름)",
        subtitle:
          "핵심 워크플로우: 구조화된 세부사항 추출, 결정적 분기, 결과 로깅, 필요 시 담당자에게 이관.",
        lang: "java",
        code: `// src/models/Automate.java (excerpt)
HashMap<String, String> details = Util.fetchDetails(customerMsg);
String email = details.get("email");
String phone = Util.formatPhoneNumber(details.get("number"));

if(!email.contentEquals("")) {
  String reply = BotAnswers.getInstance()
    .getAnswerHasEmail()
    .replace(AnswerReferences.AGENT_NAME.toString(), agentName)
    .replace(AnswerReferences.AGENT_NUMBER.toString(), agentNumber);

  sendMessage(reply);
  ExcelHelper.saveMessage(name, customerMsg);

  Email.send(record.getString("subject"),
              record.getString("email"),
              mailText);
  return;
}

// Keyword-based response
String msg = DBHelper.getKeywordBasedMessage(itemId, customerMsg);
if(msg != null && !totalMessage.contains(msg)) {
  sendMessage(msg);
  return;
}

// Question fallback → escalate
if(customerMsg.contains("?")) {
  Email.send("Need Manual Reply", agentEmail, customerMsg);
}`,
      },
      {
        title: "정책 조회 엔진 (AND/OR/단일/전역)",
        subtitle:
          "규칙이 명확한 우선순위로 평가되어 정책 진화 시에도 동작이 예측 가능하게 유지됩니다.",
        lang: "java",
        code: `// src/storages/DBHelper.java (excerpt)
public static String getKeywordBasedMessage(String itemId, String keyword)
    throws SQLException {

  String response;

  response = getAndFromTagBased(itemId, keyword);
  if(!response.isEmpty()) return response;

  response = getOrFromTagBased(itemId, keyword);
  if(!response.isEmpty()) return response;

  response = getOnlyOneTagBased(itemId, keyword);
  if(!response.isEmpty()) return response;

  return getFromAllTagBased(keyword);
}`,
      },
      {
        title: "SQLite PreparedStatement (정책은 데이터에 유지)",
        subtitle:
          "키워드 정책이 SQLite에 있어 오케스트레이션 코드 변경 없이 동작을 업데이트할 수 있습니다.",
        lang: "java",
        code: `// src/storages/DBHelper.java (excerpt)
PreparedStatement ps = DB.getInstance().prepareStatement(
  "SELECT * FROM keyword " +
  "WHERE ? LIKE '%'||keyword.keyword||'%' " +
  "AND product_id = ?"
);`,
      },
      {
        title: "인프라 경계: ChromeDriver 생명주기",
        subtitle:
          "WebDriver 생성/설정이 중앙화되어 오케스트레이션을 읽기 쉽고 복원력 있게 유지합니다.",
        lang: "java",
        code: `// src/models/apis/ChromeDriverHelper.java (excerpt)
if(conn == null) {
  System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

  ChromeOptions options = new ChromeOptions();
  options.addArguments("--disable-extensions");
  options.addArguments("--ignore-certificate-errors");

  conn = new ChromeDriver(options);
}
return conn;`,
      },
      {
        title: "의미 있는 실패 시맨틱 (래퍼 + 커스텀 예외)",
        subtitle:
          "Selenium 실패가 도메인 수준 예외로 변환되어 실패가 명시적이고 진단 가능해집니다.",
        lang: "java",
        code: `// src/models/utils/Util.java (excerpt)
public static WebElement findElement(FindElementBy by, String target)
    throws ElementNotFoundException {
  try {
    WebDriver driver = ChromeDriverHelper.getInstance().getConnection();
    return driver.findElement(By.xpath(target));
  } catch (Exception e) {
    throw new ElementNotFoundException(
      Util.getStackTrace(Thread.currentThread().getStackTrace())
    );
  }
}`,
      },
    ],
    selectedFooter:
      "이 발췌문들은 시스템 우선 설계를 보여줍니다: 결정적 분기가 있는 단일 오케스트레이터, 데이터 기반 정책 계층(SQLite), 격리된 인프라 헬퍼(Selenium/SMTP), 그리고 낮은 신뢰도 사례를 위한 명시적 에스컬레이션 경로.",
    patternNote:
      "Java 데스크톱 도구이지만, 이 경험은 이후 풀스택 작업에도 그대로 이어졌습니다. 명시적 경계, 중앙화된 정책, 운영과 유지보수가 쉬운 예측 가능한 동작이라는 원칙을 일관되게 적용합니다.",
  },
};
