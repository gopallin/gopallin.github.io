+++
title = "Continuum"
date = 2026-01-27T12:31:46+08:00
author = "Gopal"
keywords = ["aws"]
cover = ""
summary = "This is a sample blog post to demonstrate Markdown features in Hugo."
draft = false
+++

# AI 學習與 Prompt 資產化系統 (v2.0)

## 1. 目標說明（Why）
本計畫旨在整合：
1. **AI / LLM 核心概念學習**
2. **Prompt Engineering 實作經驗**
3. **可長期使用的 Prompt 向量庫 Prototype**

## 2. 核心問題定義（Problem）
ChatGPT / LLM 對話具有以下特性：
- 多 Chat、多輪互相關聯
- 隱含上下文、決策脈絡、反覆修正

若不結構化：
- Prompt 無法重用，每次都要重新 "Prompting"
- 知識快速過期，無法累積
- 向量庫會累積垃圾資料，導致檢索品質下降

**本專案核心任務：**
> **如何將對話式學習內容，透過「低摩擦力」的流程拆解、萃取，存入「意圖導向」的向量系統。**

---

## 3. 系統設計總覽（Architecture）

### 3.1 資料層拆分原則

#### 原始對話層（Raw Conversation）
- 保存完整 chat 紀錄
- 僅作為考古、回溯用途與 ETL 的來源
- **路徑**：`/chats/raw/*.json`

```json
{
  "chat_id": "2025-01-async-fastapi",
  "messages": [
    { "role": "user", "content": "什麼是 fastapi async await" },
    { "role": "assistant", "content": "..." }
  ],
  "created_at": "2025-01-15",
  "status": "unprocessed" // 標記是否已進行知識萃取
}
```

#### 知識萃取層（Knowledge）
- 將對話內容「壓縮成知識」
- 關鍵設計：作為 Prompt 的依賴項（Dependency），供動態注入使用，避免 Prompt 內含過時資訊。
- **路徑**：`/knowledge/*.md`

```json
Markdown
# Async / Await：Python vs JavaScript (ID: async-py-js)

## 核心差異
- Python async 基於 event loop（單執行緒）
- JavaScript async 與 Promise 深度整合

## 常見誤區
- async 不等於平行處理
```
#### Prompt 資產層（Prompt Assets）
- 可直接重用的 Prompt 模板
- 關鍵設計：增加 context_refs 實現動態注入，增加 intent 優化向量檢索。
- **路徑**：`/prompts/*.json`

```json
{
  "id": "compare-frameworks",
  "purpose": "比較兩個技術選項的優劣與適用場景",
  "description": "適用於技術選型階段，分析效能與學習曲線。",
  
  // 【核心修正】向量化目標是 synthesized user queries，而非 prompt 內容
  "suggested_user_queries": [
      "我要怎麼選技術 Stack?",
      "幫我分析 A 和 B 的差別",
      "技術選型評估"
  ],
  
  "prompt_template": "請根據 {{context_refs}} 中的原則，從效能、學習曲線比較 {{A}} 與 {{B}}",
  "context_refs": ["knowledge/decision-matrix.md"], // 執行時動態讀取最新 Knowledge
  "tags": ["analysis", "decision"],
  "last_used_at": "2025-01-20",
  "pinned": false
}
```

## 4. 關鍵流程：ETL Pipeline (Human-in-the-loop)
為了解決「人工整理太累」的痛點，引入半自動化工具。

- Raw Capture: 自動儲存對話。
- AI Drafting (Tool-Assisted):
    * 執行 CLI: python extract.py <chat_id>
    * 系統呼叫 LLM 分析該對話，自動生成 /knowledge Markdown 草稿與 /prompt JSON 建議。
- Human Review: 使用者只需審核、微調、存檔。
- Vectorization: 系統自動將 `purpose` 與 `suggested_user_queries` 寫入向量庫。

## 5. 向量庫策略（Vector Strategy）
什麼被向量化？ (Search Intent vs Content)

❌ 不向量化 Prompt 本體：Prompt 是指令（Instruction），與使用者搜尋時的問句（Query）語意距離過大。

✅ 向量化 Meta Data：
    * purpose (用途)
    * suggested_user_queries (合成的使用者意圖)
    * tags

什麼進向量庫？

只向量化「穩定價值」：
- Prompt 模板（Template）
- 原則型知識（Principles）

## 6. 自動清理機制（Garbage Collection）
採用分級制，避免誤殺低頻但高價值的資產（如：災難復原手冊）。

1. 分層儲存 (Tiered Storage)
- Hot: 最近 30 天有使用 → 高權重檢索。
- Warm: 30-90 天未用 → 正常檢索。
- Cold (Archive): 90 天+ 未用 → 移出向量庫索引，但在檔案系統保留（需明確指令喚回）。

2. 白名單機制 (Pinning)
- 允許將特定 Prompt 標記為 pinned: true，使其免疫時間衰減。

3. 版本淘汰
- Prompt 採用 Git 版控，僅 master 分支的最新版進入向量庫。

## 7. 可實作 Backlog（Execution Plan）
**Phase 1：基礎建設 & ETL 工具 (The Tooling)**
[ ] 定義資料夾結構

[ ] 開發 draft_extractor.py：輸入 Raw Chat，讓 LLM 吐出結構化的 JSON/Markdown 草稿（降低人為惰性）。

[ ] 定義 Prompt JSON Schema

**Phase 2：Prototype (The Core)**
[ ] FastAPI CRUD

[ ] 實作「動態 Context 注入」邏輯（Prompt 讀取 Knowledge）。

[ ] 基礎向量搜尋（針對 Meta Data 搜尋）。

**Phase 3：品質控制 (The Guardrails)**
[ ] Prompt 使用紀錄 Log

[ ] 實作 Cold Storage 封存邏輯

[ ] Prompt Review Checklist

**Phase 4：學習驗證 (The Milestone)**
[ ] 使用系統完成一個全新主題的學習

[ ] 驗收標準：80% 的結構化工作由既有 Prompt 完成，僅 20% 細節依賴 Free Chat。

## 8. Data Lifecycle（資料生命週期）
- Generate: 使用者與 LLM 對話 → 產生 Raw Chat。
- Extract (AI-Assisted): 呼叫腳本，LLM 協助草擬 Knowledge 與 Prompt。
- Review: 人工確認並儲存。
- Index: 系統針對「意圖」進行向量化。
- Inject: 實際使用時，系統根據 Prompt 的依賴，動態載入最新的 Knowledge。
- Retire: 長期未用且未釘選的資料，自動轉入 Cold Storage。

## 9. 成果定義（Done Criteria）
本專案視為完成，需同時滿足：
- 效率驗證：在學習新主題時，能透過檢索 Prompt 減少 50% 以上的重複鋪陳（Context Setup）。
- 運維可行性：從 Raw Chat 到入庫的過程，人工操作時間需 < 5 分鐘。
- 架構解釋：能清楚說明為何 Prompt 內容本身不適合直接向量化，以及 Knowledge 解耦的重要性。

## 10. 本專案刻意不做的事（Non-Goals）
❌ 全自動無人值守：不追求完全自動化的知識蒸餾，必須保留 Human Review 環節以確保品質。

❌ 即時記憶串接：不追求將當下的對話立刻存入向量庫（會有髒資料），堅持「非同步 ETL」。

❌ 通用知識庫：不做 Google 替代品，只存個人經驗與原則。
