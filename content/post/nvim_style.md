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
  'keybindings',
  'styles', -- 新增這一行
})
```

`command`
```bash
:Lazy Sync
```

其實這整個流程也就是使用 Lazy.vim 套件管理之後的安裝過程，未來有其他套件想要安裝也都是用同一流程即可

---

{{< post_footer >}}
