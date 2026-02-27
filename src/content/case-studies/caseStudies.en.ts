// src/content/case-studies/caseStudies.en.ts

import type { CaseStudy } from "./types";

export const caseStudiesEn: Record<string, CaseStudy> = {
  pocketquest: {
    labels: {
      demoTitle: "Demo",
      demoBadge: "video",
      architectureTitle: "System Architecture",
      architectureBadge: "system-first",
      domainTitle: "Domain Rules",
      domainBadge: "principles",
      selectedTitle: "Selected Code",
      selectedBadge: "excerpts",
    },
    demo: {
      embedUrl: "https://www.youtube.com/embed/O8kaFSF4egs",
      caption: "PocketQuest - Mobile Demo (React Native + Expo)",
    },
    architectureIntro:
      "This project is designed around clear boundaries: shared contracts at the edge, domain rules in the service layer, and persistence isolated behind repositories.",
    architectureFlow: `Mobile (React Native)
↓
Shared Contracts (SSOT)
↓
API Route (Boundary)
↓
Service (Domain Rules)
↓
Repository (Prisma)
↓
PostgreSQL`,
    domainIntro:
      "PocketQuest is designed to be predictable and maintainable: policies live in the domain layer, boundaries are explicit, and infrastructure details don't leak into the UI.",
    impact:
      "This structure eliminates API drift between client and server, reduces duplicated validation logic, and prevents timezone-related reporting inconsistencies. Refactors remain localized to a single layer without cascading UI changes.",
    tradeoffs:
      "Introducing explicit layers (route → service → repository) adds boilerplate compared to a monolithic handler, but improves long-term maintainability and makes domain policies testable in isolation.",
    domainCards: [
      {
        title: "Clear boundaries",
        body: "Routes handle auth + parsing, services enforce domain policies, repositories isolate persistence. Each layer has one job.",
      },
      {
        title: "Shared contracts (SSOT)",
        body: "Client and server share enums + schemas so API shapes stay stable. This reduces drift and makes refactors safer.",
      },
      {
        title: "Deterministic behavior",
        body: "Reporting and summaries are computed on the server with timezone-aware boundaries, so the UI remains consistent across devices.",
      },
      {
        title: "Stable error semantics",
        body: "Infrastructure errors are mapped into HTTP semantics to keep client handling consistent and avoid leaking implementation details.",
      },
    ],
    exampleNote:
      "These principles are concretely implemented in the Transactions module, where EXPENSE / INCOME / SAVING are treated as domain-level concepts rather than simple enums, reinforced by canonical category keys and ownership validation.",
    selectedIntro:
      "Short excerpts that highlight the architectural boundaries and domain policies behind the Transactions system.",
    snippets: [
      {
        title: "Shared contract (SSOT)",
        subtitle:
          "Client and server share the same enums and schemas to keep API boundaries stable.",
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
        title: "Canonical categories",
        subtitle:
          'Aliases fold into stable server keys. SAVING forces a canonical category="savings".',
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
        title: "Route boundary",
        subtitle:
          "Routes stay thin: auth, parse, validate, then delegate to services.",
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
        title: "Domain rule: SAVING semantics",
        subtitle:
          "SAVING is a first-class type: requires savingsGoalId and enforces ownership validation.",
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
        title: "Timezone-aware reporting",
        subtitle:
          "Period ranges are computed on the server with timezone boundaries for deterministic summaries.",
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
        title: "Infrastructure semantics",
        subtitle:
          "Prisma errors are mapped into HTTP semantics to avoid leaking infrastructure details.",
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
        title: "Client normalization",
        subtitle:
          "UI consumes one shape. Legacy fields and API drift are absorbed in the store.",
        lang: "ts",
        code: `// apps/mobile/src/app/store/transactionsStore.ts
const amountMinor =
  typeof tx.amountMinor === "number" ? tx.amountMinor :
  typeof tx.amountCents === "number" ? tx.amountCents : 0;

const occurredAtISO = tx.occurredAtISO ?? tx.occurredAt ?? "";
return { ...tx, amountMinor, occurredAtISO };`,
      },
      {
        title: "Transport rules (DTO normalize)",
        subtitle:
          "Canonical categories and partial-update safety are enforced before hitting the API.",
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
      "Each excerpt points to a specific boundary: shared contract, category canonicalization, route, service policy, timezone filters, persistence semantics, client normalization, and transport rules.",
    patternNote:
      "These same architectural patterns are consistently applied across other modules such as Savings, Plans (period logic), and Dashboard aggregation, ensuring predictable behavior throughout the entire application.",
  },

  "facebook-chatbot": {
    labels: {
      demoTitle: "Demo",
      demoBadge: "video",
      architectureTitle: "System Architecture",
      architectureBadge: "system-first",
      domainTitle: "Domain Rules",
      domainBadge: "principles",
      selectedTitle: "Selected Code",
      selectedBadge: "excerpts",
    },
    demo: null,
    architectureIntro:
      "A rule-driven messaging assistant built for internal operations. Incoming messages are classified, matched against policies, and routed through clearly separated layers: desktop UI/control, automation logic, and persistence/export infrastructure.",
    architectureFlow: `Messaging Channel (Facebook)
↓
Bot Orchestrator (Policy Engine)
↓
Policy Data (keywords/templates)
↓
Storage (SQLite/CSV/Excel)
↓
Escalation / Handoff (Email / Manual follow-up)`,
    domainIntro:
      "The system is designed for consistent behavior under real-world variability. Message classification is deterministic, policy lookup is centralized, and when confidence is low the system transitions to explicit fallback paths (question detection or escalation) instead of guessing silently.",
    impact:
      "This reduced repetitive manual replies and enabled faster, more consistent customer responses. Policies (keywords/templates) are data-driven, allowing behavior to evolve without rewriting core orchestration logic.",
    tradeoffs:
      "A centralized policy engine is simple to operate for a small internal tool, but complexity can grow as policies expand. Future improvements could introduce strategy-based handlers and stronger typed intent models to better separate concerns and improve scalability.",
    domainCards: [
      {
        title: "Policy-first workflow",
        body: "Messages move through a predictable pipeline: classify → match policy → respond → log → escalate when required.",
      },
      {
        title: "Explicit fallbacks",
        body: "When a confident match is not found, the system avoids silent guesses and instead transitions to explicit fallback paths such as question detection or human escalation.",
      },
      {
        title: "Storage boundaries",
        body: "Persistence and exports (SQLite/CSV/Excel) are isolated behind helper layers so policy logic remains readable and safe to change.",
      },
      {
        title: "Operational focus",
        body: "Designed for real operational use: predictable rules, log-based observability, and safe human handoff when necessary.",
      },
    ],
    exampleNote:
      "The same boundary discipline used in PocketQuest is applied here. Orchestration remains concise while infrastructure details (Selenium/SMTP/storage) stay isolated behind helper layers.",
    selectedIntro:
      "The following excerpts illustrate how the bot orchestrates real-world messaging: deterministic branching, centralized policy lookup, reliable infrastructure boundaries, and safe human handoff paths.",
    snippets: [
      {
        title: "Orchestrator branching (core policy flow)",
        subtitle:
          "The central workflow: extract structured details, branch deterministically, log outcomes, and escalate to a human when needed.",
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
        title: "Policy lookup engine (AND/OR/single/global)",
        subtitle:
          "Rules are evaluated in a clear priority order so behavior stays predictable as policies evolve.",
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
        title: "SQLite PreparedStatement (policy stays in data)",
        subtitle:
          "Keyword policies live in SQLite so operations can update behavior without changing orchestration code.",
        lang: "java",
        code: `// src/storages/DBHelper.java (excerpt)
PreparedStatement ps = DB.getInstance().prepareStatement(
  "SELECT * FROM keyword " +
  "WHERE ? LIKE '%'||keyword.keyword||'%' " +
  "AND product_id = ?"
);`,
      },
      {
        title: "Infrastructure boundary: ChromeDriver lifecycle",
        subtitle:
          "WebDriver creation/configuration is centralized to keep orchestration readable and resilient.",
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
        title: "Meaningful failure semantics (wrapper + custom exception)",
        subtitle:
          "Selenium failures are converted into domain-level exceptions so failures are explicit and diagnosable.",
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
      "These excerpts reflect a system-first design: a single orchestrator with deterministic branching, a data-driven policy layer (SQLite), isolated infrastructure helpers (Selenium/SMTP), and explicit escalation paths for low-confidence scenarios.",
    patternNote:
      "Although this project is a Java desktop tool, the same architectural discipline carries into my later full-stack work: explicit boundaries, centralized policies, and predictable behavior that is easy to operate and maintain.",
  },
};
