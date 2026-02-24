+++
title = "Neovim"
date = 2025-12-10T22:11:02+08:00
author = "Gopal"
keywords = ["nvim"]
cover = ""
summary = "Whats Your IDE? Have You Ever Try Neovim"
draft = false
+++

### 因為我是...

* 使用 vim 順手
* 喜歡簡潔風，對於 IDE 外觀有自己的堅持
* 覺得一些編輯器 IDE 如 vs code 很多功能其實挺多餘

在看到同事用鍵盤輕輕敲幾個鍵就可以做到我需要用觸控板點好久才能完成的事，直接就冒起了改個編輯器的心。剛好目前也正在研究分離式鍵盤，如果搭配得宜，我相信可以讓開發工作流更順暢！

因為 Neovim [官方文件 Quick Start](https://neovim.io/doc/build/) 已經有非常簡單明瞭的步驟了，這裡就不再贅述了，僅僅想跟大家分享我的配置

### 安裝 Neovim
```bash
brew install neovim
```

### 檔案結構 
```text
~/.config/nvim
├── lua
│   ├── config
│   │   ├── autocmds.lua
│   │   ├── keybindings.lua
│   │   ├── options.lua
│   │   └── styles.lua
│   ├── plugins
│   │   ├── lazy.lua -- 官方把這放在 ~/.config/nvim/lua/config，但我更將它視為套件，所以我是放這裡
│   │   ├── plugin01.lua
│   │   └── plugin02.lua
│   └── utility
│       ├── utility01.lua
│       └── utility02.lua
└── init.lua
```

### Options 

`新增 options.lua 檔案 ，放基本設定的地方`
```lua
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

### Plugins 

* [Neovim Lazy.vim - So Lazy Me!]({{< ref "post/nvim_lazy.md" >}}) 
* [Neovim Terminal - 終端機裡的終端機]({{< ref "post/nvim_terminal.md" >}}) 

---

歡迎上我的 [github](https://github.com/gopallin/nvim) 以瀏覽更多。如果覺得有什麼可以改善的地方，歡迎提出來一起討論，讓我們一起進步！ 
