// src/content/case-studies/caseStudies.ko.ts

import type { CaseStudy } from "./types";

export const caseStudiesKo: Record<string, CaseStudy> = {
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
