+++
title = "[Neovim] lazy.nvim"
date = 2025-12-18T22:27:02+08:00
author = "Gopal"
tags = ["nvim"]
cover = ""
summary = "先分清 lazy.nvim 與 LazyVim"
weight = 2
draft = false
+++

{{< nvim_series >}}

---

第一次接觸 Neovim 時，你很容易被「Lazy」這個詞搞混。先把兩個常見名詞拆開：

*   **lazy.nvim**：這是一個強大的 Neovim 插件管理器。
*   **LazyVim**：這是一個基於 `lazy.nvim` 構建的 Neovim 配置發行版，集成了多種插件與預設配置。

---

![Placeholder Image](/images/nvim-lazy.gif)

### 插件管理器 `lazy.nvim` 與配置發行版 `LazyVim`

簡單說，`lazy.nvim` 給你的是「自由度」：你可以自己挑插件、自己決定載入時機、自己維護環境。

`LazyVim` 則是「現成套餐」：幫你打包好插件、主題與預設配置，開箱就能用。  
如果你剛入門，先從發行版開始完全合理；我自己一開始也是這樣。

### 回歸編輯器的「初心」

我選 Neovim 的核心理由，是追求「可控性」與「效率」。這和使用功能齊全的 IDE（例如 VS Code）是不同路線。  
從 VS Code 轉到 Neovim，很像從精裝套房搬到可完全自訂的工作室：前期要整理，但後面很順手。

當然，Neovim 的許多「神級功能」你未必天天用得到。  
也因此常有人開玩笑說：「那我在 VS Code 裡開 Vim 模式不就好了？」[1]

---
### 環境要求
* Neovim >= 0.8.0
* Git >= 2.19.0

### 安裝步驟

1) 修改 `init.lua` 載入 `lazy`：
```lua
-- ~/.config/nvim/lua/init.lua
load_files('plugins', {
  'lazy',
})
```

2) 新增 `lazy.lua`（後續插件都可放在這裡，或拆分成多個檔案）：
```bash
mkdir -p ~/.config/nvim/lua/plugins
nvim ~/.config/nvim/lua/plugins/lazy.lua
```

```lua
-- ~/.config/nvim/lua/plugins/lazy.lua
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

{{< post_footer >}}
