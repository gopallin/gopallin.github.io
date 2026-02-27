+++
title = "[Neovim] style"
date = 2026-02-25T21:00:00+08:00
author = "Gopal"
keywords = ["nvim"]
cover = ""
summary = "挑個喜歡的顏色主題!"
draft = false
+++

{{< nvim_series >}}

---

![Placeholder Image](/images/nvim-style.gif)

現在我正在使用的據說是 Cursor 所使用的預設主題 [anysphere](https://github.com/dapovich/anysphere.nvim)，目前成為我的心頭好🤍❤️分享給大家

`修改 lazy.lua，使用 Lazy.vim 安裝`
```lua
-- ~/.config/nvim/lua/plugins/lazy.lua
require("lazy").setup({
  rocks = {
    enabled = false,
  },

  { "dapovich/anysphere.nvim" }, -- 新增這一行
})
```

`新增 styles.lua 檔案`
```bash
mkdir ~/.config/nvim/lua/configs/styles.lua
```
```lua
-- ~/.config/nvim/lua/configs/styles.lua
vim.cmd.colorscheme("anysphere")
```

`修改 init.lua 檔案`
```lua
-- ~/.config/nvim/lua/init.lua
load_files('config', {
  'options',
  'styles', -- 新增這一行
})
```

`command`
```bash
:Lazy Sync
```

其實這整個流程也就是使用 Lazy.vim 套件管理之後的安裝過程，未來有其他套件想要安裝也都是用同一流程即可

在系列文章中，在本文以及之前其實就已經介紹了最基礎的 Neovim 檔案結構跟未來想要擴充套件時的做法。當心裡想要或許可以新增些什麼功能時，上 Github 搜尋大多可以找到。如果找到什麼有趣且實用的 plugins，還請不吝分享~

不幸的話，可能找不到已開發的 plugin，這時要不放棄，要不可以自己做，之後我會分享一些自己刻出來的小功能。

---

{{< post_footer >}}
