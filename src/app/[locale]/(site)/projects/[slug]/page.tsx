// src/app/[locale]/(site)/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { highlightToHtml } from "@/lib/prettier";
import type { BundledLanguage } from "shiki";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // Type definitions for case study data
  type CaseStudyDemo = { embedUrl: string; caption: string } | null;

  type CaseStudyCard = {
    title: string;
    body: string;
  };

  type CaseStudySnippet = {
    title: string;
    subtitle: string;
    lang: BundledLanguage;
    code: string;
  };

  type CaseStudy = {
    demo: CaseStudyDemo;
    architectureIntro: string;
    architectureFlow: string;
    domainIntro: string;
    impact: string;
    tradeoffs: string;
    domainCards: CaseStudyCard[];
    exampleNote: string;
    selectedIntro: string;
    snippets: CaseStudySnippet[];
    selectedFooter: string;
    patternNote: string;
  };

  // Case study content (varies per project slug)
  const CASE_STUDY: Record<string, CaseStudy> = {
    pocketquest: {
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
        "PocketQuest is designed to be predictable and maintainable: policies live in the domain layer, boundaries are explicit, and infrastructure details don’t leak into the UI.",
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
        "the Transactions module applies these principles via first-class types (EXPENSE / INCOME / SAVING), canonical category keys, and ownership validation.",
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

    // Pure OOP Java automation project (no demo video)
    "marketplace-bot": {
      demo: null,
      architectureIntro:
        "A desktop automation system that turns operational messaging workflows into explicit, rule-driven policies—separating UI control, automation orchestration, and persistence.",
      architectureFlow: `UI (Swing)
↓
Automate (Workflow Orchestrator)
↓
Policy Layer (SQLite keywords + templates)
↓
Selenium (ChromeDriver)
↓
Escalation (SMTP Email) + Logging (Excel)`,
      domainIntro:
        "The core goal is predictable automation: rules live in a single orchestrator, infrastructure is abstracted behind helpers, and failure cases are represented with meaningful exceptions instead of fragile flags.",
      impact:
        "This reduced manual response time, prevented missed inquiries, and enabled iterative policy updates (keywords/templates) without changing core automation code.",
      tradeoffs:
        "A single orchestrator method is straightforward for a small desktop tool, but can grow large over time—future refactors can split message handling into strategies (EmailCase / PhoneCase / KeywordCase / EscalationCase).",
      domainCards: [
        {
          title: "Rule-driven workflow",
          body: "Message handling follows explicit branches: detect contact info, match policies, respond, log, and escalate when needed.",
        },
        {
          title: "Infrastructure isolation",
          body: "Selenium, SMTP, SQLite, and Excel are isolated behind helpers to keep orchestration readable and resilient.",
        },
        {
          title: "Operational realism",
          body: "Handles 2FA waiting, randomized delays, and fallback paths to reduce brittle automation failures.",
        },
        {
          title: "Meaningful failures",
          body: "Custom exceptions (e.g., WebDriver missing, element not found) clarify failure semantics and recovery paths.",
        },
      ],
      exampleNote:
        "the same policy-first approach is applied consistently across keyword matching, template-driven replies, and escalation paths.",
      selectedIntro:
        "Short excerpts that illustrate the workflow engine, policy lookup, and infrastructure abstractions.",
      snippets: [
        {
          title: "Policy-based workflow",
          subtitle:
            "Template-driven reply + logging + escalation in a single, explicit branch.",
          lang: "java",
          code: `// src/models/Automate.java (excerpt)
if(!email.contentEquals(\"\")) {
    botAnswer = BotAnswers.getInstance()
        .getAnswerHasEmail()
        .replace(AnswerReferences.AGENT_NAME.toString(), agentName)
        .replace(AnswerReferences.AGENT_NUMBER.toString(), agentNumber);

    sendMessage(botAnswer);
    ExcelHelper.saveMessage(name, customerMsg);

    Email.send(record.getString(\"subject\"),
               record.getString(\"email\"),
               mailText);
}`,
        },
        {
          title: "Keyword-driven policy lookup",
          subtitle:
            "Rules live in SQLite so policies can evolve without changing the automation core.",
          lang: "java",
          code: `// src/storages/DBHelper.java (excerpt)
PreparedStatement ps =
DB.getInstance().prepareStatement(
  \"SELECT * FROM keyword WHERE ? LIKE '%'||keyword.keyword||'%' AND product_id = ?\"
);`,
        },
        {
          title: "Selenium lifecycle abstraction",
          subtitle:
            "Centralized WebDriver creation and configuration for consistent automation sessions.",
          lang: "java",
          code: `// src/models/apis/ChromeDriverHelper.java (excerpt)
if(conn == null) {
    System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
    ChromeOptions options = new ChromeOptions();
    options.addArguments(\"--disable-extensions\");
    conn = new ChromeDriver(options);
}`,
        },
      ],
      selectedFooter:
        "Each excerpt points to a boundary: workflow orchestration, policy lookup, and infrastructure abstraction.",
      patternNote:
        "This same boundary discipline (UI → orchestrator → helpers) is applied across storage, utilities, and exception semantics to keep the automation predictable.",
    },

    // Facebook chatbot project (no demo video)
    "facebook-chatbot": {
      demo: null,
      architectureIntro:
        "A rule-driven messaging assistant built as an internal tool: incoming messages are classified, matched to response policies, and routed through clear boundaries between UI/control, automation logic, and persistence.",
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
        "The goal is consistent behavior under real-world variability: message classification is deterministic, policy lookup is centralized, and fallbacks are explicit to avoid silent failures.",
      impact:
        "Reduced repetitive manual replies and enabled faster, more consistent responses. Policies can evolve without rewriting core orchestration logic.",
      tradeoffs:
        "A centralized policy engine is simple to operate for a small tool, but can grow complex—future improvements can separate concerns via strategy handlers and stronger typed message intents.",
      domainCards: [
        {
          title: "Policy-first workflow",
          body: "Messages are processed through a predictable pipeline: classify → match policy → respond → log → escalate when needed.",
        },
        {
          title: "Explicit fallbacks",
          body: "When a confident match is not found, the system takes an explicit fallback path (question detection / escalation) instead of guessing silently.",
        },
        {
          title: "Storage boundaries",
          body: "Persistence and exports are isolated behind helpers so policy logic stays readable and change-safe.",
        },
        {
          title: "Operational focus",
          body: "Designed for reliable day-to-day use: predictable rules, observability via logs, and safe handoff to humans.",
        },
      ],
      exampleNote:
        "the same boundary discipline used in PocketQuest is applied here: orchestration stays clean while infrastructure details remain behind helper layers.",
      selectedIntro:
        "Representative excerpts that show how the bot orchestrates real-world messaging: deterministic branching, policy lookup, reliable infrastructure boundaries, and safe human handoff paths.",
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
        "These excerpts demonstrate the system-first design: a single orchestrator with deterministic branching, a data-driven policy layer (SQLite), isolated infrastructure helpers (Selenium/SMTP), and explicit escalation paths for low-confidence cases.",
      patternNote:
        "Even though this is a Java desktop tool, the same principles carry over to my newer full-stack work: explicit boundaries, centralized policies, and predictable behavior that is easy to operate and maintain.",
    },
  } as const;

  // Pick per-project case study by slug; fallback to PocketQuest style if missing.
  const caseStudy: CaseStudy =
    CASE_STUDY[slug] ?? CASE_STUDY[project.slug] ?? CASE_STUDY["pocketquest"];

  // Pre-render highlighted HTML for code snippets (can't use `await` inside a non-async map callback in JSX)
  const highlightedSnippets: Array<CaseStudySnippet & { html: string }> =
    await Promise.all(
      caseStudy.snippets.map(async (s) => ({
        ...s,
        html: await highlightToHtml(s.code, { lang: s.lang }),
      })),
    );

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <ProjectHero project={project} />
      <div className="mt-6">
        <ProjectMeta project={project} />
      </div>

      {/* Demo video (optional per project) */}
      {caseStudy.demo ? (
        <section className="section-block">
          <div className="section-header">
            <h2 className="heading-section">Demo</h2>
            <span className="case-kbd">video</span>
          </div>

          <div className="video-embed">
            <iframe
              src={caseStudy.demo.embedUrl}
              title={`${project.title} demo`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="video-caption">{caseStudy.demo.caption}</p>

          <div className="section-divider" />
        </section>
      ) : null}

      {/* Case study (system-first) */}
      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">System Architecture</h2>
          <span className="case-kbd">system-first</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.architectureIntro}
        </p>

        <div className="arch-flow">{caseStudy.architectureFlow}</div>

        <div className="section-divider" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">Domain Rules</h2>
          <span className="case-kbd">principles</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.domainIntro}
        </p>

        <p className="mt-4 max-w-3xl text-body-sm text-muted">
          <span className="text-foreground">Impact:</span> {caseStudy.impact}
        </p>

        <p className="mt-4 max-w-3xl text-body-sm text-muted">
          <span className="text-foreground">Trade-offs:</span>{" "}
          {caseStudy.tradeoffs}
        </p>

        <div className="grid mt-6 gap-4 md:grid-cols-2">
          {caseStudy.domainCards.map((c) => (
            <div className="case-card" key={c.title}>
              <h3 className="case-card-title">{c.title}</h3>
              <p className="mt-3 text-body-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-body-sm text-muted">
          <span className="text-foreground">Example:</span>{" "}
          {caseStudy.exampleNote}
        </p>

        <div className="section-divider" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">Selected Code</h2>
          <span className="case-kbd">excerpts</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.selectedIntro}
        </p>

        <div className="code-grid">
          {highlightedSnippets.map((s) => (
            <div className="code-card" key={s.title}>
              <h3 className="code-title">{s.title}</h3>
              <p className="code-subtitle">{s.subtitle}</p>
              <div
                className="code-block-sm"
                dangerouslySetInnerHTML={{ __html: s.html }}
              />
            </div>
          ))}
        </div>

        <p className="code-caption">{caseStudy.selectedFooter}</p>

        <p className="mt-4 text-body-sm text-muted">{caseStudy.patternNote}</p>
      </section>
    </main>
  );
}
