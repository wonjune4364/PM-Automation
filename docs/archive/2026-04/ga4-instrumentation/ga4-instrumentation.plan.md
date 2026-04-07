# Plan: GA4 Custom Event Instrumentation

> **PRD 참조**: `docs/00-pm/prompt-generator.prd.md` (KR1~KR4 정의)
> **작성일**: 2026-04-04
> **상태**: Plan 완료

---

## Executive Summary

| 관점 | 내용 |
|------|------|
| **Problem** | KR 달성 여부를 측정할 수단이 없다. GA4 스크립트는 로드되지만 커스텀 이벤트가 전혀 없어 풀체인 완료율(KR1), 핸드오프 클릭률(KR2), WAPG(KR3), 초안 복원 완료율(KR4) 모두 미측정 상태다. |
| **Solution** | `src/lib/analytics.ts` 유틸리티를 생성하고, 6개 핵심 이벤트를 `PromptGeneratorLayout`, `useDraftStorage` 훅에 심는다. `window.gtag` 존재 여부를 확인 후 호출하므로 GA_ID 미설정 환경에서도 에러 없이 동작한다. |
| **Function/UX Effect** | 사용자 경험 변화 없음. 완전히 비가시적인 변경. GA4 DebugView에서 실시간 이벤트 확인 가능. |
| **Core Value** | 90일 OKR 모니터링 가능 상태로 전환. "기능이 있다"에서 "효과를 측정한다"로 이동. 데이터 기반 다음 이터레이션 결정 가능. |

---

## 1. 배경 및 목적

### 1.1 현재 상태

`src/app/layout.tsx:41`에 `GoogleAnalytics` 컴포넌트가 조건부 렌더링되어 있다.

```tsx
{GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
```

이로 인해 `NEXT_PUBLIC_GA_ID`가 설정된 환경에서는 GA4 스크립트가 로드되고 **자동 페이지뷰**는 수집된다. 그러나 KR 측정에 필요한 **커스텀 이벤트는 단 하나도 없다.**

### 1.2 PRD KR 매핑

| KR | 측정 목표 | 필요한 이벤트 |
|----|---------|------------|
| KR1: 풀체인 완료율 30% | 1세션에서 5개 생성기 모두 사용 | `fullchain_complete` |
| KR2: PRD→IA 연속 이동율 25% | "다음 단계로 보내기" 클릭 | `handoff_click` |
| KR3: WAPG +40% | 주간 고유 프롬프트 생성 사용자 | `generate_prompt` |
| KR4: 초안 복원 후 완료율 +40% | 복원 후 폼 제출 완료 | `draft_restored` + `generate_prompt` 조합 |

---

## 2. 구현 계획

### 2.1 신규 파일: `src/lib/analytics.ts`

GA4 이벤트 전송의 단일 진입점. `window.gtag` 존재 여부를 확인하여 GA_ID 미설정 환경(로컬 개발)에서도 에러 없이 동작한다.

```typescript
// 이벤트 명세
export type AnalyticsEvent =
  | { name: "generate_prompt";          params: { doc_type: DocType; has_prior_context: boolean } }
  | { name: "ai_generation_complete";   params: { doc_type: DocType; success: boolean } }
  | { name: "handoff_click";            params: { from_doc: DocType; to_doc: DocType } }
  | { name: "bkit_save";               params: { doc_type: DocType; feature_name: string } }
  | { name: "draft_restored";           params: { doc_type: DocType } }
  | { name: "fullchain_complete";       params: { session_duration_ms: number } }
  ;

export type DocType = "prd" | "trd" | "ia" | "usecases" | "design";
```

`trackEvent()` 함수 하나만 export. 각 컴포넌트에서 직접 `window.gtag`를 호출하지 않는다.

### 2.2 수정 파일: `src/components/prompt/PromptGeneratorLayout.tsx`

이벤트 삽입 위치 4곳:

| 위치 | 이벤트 | 파라미터 |
|------|--------|---------|
| `handleSubmit()` 내 | `generate_prompt` | `doc_type`, `has_prior_context` (contextBanner 존재 여부) |
| `generateContent()` try 완료 시 | `ai_generation_complete` | `doc_type`, `success: true` |
| `generateContent()` catch 시 | `ai_generation_complete` | `doc_type`, `success: false` |
| `handleSaveToBkit()` 완료 시 | `bkit_save` | `doc_type`, `feature_name` |
| nextPage 버튼 onClick | `handoff_click` | `from_doc: bkitDocType`, `to_doc` (nextPage href에서 추출) |

### 2.3 수정 파일: `src/hooks/useDraftStorage.ts`

