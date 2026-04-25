+++
title = "[Neovim] Style"
date = 2026-02-25T21:00:00+08:00
author = "Gopal"
tags = ["nvim"]
cover = ""
summary = "挑個喜歡的顏色主題!🌈"
weight = 3
draft = false
+++

{{< nvim_series >}}

---

![Placeholder Image](/images/nvim-style.gif)

最近我在用的是 [anysphere](https://github.com/dapovich/anysphere.nvim) 主題（據說也是 Cursor 的預設風格之一）。  
總之，顏色舒服、對比清楚，寫久了眼睛沒那麼累，就分享給你。

1. 透過 `lazy.nvim` 安裝主題
```lua
-- ~/.config/nvim/lua/plugins/lazy.lua
require("lazy").setup({
  { "dapovich/anysphere.nvim" }, -- 新增這一行
}, {
  rocks = {
    enabled = false,
  },
})
```

2. 新增 `styles.lua`
```bash
nvim ~/.config/nvim/lua/config/styles.lua
```
```lua
-- ~/.config/nvim/lua/config/styles.lua
vim.cmd.colorscheme("anysphere")
```

3. 在 `init.lua` 載入樣式設定
```lua
-- ~/.config/nvim/lua/init.lua
load_files('config', {
  'options',
  'styles', -- 新增這一行
})
```

4. 同步安裝
```bash
:Lazy sync
```

其實整個流程就是 `lazy.nvim` 的標準安裝步驟。  
未來要加其他插件，流程幾乎完全一樣：加入插件宣告、寫設定檔、在 `init.lua` 載入、最後同步。

到這裡，你已經具備最核心的擴充能力：  
想加功能時，先去 GitHub 找插件，評估後接進你的配置就行。大多數需求都有人做過輪子了。

如果真的找不到合適插件，也不是世界末日：要嘛調整需求，要嘛自己動手寫。  
後面我也會分享幾個我自己刻的小功能。

---

{{< post_footer >}}
