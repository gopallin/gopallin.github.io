+++
title = "[分離式鍵盤] 燒錄韌體"
date = 2026-08-12T23:12:02+08:00
author = "Gopal"
tags = ["keyboard"]
cover = ""
summary = "終於要讓鍵按下後有反應了"
weight = 6
draft = true
+++

{{< keyboard_series >}}

---

1. 把 C 放進 qmk_firmware 的 keymaps 目錄

```bash
cp keymap.c ~/qmk_firmware/keyboards/bluebell/swoop/keymaps/default/keymap.c
```

2. 本地編譯 → 產出韌體檔（.hex/.uf2）

```bash
qmk compile -kb bluebell/swoop -km default
```

3. 用 QMK Toolbox 燒錄

claude --resume 05594700-efed-4ed1-b9dc-66e6abb126fd

---

