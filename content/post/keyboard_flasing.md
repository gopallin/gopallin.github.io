+++
title = "[分離式鍵盤] 燒錄韌體"
date = 2026-08-12T23:12:02+08:00
author = "Gopal"
tags = ["keyboard"]
cover = ""
summary = "終於要讓鍵按下後有反應了🎉"
weight = 6
draft = false
+++

{{< keyboard_series >}}

---

1. 把 C 放進 qmk_firmware 的 keymaps 目錄

```bash
cp keymap.c ~/qmk_firmware/keyboards/bluebell/swoop/keymaps/default/keymap.c
```

2. 本地編譯 → 產出韌體檔（.hex）

```bash
qmk compile -kb bluebell/swoop -km default
```

就會產出檔案

/Users/gopal.lin/qmk_firmware/bluebell_swoop_default.hex

3. 用 [QMK Toolbox](https://qmk.fm/toolbox) 燒錄

*   將做好鍵盤的主控板 ProMicro 連結電腦。還記得我前面因為其中一個 ProMicro 的 micro USB 連接器，而必須將鍵位設計為鏡像嗎。如果你沒有發生像我一樣的悲劇，就把左手邊的 ProMicro 連結電腦就可以了

*   打開 QMK Toolbox

![keyboard-flasing](/images/keyboard-flasing-0.png "70%")

*   將 ProMicro 的兩個接腳短按 (紅框處)，目的是要讓板子進入 bootloader 燒錄模式

![keyboard-flasing](/images/keyboard-flasing-1.png "70%")

*   QMK ToolBox 頁面上按 Flash，並且等燒錄跑完就可以了~
---
