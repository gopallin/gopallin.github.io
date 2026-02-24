+++
title = "[Neovim] Lazy.vim"
date = 2025-12-18T22:27:02+08:00
author = "Gopal"
keywords = ["nvim"]
cover = ""
summary = "So Lazy Me!"
draft = false
+++

系列文章
* [Neovim Overview 首次安裝及設定]({{< ref "post/nvim_overview.md" >}}) 
* [Neovim Lazy.vim - So Lazy Me!]({{< ref "post/nvim_lazy.md" >}})  <- 現在位置
* [Neovim Terminal - 終端機裡的終端機]({{< ref "post/nvim_terminal.md" >}})

---

當我們初次向 AI 提問「什麼是 Neovim？」時，很有可能會遇到「Lazy」這個詞彙，但這裡實際上存在兩個容易混淆的概念：

*   **lazy.nvim**：這是一個強大的 Neovim 插件管理器。
*   **LazyVim**：這是一個基於 `lazy.nvim` 構建的 Neovim 配置發行版，集成了多種插件與預設配置。

---

![Placeholder Image](/images/lazy-vim.gif "Lazy in Neovim")

### 插件管理器 `lazy.nvim` 與配置發行版 `LazyVim`

簡單來說，`lazy.nvim` 賦予你極大的自由，讓你能夠輕鬆地安裝、管理與更新任何你喜歡或由他人開發的 Neovim 插件，打造一個完全符合個人需求與習慣的編輯環境。

而 `LazyVim` 則是一個整合好的「發行版」，它預先打包了一整套精選插件、主題與配置，讓你可以快速啟動一個功能完善的 Neovim 環境，省去自行配置的繁瑣過程。對於初學者而言，直接從發行版入手無疑是一個不錯的選擇，我自己最初也是從發行版開始體驗 Neovim 的樂趣。

### 回歸編輯器的「初心」

我當初選擇 Neovim 的目的是為了追求極致的定制化和效率，這與使用 VS Code 等功能豐富的 IDE 有著截然不同的體驗。從 VS Code 轉換到 Neovim，有時就像從一個豪華套房搬到一個可以完全由你親手打造的個人工作室。

許多時候，你可能會發現 Neovim 的許多強大功能和快捷鍵在日常使用中並不常用，甚至有人會開玩笑說：「直接在 VS Code 裡安裝 Vim 模式可能還更快吧！」[1]

---
### 環境要求 
* Neovim >= 0.8.0
* Git >= 2.19.0

### 步驟 
`新增 init.lua 檔案`
```bash
mkdir ~/.config/nvim/init.lua

```
`新增 lazy.lua 檔案，所有 plugins 都會放這裡`
```bash
mkdir ~/.config/nvim/lua/plugins/lazy.lua
```

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  rocks = {
    enabled = false,
  },
})

```

---

> 1.  這並非對錯之分。事實上，我目前也處於 Neovim 與 Cursor (搭配 Vim 模式的 IDE) 並用的階段，視不同任務需求靈活切換。

歡迎上我的 [GitHub](https://github.com/gopallin/nvim) 瀏覽更多我的配置與相關筆記。如果您有任何建議或想法，也歡迎提出來一起討論，讓我們共同學習與進步！

*(本文經 AI 潤飾)*
