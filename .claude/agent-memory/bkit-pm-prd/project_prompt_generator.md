---
name: project_prompt_generator
description: BJI-IT NextCursor 프롬프트 생성기 스위트 PRD 작성 맥락, 핵심 결정사항, 전략적 포지셔닝
type: project
---

## PRD 작성 완료 (2026-04-04)

출력 경로: `docs/00-pm/prompt-generator.prd.md`

**Why:** PM Agent Team(/pdca pm)의 세 분석 에이전트(discovery, strategy, research) 출력물을 종합하여 8섹션 PRD를 작성하는 작업.

**How to apply:** 향후 이 기능의 PRD 수정 또는 v2 기획 시 이 문서를 기준점으로 사용할 것.

---

## 핵심 전략 결정사항

**비치헤드 세그먼트**: 한국어 솔로 바이브 코더 (총점 18/20, 최우선)
- 절실한 고통 5/5, 점유 가능성 5/5, 추천 잠재력 5/5

**North Star Metric**: 주간 활성 프롬프트 생성자 (WAPG)

**90일 핵심 목표**: 풀체인 워크플로우 완료율 0% → 30%

**포지셔닝**: "Cursor를 시작하기 전에 거치는 워크플로우 — 한국어로, 무료로, PRD부터 디자인 가이드까지 한 번에."

---

## 최우선 기능 우선순위

1. PRD→IA 단계 간 컨텍스트 핸드오프 버튼 (OPP-2, Opp Score 0.86) — sessionStorage 기반
2. 홈페이지 순차 워크플로우 다이어그램 (OPP-1, Score 0.72)
3. localStorage 폼 상태 자동 저장 (OPP-4, Score 0.68)
4. Use Cases 폼 구조화 (현재 입력 필드 0개 — 기술 부채)

---

## 수익 경로

AdSense(현재) → ₩9,900/월 개인 → ₩19,900/월 호스팅 API → ₩49,000/월 팀

**Why:** 프리미엄 전환 경로는 이 PRD 범위 밖이며 별도 기획 필요.

---

## 미결 문제 (다음 사이클 전 해결 필요)

- GA4 이벤트 계측 미구축 (기준선 데이터 없음)
- 프리미엄 구독 전환 UX 미기획
- Use Cases 폼 최적 구조 미검증
