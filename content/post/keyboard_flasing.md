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

3. 用 qmk flash 指令燒錄

*   將做好鍵盤的主控板 ProMicro 連結電腦。還記得我前面因為其中一個 ProMicro 的 micro USB 連接器，而必須將鍵位設計為鏡像嗎。如果你沒有發生像我一樣的悲劇，就把左手邊的 ProMicro 連結電腦就可以了

```bash
cd ~/qmk_firmware && qmk flash -kb bluebell/swoop -km default
```

*   看到 Waiting for USB serial port 後，ProMicro 的兩個接腳短按 (紅框處)，目的是要讓板子進入 bootloader 燒錄模式


![keyboard-flasing](/images/keyboard-flasing-0.png "70%")


*   一切正常的話，就會看到下面的 log，這時候就已經燒錄完畢了！
```bash
  Ψ Compiling keymap with gmake -r -R -f builddefs/build_keyboard.mk flash KEYBOARD=bluebell/swoop KEYMAP=default KEYBOARD_FILESAFE=bluebell_swoop TARGET=bluebell_swoop_default VERBOSE=false COLOR=true SILENT=false QMK_BIN="qmk"

  avr-gcc (Homebrew AVR GCC 8.5.0_3) 8.5.0
  Copyright (C) 2018 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

  Size before:
     text    data     bss     dec     hex filename
        0   21200       0   21200    52d0 bluebell_swoop_default.hex

  Copying bluebell_swoop_default.hex to qmk_firmware folder                                           [OK]
  Checking file size of bluebell_swoop_default.hex                                                    [O
  - The firmware size is fine - 21200/28672 (73%, 7472 bytes free)
    Flashing for bootloader
    Waiting for USB serial port - reset your controller now (Ctrl+C to
  cancel)..........
    Device /dev/tty.usbmodem1101 has appeared; assuming it is the controller.
    Waiting for /dev/tty.usble.
    Reading 21200 bytes for flash from input file bluebell_swoop_default.hex
    Writing 21200 bytes to
    Writing | ################################################## | 100% 1.56 s
    Reading | ######################## | 100% 0.15 s
    21200 bytes of flash verified

  Avrdude done.  Thank you.
```
---
