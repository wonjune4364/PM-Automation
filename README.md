# PT Bank Jtrust Indonesia — PM Automation Tool

> **AI를 활용한 PM 문서 자동화 시스템**  
> PRD부터 Design Guide까지, 10분 안에 전체 기획 문서를 생성합니다.

---

## 목차

1. [소개](#1-소개)
2. [시작하기](#2-시작하기)
3. [AI 도구 — 프롬프트 생성기](#3-ai-도구--프롬프트-생성기)
   - [PRD 생성기](#31-prd-product-requirements-document)
   - [TRD 생성기](#32-trd-technical-requirements-document)
   - [IA 생성기](#33-ia-information-architecture)
   - [Use Cases 생성기](#34-use-cases-유스케이스)
   - [Design Guide 생성기](#35-design-guide-디자인-가이드)
4. [AI 직접 생성 — Claude API 설정](#4-ai-직접-생성--claude-api-설정)
5. [단계 간 컨텍스트 전달](#5-단계-간-컨텍스트-전달)
6. [초안 자동 저장](#6-초안-자동-저장)
7. [문서 도구](#7-문서-도구)
8. [개발자 도구](#8-개발자-도구)
9. [bkit 연동 — PDCA 사이클 통합](#9-bkit-연동--pdca-사이클-통합)
10. [전체 워크플로우 예시](#10-전체-워크플로우-예시)
11. [개발 환경 설정](#11-개발-환경-설정)
12. [자주 묻는 질문](#12-자주-묻는-질문)

---

## 1. 소개

### 이 시스템이 필요한 이유

Claude, ChatGPT 같은 AI 코딩 도구로 개발을 시작할 때 가장 큰 장벽은 **"무엇을 만들지 AI에게 어떻게 설명할까?"** 입니다.

빈 화면 앞에서 PRD를 쓰려면 PM 경험이 필요하고, AI가 이해할 수 있는 구조화된 프롬프트 형식도 알아야 합니다. 이 시스템은 그 과정을 **5단계 폼 입력**으로 대체합니다.

### 핵심 가치

| 상황 | 기존 방식 | 이 시스템 |
|------|---------|---------|
| PRD 작성 | 빈 문서에서 1~3시간 작성 | 폼 입력 후 Claude에게 위임 |
| IA 작성 | PRD 내용 수동 복붙 후 재입력 | 이전 단계 내용 자동 전달 |
| 문서 일관성 | 각 문서 개별 작성, 맥락 불일치 | PRD → TRD → IA → UseCase → Design 연결 |
| Claude Code 연동 | 별도 작업 | "Save to bkit" 한 번으로 PDCA Plan 단계에 자동 연결 |

### 지원 도구 목록

**AI 프롬프트 생성기** (기획 문서용)
- PRD (제품 요구사항 문서)
- TRD (기술 요구사항 문서)
- IA (정보 구조 설계)
- Use Cases (유스케이스)
- Design Guide (UI/UX 디자인 가이드)

**문서 도구**
- 개인정보처리방침 생성기
- 오픈소스 라이선스 문서 생성기

**개발자 도구**
- HTML Table → JSON 변환기
- 이미지 색상 추출기
- 색상 팔레트 생성기

---

## 2. 시작하기

### 접속

웹 브라우저에서 시스템에 접속합니다. 로그인이나 회원가입은 필요하지 않습니다.

### 홈 화면 구성

홈 화면은 세 섹션으로 나뉩니다:

```
┌─────────────────────────────────────┐
│           AI tools                   │
│  ① PRD → ② TRD(선택) → ③ IA        │
│          → ④ UseCases → ⑤ Design    │
├─────────────────────────────────────┤
│         Document tools               │
│  개인정보처리방침  /  오픈소스 라이선스  │
├─────────────────────────────────────┤
│         Development tools            │
│  Table→JSON  /  색상추출  /  팔레트   │
└─────────────────────────────────────┘
```

> **권장 순서**: AI tools는 **① PRD부터 순서대로** 작성하세요.  
> 각 단계의 출력물이 다음 단계의 입력으로 자동 전달됩니다.

---

## 3. AI 도구 — 프롬프트 생성기

### 3.1 PRD (Product Requirements Document)

**무엇인가요?**  
PRD는 "무엇을 만들 것인가"를 정의하는 문서입니다. AI 개발에서는 Claude나 ChatGPT가 이 문서를 보고 어떤 제품을 만들어야 할지 이해합니다.

**언제 사용하나요?**  
새로운 서비스나 기능 개발을 시작할 때 **가장 먼저** 작성합니다.

**입력 항목 설명**

| 입력 항목 | 설명 | 예시 |
|---------|------|------|
| Product Overview | 서비스/제품을 한두 문장으로 설명 | "AI 이력서 분석 서비스" |
| Reference Service URL | 참고할 유사 서비스 주소 (선택) | "https://resume.io" |
| Key Features | 반드시 포함할 기능 목록 (줄바꿈 구분) | "로그인/회원가입\n이력서 업로드\n섹션별 피드백" |
| Target Users | 예상 사용자 유형 | "취업준비 중인 20대 대학생" |
| Target Platform | 서비스가 실행될 환경 | Web, Android, iOS 등 체크박스 선택 |
| Data Storage | 데이터 저장 방식 | Local Storage (DB 없음) / Database |
| Tech Stack | 사용할 기술 (선택) | "Next.js, Supabase, Claude API" |
| Feature Suggestions | AI가 추가 기능을 제안할지 여부 | 체크박스 |

**사용 방법**

1. `/prd` 페이지에서 폼을 작성합니다
2. **Fill Example** 버튼을 누르면 예시 데이터가 자동 입력됩니다
3. **Generate/Copy Prompt** 버튼을 클릭합니다
4. 팝업에서 생성된 프롬프트를 확인합니다

**팝업 화면에서 할 수 있는 것들**

```
┌──────────────────────────────────────────┐
│  Prompt Generated! 🎉                     │
│                                          │
│  [생성된 프롬프트 내용 (스크롤 가능)]      │
│                                          │
│  [Copy]  [Generate with Claude ✨]       │
│  [Save to bkit 💾] ← Claude 생성 후 표시  │
│  [Create IA →]                           │
└──────────────────────────────────────────┘
```

- **Copy**: 프롬프트를 클립보드에 복사 → Claude.ai, ChatGPT 등에 직접 붙여넣기
- **Generate with Claude**: Claude API로 문서를 자동 생성 + 다운로드 ([4장 참고](#4-ai-직접-생성--claude-api-설정))
- **Save to bkit**: 생성된 문서를 Claude Code(bkit)에 연동 ([9장 참고](#9-bkit-연동--pdca-사이클-통합))
- **Create IA →**: 다음 단계(IA)로 이동, 이 단계에서 생성한 내용 자동 전달

---

### 3.2 TRD (Technical Requirements Document)

**무엇인가요?**  
TRD는 PRD에서 정의한 "무엇을"을 "어떻게 만들 것인가"로 번역한 기술 문서입니다. 시스템 아키텍처, 기술 스택, API 설계, 보안 요구사항 등을 다룹니다.

**언제 사용하나요?**  
PRD 작성 후, 특히 개발팀에 기술적 가이드가 필요할 때 사용합니다. **선택 사항**입니다 — 간단한 프로젝트는 건너뛰어도 됩니다.

> **홈 화면 플로우에서 TRD는 "선택 | 병렬 가능"으로 표시됩니다.**  
> PRD → IA로 바로 가도 되고, TRD를 병행해서 작성해도 됩니다.

**입력 항목 설명**

| 입력 항목 | 설명 |
|---------|------|
| Project Name | 프로젝트 이름 |
| Overview | 프로젝트 기술적 개요 |
| Sensitive Data | 처리하는 민감 데이터 (개인정보, 결제 정보 등) |
| External Integrations | 연동할 외부 서비스 (결제, 소셜 로그인 등) |
| Budget/Schedule | 예산 및 일정 제약 |
| Additional Requirements | 추가 기술 요구사항 |

생성된 TRD 프롬프트는 시스템 아키텍처, API 설계, 보안, 성능, CI/CD 파이프라인 등 **10개 섹션**의 상세 기술 문서를 생성하도록 설계되어 있습니다.

---

### 3.3 IA (Information Architecture)

**무엇인가요?**  
IA는 서비스의 정보 구조를 설계합니다. 전체 화면 목록, 각 화면 간의 이동 경로, 메뉴 구조 등을 정의합니다.

**언제 사용하나요?**  
PRD 완성 후 화면 설계를 시작하기 전에 작성합니다.

**이전 단계 컨텍스트 자동 로드**

PRD 단계에서 "Create IA →" 버튼으로 이동했다면, IA 페이지 상단에 파란색 배너가 표시됩니다:

```
┌──────────────────────────────────────────┐
│ ℹ️  이전 단계(PRD) 내용이 로드되었습니다.   │
│    프롬프트 생성 시 자동으로 포함됩니다.   [✕]│
└──────────────────────────────────────────┘
```

이 배너가 표시되면 PRD 내용이 IA 프롬프트에 **자동으로 포함**됩니다. 별도로 복붙할 필요가 없습니다.

---

### 3.4 Use Cases (유스케이스)

**무엇인가요?**  
유스케이스는 사용자가 시스템과 어떻게 상호작용하는지를 단계별로 기술합니다. "사용자가 로그인한다"는 하나의 유스케이스이며, 정상 흐름과 예외 흐름을 모두 정의합니다.

**언제 사용하나요?**  
IA 완성 후 각 기능의 세부 동작을 명세할 때 사용합니다.

**입력 항목 설명**

| 입력 항목 | 설명 | 예시 |
|---------|------|------|
| System Name | 시스템 이름 | "AI 이력서 분석 서비스" |
| Actors | 시스템을 사용하는 주체 | "일반 사용자, 관리자, 외부 AI API" |
| Features | 유스케이스를 작성할 기능 목록 | "로그인, 이력서 업로드, 분석 결과 조회" |
| Non-Functional Requirements | 성능, 보안 등 비기능 요구사항 | "응답 시간 3초 이내, HTTPS 필수" |

> **이전 버전과의 차이**: 이전에는 입력 필드가 없었습니다. 현재 버전에서는 4개 입력 항목을 채우면 해당 내용에 맞는 유스케이스 문서가 생성됩니다.

---

### 3.5 Design Guide (디자인 가이드)

**무엇인가요?**  
디자인 가이드는 색상, 타이포그래피, 컴포넌트 스펙 등 시각적 설계 기준을 정의합니다. 전문 디자이너 없이도 AI가 구현 가능한 디자인 시스템을 생성하도록 도와줍니다.

**언제 사용하나요?**  
Use Cases 완성 후 UI 구현 전에 작성합니다.

**이전 단계 컨텍스트 자동 로드**

Use Cases 단계에서 "Design Guide 작성하기 →" 버튼으로 이동했다면, Use Cases 내용이 Design Guide 프롬프트에 자동으로 포함됩니다.

---

## 4. AI 직접 생성 — Claude API 설정

프롬프트를 복사해서 Claude.ai에 붙여넣는 대신, **이 시스템 내에서 바로 Claude로 문서를 생성**하고 다운로드할 수 있습니다.

### 4.1 Claude API 키 발급

1. [console.anthropic.com](https://console.anthropic.com) 접속
2. 로그인 → **API Keys** 메뉴
3. **Create Key** 클릭
4. 키 이름 입력 후 생성 (`sk-ant-api03-...` 형식)

> **주의**: API 키는 한 번만 표시됩니다. 반드시 복사해서 안전한 곳에 보관하세요.

### 4.2 API 키 등록

1. 아무 생성기에서 프롬프트를 생성합니다
2. 팝업에서 **Generate with Claude ✨** 버튼 클릭
3. API 키 입력 모달이 뜨면 `sk-ant-...` 키를 입력합니다
4. **Save & Generate** 클릭

```
┌──────────────────────────────────────────┐
│  Enter Claude API Key                    │
│                                          │
│  API Key                                 │
│  [sk-ant-..............................]  │
│                                          │
│                       [Save & Generate]  │
└──────────────────────────────────────────┘
```

> API 키는 **브라우저 로컬 스토리지**에만 저장됩니다. 서버로 전송되지 않습니다.

### 4.3 생성 완료 후

생성이 완료되면 **`generated_content.md`** 파일이 자동으로 다운로드됩니다.

이후 팝업에 **Save to bkit 💾** 버튼이 활성화됩니다 ([9장 참고](#9-bkit-연동--pdca-사이클-통합)).

### 4.4 사용 모델

- 모델: `claude-sonnet-4-6` (Anthropic 최신 Sonnet 모델)
- 최대 출력: 8,192 토큰
- 언어: 프롬프트에 지정된 언어 (기본 한국어)

---

## 5. 단계 간 컨텍스트 전달

가장 중요한 기능 중 하나입니다. 각 단계에서 Claude로 생성한 문서가 **다음 단계에 자동으로 전달**됩니다.

### 작동 방식

```
PRD 작성 → [Generate with Claude] → 문서 생성
         → [Create IA →] 클릭
         
         ↓ sessionStorage에 PRD 내용 저장
         
IA 페이지 → 상단에 "이전 단계(PRD) 내용이 로드되었습니다" 배너 표시
         → 폼 작성 후 프롬프트 생성 시 PRD 내용 자동 포함
```

### 컨텍스트 흐름 전체 구조

```
PRD 생성 내용
    │
    └──→ IA 프롬프트에 자동 주입
              │
              └──→ UseCase 프롬프트에 자동 주입
                        │
                        └──→ Design Guide 프롬프트에 자동 주입
```

### 중요 사항

- 컨텍스트는 **브라우저 세션 동안만 유지**됩니다 (탭을 닫으면 초기화)
- **Claude로 생성한 내용**만 전달됩니다 (프롬프트 복사 후 외부에서 생성한 경우 전달되지 않음)
- 배너의 **✕** 버튼으로 컨텍스트를 해제할 수 있습니다

---

## 6. 초안 자동 저장

폼에 입력한 내용은 **자동으로 저장**됩니다. 실수로 탭을 닫거나 새로고침해도 내용이 유지됩니다.

### 작동 방식

- 폼 입력 시 실시간으로 `localStorage`에 저장
- 페이지 재방문 시 이전 내용 자동 복원
- 복원 시 토스트 메시지 표시: **"이전 작업을 불러왔습니다"**

### 초안 삭제

폼 하단의 **처음부터 시작** 버튼을 클릭하면 저장된 초안이 삭제되고 폼이 초기화됩니다.

---

## 7. 문서 도구

### 7.1 개인정보처리방침 생성기

서비스 출시 전 필수 문서인 개인정보처리방침을 생성합니다.

**접속**: `/privacy-policy`

**주요 입력 항목**

| 항목 | 설명 |
|------|------|
| Company Name | 서비스 운영 회사명 |
| Service Name | 서비스 이름 |
| Contact Email | 개인정보 담당자 이메일 |
| Collected Data | 수집하는 개인정보 항목 (이름, 이메일, 전화번호 등) |
| Purpose | 수집 목적 |
| Third Party Sharing | 제3자 제공 여부 |
| Outsourcing | 개인정보 처리 위탁 여부 |
| Data Retention | 보유/이용 기간 |
| Security Measures | 기술적/관리적 보호 조치 |
| Overseas Transfer | 개인정보 국외 이전 여부 |

생성된 방침은 한국 개인정보보호법(개인정보보호법 제30조)을 기준으로 작성됩니다.

### 7.2 오픈소스 라이선스 문서 생성기

**접속**: `/open-source-license`

`package.json` 파일을 업로드하면 프로젝트에서 사용 중인 오픈소스 라이선스 목록을 자동으로 생성합니다.

---

## 8. 개발자 도구

### 8.1 HTML Table → JSON 변환기

**접속**: `/dev/table-to-json`

API 문서나 HTML 테이블 형태의 데이터를 JSON 형식으로 변환합니다. API 문서 내용을 변수로 활용할 때 유용합니다.

**사용 방법**: HTML 테이블 코드를 붙여넣고 변환 버튼 클릭

### 8.2 이미지 색상 추출기 (Image Color Picker)

**접속**: `/dev/spoid-image-color`

이미지의 원하는 지점을 클릭하면 해당 위치의 색상 정보(HEX, RGB, HSL)를 추출합니다.

### 8.3 색상 팔레트 생성기

**접속**: `/dev/generate-color-palette`

기본 색상 하나를 입력하면 디자인 시스템에 활용할 수 있는 체계적인 색상 팔레트(50~950 단계)를 생성합니다.

---

## 9. bkit 연동 — PDCA 사이클 통합

> 이 기능은 **Claude Code CLI + bkit 플러그인**을 사용하는 개발자를 위한 기능입니다.  
> bkit이 설치되어 있지 않다면 [bkit 설치 가이드](https://github.com/bojagi-inc/bkit)를 참고하세요.

### bkit이란?

bkit은 Claude Code에서 사용하는 PDCA(Plan-Do-Check-Act) 개발 방법론 플러그인입니다. 기획 문서(Plan) → 설계 → 구현 → 검증 → 보고 사이클을 관리합니다.

### 9.1 Save to bkit 기능

Claude로 문서를 생성한 후 **Save to bkit 💾** 버튼을 클릭하면, 생성된 문서가 Claude Code 프로젝트의 적절한 경로에 **자동으로 저장**됩니다.

**저장 경로 규칙**

| 도구 | 저장 경로 |
|------|---------|
| PRD | `docs/00-pm/{feature-name}.prd.md` |
| TRD | `docs/02-design/features/{feature-name}.trd.md` |
| IA | `docs/02-design/features/{feature-name}.ia.md` |
| Use Cases | `docs/02-design/features/{feature-name}.usecase.md` |
| Design Guide | `docs/02-design/features/{feature-name}.design.md` |

> **중요**: Save to bkit은 **로컬 개발 환경(`npm run dev`)에서만** 동작합니다.  
> 파일을 프로젝트 폴더에 직접 저장하기 때문입니다.

### 9.2 Save to bkit 사용 방법

1. 생성기에서 폼을 작성합니다
2. **Generate with Claude** 버튼으로 문서를 생성합니다
3. **Save to bkit** 버튼을 클릭합니다
4. Feature Name을 입력합니다 (영문 소문자, 하이픈 사용)

```
┌──────────────────────────────────────────┐
│  Save to bkit                            │
│                                          │
│  Feature Name                            │
│  [loan-approval-system              ]    │
│                                          │
│  Save path:                              │
│  docs/00-pm/loan-approval-system.prd.md  │
│                                          │
│                              [Save]      │
└──────────────────────────────────────────┘
```

5. **Save** 클릭 후 성공 메시지 확인:

```
┌──────────────────────────┐
│ Saved to bkit            │
│ docs/00-pm/loan-...prd.md│
│ Run: /pdca plan loan-... │
└──────────────────────────┘
```

### 9.3 Claude Code에서 PDCA Plan 시작

PRD를 `docs/00-pm/{feature}.prd.md`에 저장했다면, Claude Code 터미널에서:

```bash
/pdca plan loan-approval-system
```

을 실행하면 bkit이 **PRD를 자동으로 참조**하여 PDCA Plan 문서를 생성합니다.

### 9.4 전체 bkit 연동 워크플로우

```
이 시스템 (웹 브라우저)          Claude Code (터미널)
─────────────────────────────   ─────────────────────────
1. PRD 폼 작성
2. Generate with Claude
3. Save to bkit
   → docs/00-pm/my-feature.prd.md 저장
                                4. /pdca plan my-feature
                                   → PRD 자동 참조하여
                                     Plan 문서 생성
                                5. /pdca design my-feature
                                6. 구현 시작
                                7. /pdca analyze my-feature
                                   → Gap Analysis
                                8. /pdca iterate (필요시)
                                9. /pdca report my-feature
```

---

## 10. 전체 워크플로우 예시

### 예시: "대출 심사 AI 보조 시스템" 기획

#### Step 1 — PRD 작성

`/prd` 페이지 접속 후 입력:

| 항목 | 입력 내용 |
|------|---------|
| Product Overview | 은행 대출 심사 담당자를 위한 AI 보조 시스템. 고객 신용 정보를 분석하여 심사 의견을 자동 생성합니다. |
| Key Features | 고객 정보 입력\nAI 신용 분석\n심사 의견서 자동 생성\n담당자 검토 및 승인 |
| Target Users | 대출 심사 담당 직원, 지점장 |
| Target Platform | Web |
| Tech Stack | Next.js, Claude API, PostgreSQL |

→ **Generate with Claude** 클릭 → 문서 생성 및 다운로드  
→ **Save to bkit** → Feature Name: `loan-review-ai` → Save  
→ **Create IA →** 클릭 (IA 페이지로 이동, PRD 내용 자동 전달)

#### Step 2 — IA 작성

IA 페이지 상단에 "이전 단계(PRD) 내용이 로드되었습니다" 배너 확인  
→ IA 폼 작성 (서비스 규모, 주요 사용자 역할 등 입력)  
→ **Generate with Claude** 클릭  
→ **Save to bkit** → Feature Name: `loan-review-ai` → Save  
→ **Usecases 작성하기 →** 클릭

#### Step 3 — Use Cases 작성

| 항목 | 입력 내용 |
|------|---------|
| System Name | 대출 심사 AI 보조 시스템 |
| Actors | 심사 담당자, 지점장, Claude AI |
| Features | 로그인, 고객 정보 입력, AI 분석 요청, 심사 의견서 생성, 최종 승인 |
| Non-Functional Requirements | 분석 결과 30초 이내 반환, 개인정보 암호화 필수 |

→ **Generate with Claude** 클릭 (IA 컨텍스트 자동 포함)  
→ **Save to bkit** → Save  
→ **Design Guide 작성하기 →** 클릭

#### Step 4 — Design Guide 작성

→ 폼 작성 후 **Generate with Claude** 클릭 (UseCase 컨텍스트 자동 포함)  
→ **Save to bkit** → Save

#### Step 5 — Claude Code에서 PDCA 시작

```bash
# 저장된 PRD를 자동 참조하여 Plan 문서 생성
/pdca plan loan-review-ai

# 설계 문서 작성
/pdca design loan-review-ai

# 구현 후 Gap 분석
/pdca analyze loan-review-ai

# 완료 보고서
/pdca report loan-review-ai
```

---

## 11. 개발 환경 설정

### 요구사항

- Node.js 18 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
# 의존성 설치
npm install --legacy-peer-deps

# 개발 서버 실행 (Turbopack)
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 환경 변수 설정 (선택)

`.env.local` 파일을 프로젝트 루트에 생성:

```env
# Google Analytics (선택)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Sheets API (이메일 구독 기능, 선택)
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEETS_ID=your-spreadsheet-id
```

### 프로덕션 빌드

```bash
npm run build
npm run start
```

### 개발 명령어 요약

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Turbopack 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 + 사이트맵 생성 |
| `npm run lint` | ESLint 검사 |
| `npm run start` | 프로덕션 서버 실행 |

---

## 12. 자주 묻는 질문

### Q. Claude API 키가 없어도 사용할 수 있나요?

네. **Copy** 버튼으로 프롬프트를 복사한 후 [Claude.ai](https://claude.ai) 또는 ChatGPT에 직접 붙여넣어 사용할 수 있습니다. Claude API 키는 이 시스템 내에서 문서를 자동 생성하고 다운로드할 때만 필요합니다.

### Q. API 키는 안전한가요?

API 키는 **브라우저의 로컬 스토리지에만** 저장됩니다. 서버나 외부로 전송되지 않습니다. 단, 공용 컴퓨터에서는 사용 후 브라우저 로컬 스토리지를 지우는 것을 권장합니다.

### Q. 생성된 프롬프트는 어떤 AI에 사용할 수 있나요?

Claude (추천), ChatGPT, Gemini 등 대부분의 LLM에 사용할 수 있습니다. 프롬프트는 XML 형식 태그로 구조화되어 있어 모든 AI가 이해할 수 있습니다.

### Q. "Save to bkit"이 작동하지 않아요.

Save to bkit은 **로컬 개발 서버(`npm run dev`) 환경에서만** 동작합니다. 배포된 환경(Vercel 등)에서는 파일 시스템 접근이 제한되므로 동작하지 않습니다. 로컬에서 실행 중인지 확인하세요.

### Q. 단계 간 컨텍스트 전달이 안 돼요.

컨텍스트 전달은 두 가지 조건이 필요합니다:
1. 이전 단계에서 **Claude로 문서를 생성**했어야 합니다 (프롬프트 복사만으로는 전달되지 않음)
2. **같은 브라우저 세션** 내에서 이동해야 합니다 (탭 닫기 후 재접속 시 초기화)

### Q. 초안 자동 저장이 복원되지 않아요.

브라우저의 로컬 스토리지가 초기화된 경우(시크릿 모드, 브라우저 데이터 삭제 등) 복원되지 않습니다. 또한 **처음부터 시작** 버튼을 눌렀다면 저장된 초안이 삭제됩니다.

### Q. PRD → IA 순서를 반드시 지켜야 하나요?

아니요. 각 생성기는 독립적으로 사용할 수 있습니다. 다만 순서대로 작성하면 이전 단계의 내용이 다음 단계에 자동으로 전달되어 더 일관성 있는 문서를 만들 수 있습니다.

---

## 프로젝트 정보

- **운영**: PT Bank Jtrust Indonesia
- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS, shadcn-ui, Anthropic SDK
- **라이선스**: Private

---

*Last updated: 2026-04-04*
# PM-Automation
