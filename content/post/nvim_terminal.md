+++
title = "[Neovim] Terminal"
date = 2025-12-18T22:27:02+08:00
author = "Gopal"
keywords = ["nvim"]
cover = ""
summary = "終端機裡的終端機"
draft = false
+++

{{< nvim_series >}}

---

![Placeholder Image](/images/nvim-terminal.gif)

是的，你沒有看錯!當我用終端機開啟 Neovim 時，就像 VScode 一樣，我也可以再開一個終端機下指令。有時候要下指令跑測試時，可以一鍵開關終端機真的好好用!

---

`新增函數`
```bash
mkdir ~/.config/nvim/lua/utility/terminal.lua
```

```lua
-- ~/.config/nvim/lua/utility/terminal.lua
local function open_new_terminal()
  -- Capture the current file buffer/window if it’s a "real" file.
  local cur_buf = vim.api.nvim_get_current_buf()
  if is_real_buffer(cur_buf) then
    last_buf = cur_buf
    last_win = vim.api.nvim_get_current_win()
  else
    for _, win in ipairs(vim.api.nvim_list_wins()) do
      local buf = vim.api.nvim_win_get_buf(win)
      if is_real_buffer(buf) then
        last_buf = buf
        last_win = win
        break
      end
    end
  end

  vim.cmd("botright split")
  vim.cmd("enew") -- Create a new empty buffer for the terminal
  vim.cmd("resize 20")
  -- If Neovim runs via sudo, start terminal as the invoking user instead of root.
  -- Fall back to the current shell user when no non-root target is available.
  local cwd = vim.fn.getcwd()
  local target_user = vim.env.SUDO_USER or vim.env.USER or ""
  local term_cmd

  if target_user ~= "" and target_user ~= "root" then
    term_cmd = { "sudo", "-u", target_user, vim.o.shell, "-l" }
  else
    term_cmd = { vim.o.shell, "-l" }
  end

  vim.fn.termopen(term_cmd, { cwd = cwd })
  local buf = vim.api.nvim_get_current_buf()
  local win = vim.api.nvim_get_current_win()
  local session = { buf = buf, win = win, last_active = os.time() }
  table.insert(terminals, session)
end

-- toggle_terminal(): When pressing "<leader>t"
-- 1. If a terminal is visible at the bottom, close it and update its last_active time.
-- 2. If no terminal is visible, then check for an existing inactive session.
--    If one exists, re-open that session at the bottom.
-- 3. Otherwise, create a new terminal session.
local function toggle_terminal()
  local bottom_session = get_bottom_terminal_session()

  -- Save the current window and buffer before switching to the terminal
  if not bottom_session then
    last_win = vim.api.nvim_get_current_win()
    last_buf = vim.api.nvim_get_current_buf()
  end

  if bottom_session then
    if vim.api.nvim_win_is_valid(bottom_session.win) then
      vim.api.nvim_win_close(bottom_session.win, true)
    end
    bottom_session.win = nil
    bottom_session.last_active = os.time()

    vim.schedule(function()
      -- Restore last active buffer/window
      if last_win and vim.api.nvim_win_is_valid(last_win) and last_buf and vim.api.nvim_buf_is_valid(last_buf) then
        vim.api.nvim_set_current_win(last_win)
        vim.api.nvim_set_current_buf(last_buf)
      elseif last_buf and vim.api.nvim_buf_is_valid(last_buf) then
        vim.api.nvim_set_current_buf(last_buf)
      else
        -- Fallback to any valid non-terminal buffer
        for _, win in ipairs(vim.api.nvim_list_wins()) do
          local buf = vim.api.nvim_win_get_buf(win)
          if is_real_buffer(buf) and vim.api.nvim_buf_is_valid(buf) then
            vim.api.nvim_set_current_win(win)
            vim.api.nvim_set_current_buf(buf)
            last_buf = buf
            last_win = win
            break
          end
        end
      end
    end)
    return
  end

  -- No terminal currently visible, check for an inactive session.
  local inactive = get_last_inactive_terminal_session()
  if inactive and vim.api.nvim_buf_is_valid(inactive.buf) then
    vim.cmd("botright split")
    vim.cmd("resize 20")
    vim.api.nvim_set_current_buf(inactive.buf)
    inactive.win = vim.api.nvim_get_current_win()
    return
  end

  -- No inactive session available, create a new terminal.
  open_new_terminal()
end

```

`新增快捷鍵`
```bash
mkdir ~/.config/nvim/lua/config/keybindings.lua
```

```lua
-- ~/.config/nvim/lua/config/keybindings.lua
local terminal = require('utility.terminal')

map("n", "t", terminal.open_terminal)
```

`修改 init.lua 檔案`
```lua
-- ~/.config/nvim/lua/init.lua
load_files('config', {
  'options',
  'keybindings', -- 新增這一行
})
```

好了!現在按空白鍵 + t 應該就可以呼叫終端機出現，來試試看吧😆

---

{{< post_footer >}}
