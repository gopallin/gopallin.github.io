+++
title = "[Neovim] Wrap"
date = 2026-03-03T21:00:00+08:00
author = "Gopal"
tags = ["nvim"]
cover = ""
summary = "一鍵包覆"
draft = false
+++

{{< nvim_series >}}

---

![Placeholder Image](/images/nvim-wrap.gif)

懶惰是工程師的天性😈

這是一個我在 VS Code 就很喜歡的小功能，主要就是把原本需要按兩次的符號變成一次就好😆苦於找不到適合的 plugin，就自己來做一個了

1. 新增 Wrap 功能
```bash
nvim ~/.config/nvim/lua/utility/wrap.lua
```

```lua
-- ~/.config/nvim/lua/utility/wrap.lua
local M = {}

M.pairs = {
  ["("] = ")",
  ["["] = "]",
  ["{"] = "}",
  ['"'] = '"',
  ["'"] = "'",
  ["`"] = "`",
}

function M.wrap_selection(open)
  local close = M.pairs[open]
  if not close then return end
  local esc = vim.api.nvim_replace_termcodes("<Esc>", true, false, true)
  vim.api.nvim_feedkeys(esc, "x", false)
  vim.cmd('normal! `>a' .. close)
  vim.cmd('normal! `<i' .. open)
end

return M
```

2. 綁定快捷鍵，編輯快捷鍵設定檔
```bash
nvim ~/.config/nvim/lua/config/keybindings.lua
```

```lua
-- ~/.config/nvim/lua/config/keybindings.lua
local wrap = require('utility.wrap')

for open, _ in pairs(wrap.pairs) do
  map('v', open, function() wrap.wrap_selection(open) end)
end
```

完成後，使用 visual mode 包覆住你想要加上的字串，再按出符號就可以囉!

---

{{< post_footer >}}