초안 복원 감지 위치:

| 위치 | 이벤트 | 파라미터 |
|------|--------|---------|
| `useEffect` 내 draft 복원 성공 시 | `draft_restored` | `doc_type` |

### 2.4 신규 파일: `src/hooks/useFullchainTracker.ts`

세션 내 전체 체인 완료 추적. sessionStorage를 이용해 완료된 doc_type 목록을 누적하고, 5개 모두 완료 시 `fullchain_complete` 이벤트를 1회 발송한다.

```typescript
// sessionStorage 키: bkit_completed_chain
// 값: ["prd", "ia", "usecases", "design"] 형태의 JSON 배열
// generate_prompt 이벤트 발생 시 해당 doc_type을 추가
// 5개 모두 포함되면 fullchain_complete 발송 + 초기화
```

`PromptGeneratorLayout`에서 `useFullchainTracker(bkitDocType)` 호출.

---

## 3. 파일별 수정 범위

| 파일 | 변경 유형 | 변경 크기 |
|------|---------|---------|
| `src/lib/analytics.ts` | 신규 생성 | ~40줄 |
| `src/hooks/useFullchainTracker.ts` | 신규 생성 | ~35줄 |
| `src/components/prompt/PromptGeneratorLayout.tsx` | 수정 (이벤트 호출 추가) | +15줄 |
| `src/hooks/useDraftStorage.ts` | 수정 (draft_restored 이벤트) | +5줄 |

**총 변경량**: 약 95줄. 기존 로직 수정 없음, 순수 이벤트 호출 추가.

---

## 4. 구현 순서 (체크리스트)

```
[ ] 1. src/lib/analytics.ts 생성
       - AnalyticsEvent 타입 정의
       - trackEvent() 함수 구현 (window.gtag 존재 체크 포함)
       - 개발 환경 console.debug 로깅 추가

[ ] 2. src/hooks/useFullchainTracker.ts 생성
       - sessionStorage bkit_completed_chain 관리
       - 5개 완료 감지 시 trackEvent fullchain_complete 발송

[ ] 3. PromptGeneratorLayout.tsx 수정
       - generate_prompt: handleSubmit에 추가
       - ai_generation_complete: generateContent try/catch에 추가
       - handoff_click: nextPage onClick에 추가
       - bkit_save: handleSaveToBkit 완료 시 추가
       - useFullchainTracker(bkitDocType) 호출 추가

[ ] 4. useDraftStorage.ts 수정
       - draft_restored: 복원 성공 시 trackEvent 추가

[ ] 5. 검증 (GA4 DebugView)
       - NEXT_PUBLIC_GA_ID 실제 GA4 측정 ID 설정
       - Chrome GA4 Debugger 확장 활성화
       - 각 이벤트 발송 시 DebugView 실시간 확인
       - 6개 이벤트 모두 수신 확인
```

---

## 5. 검증 기준 (완료 조건)

| 이벤트 | 검증 방법 | 합격 기준 |
|--------|---------|---------|
| `generate_prompt` | PRD 폼 제출 | GA4 DebugView에서 `doc_type: "prd"` 수신 확인 |
| `ai_generation_complete` | Claude 생성 완료 | `success: true/false` 모두 수신 확인 |
| `handoff_click` | "다음 단계로 →" 클릭 | `from_doc`, `to_doc` 파라미터 정확 |
| `bkit_save` | bkit 저장 완료 | `feature_name` 파라미터 포함 확인 |
| `draft_restored` | 폼 작성 후 새로고침 | 복원 시 이벤트 1회 발송 확인 |
| `fullchain_complete` | 5개 생성기 순서대로 제출 | 5번째 generate_prompt 직후 발송 확인 |

---

## 6. 제약 및 주의사항

- **개인정보 비수집**: 이벤트 파라미터에 사용자 입력 텍스트(제품 개요, 기능명 등) 절대 포함 금지. doc_type, boolean, timestamp만 허용.
- **GA_ID 없는 환경**: `window.gtag`가 없으면 조용히 skip. 에러 없음.
- **fullchain 중복 방지**: 한 세션에서 `fullchain_complete`는 1회만 발송. sessionStorage 초기화로 관리.
- **SSR 안전성**: `window` 객체 접근 시 `typeof window !== 'undefined'` 체크 필수.

---

## 7. 다음 단계

Plan 승인 후:
```
/pdca do ga4-instrumentation      → 구현 시작
/pdca analyze ga4-instrumentation → 이벤트 수신 검증
/pdca report ga4-instrumentation  → 완료 보고서
```
