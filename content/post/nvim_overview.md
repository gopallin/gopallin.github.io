+++
title = "[Neovim] basic settings"
date = 2025-12-10T22:11:02+08:00
author = "Gopal"
tags = ["nvim"]
cover = ""
summary = "安裝及基礎設定"
draft = false
+++

{{< nvim_series >}}

---

## 為什麼是 Neovim？

* 使用 vim 順手
* 喜歡簡潔風，對 IDE 外觀有自己的堅持
* 覺得某些 IDE（像 VS Code）功能太多，反而干擾專注

有次看到同事只靠幾個快捷鍵，就完成我得用觸控板點半天的操作，當下就決定：該換編輯器了。
剛好我也在研究分離式鍵盤，兩者搭配起來，整體開發工作流確實更流暢。

## 安裝 Neovim
```bash
brew install neovim
```

## 基本檔案結構
```text
~/.config/nvim
├── lua
│   ├── config
│   │   ├── autocmds.lua
│   │   ├── keybindings.lua
│   │   ├── options.lua
│   │   └── styles.lua
│   ├── plugins
│   │   ├── lazy.lua -- 官方範例常放在 ~/.config/nvim/lua/config；我習慣放在 plugins
│   │   ├── plugin01.lua
│   │   └── plugin02.lua
│   └── utility
│       ├── utility01.lua
│       └── utility02.lua
└── init.lua
```

## 設定 Options

1. 建立 `options.lua`，集中管理 Neovim 的基礎行為（縮排、搜尋、行號、剪貼簿等）。
```bash
mkdir -p ~/.config/nvim/lua/config
nvim ~/.config/nvim/lua/config/options.lua
```

```lua
-- ~/.config/nvim/lua/config/options.lua
vim.g.mapleader = " "
vim.g.maplocalleader = " "

vim.g.encoding = "UTF-8"
vim.o.fileencoding = "UTF-8"

vim.opt.shell = "/bin/zsh"

vim.o.tabstop = 2
vim.bo.tabstop = 2
vim.o.shiftround = true
vim.o.shiftwidth = 2
vim.o.softtabstop = 2
vim.o.expandtab = true

vim.opt.clipboard = "unnamedplus"
vim.opt.number = true
vim.opt.relativenumber = true

vim.o.showtabline = 2 -- Always show the tabline

vim.o.ignorecase = true
vim.o.smartcase = true
vim.o.hlsearch = true
vim.o.incsearch = true

vim.o.cursorline = true
vim.o.cursorcolumn = true

vim.opt.foldmethod = "indent"
vim.opt.foldenable = true -- Enable folding
vim.opt.foldlevel = 99    -- Start with all folds open
```

2. 再建立 `lua/init.lua`，統一載入設定模組。
```bash
nvim ~/.config/nvim/lua/init.lua
```

```lua
-- ~/.config/nvim/lua/init.lua
local function load_files(path, files)
    for _, file in ipairs(files) do
        require(path .. '.' .. file)
    end
end

load_files('config', {
  'options',
})
```

完成這一步後，你就有一個乾淨、可擴充的 Neovim 基礎配置。後續要加快捷鍵、主題或插件，直接沿著這個結構往下堆就行。

---

{{< post_footer >}}
