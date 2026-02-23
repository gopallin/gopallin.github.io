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

### 檔案結構 
```
~/.config/nvim
├── lua
│   ├── config
│   │   ├── autocmds.lua
│   │   ├── keybindings.lua
│   │   ├── options.lua
│   │   └── styles.lua
│   ├── plugins
│   │   ├── plugin01.lua
│   │   └── plugin02.lua
│   └── utility
│       ├── utility01.lua
│       └── utility02.lua
└── init.lua
```

---

### Settings
在 `.config/nvim/lua/plugins/lazy.lua`

```
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
```

### Plugins 

* [Neovim Lazy.vim - So Lazy Me!]({{< ref "post/nvim_lazy.md" >}}) 
* [Neovim Terminal - 終端機裡的終端機]({{< ref "post/nvim_terminal.md" >}}) 

---

歡迎上我的 [github](https://github.com/gopallin/nvim) 以瀏覽更多。如果覺得有什麼可以改善的地方，歡迎提出來一起討論，讓我們一起進步！ 
