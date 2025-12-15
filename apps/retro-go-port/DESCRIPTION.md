# Retro-Go Port (C/C++)
Retro-Go порт - прошивка для запуску ретро-ігор на ESP32 адапртована під Лілку.

Retro-Go port -  firmware to play retro games on ESP32 adapted for Lilka.

## Підтримувані системи
- Nintendo: NES, SNES (slow), Gameboy, Gameboy Color, Game & Watch
- Sega: SG-1000, Master System, Mega Drive / Genesis, Game Gear
- Coleco: Colecovision
- NEC: PC Engine
- Atari: Lynx
- Others: DOOM (including mods!)

## Встановлення
1. Завантажте файл прошивки `retro-go_*.img`.
2. Підключіть пристрій до комп'ютера за допомогою USB-кабелю.
3. Прошийте образ за допомогою esptool:
    - [Командний рядок](https://github.com/espressif/esptool/releases/): запустіть `esptool.py write_flash --flash_size detect 0x0 retro-go_*.img`
    - [Веб-версія](https://espressif.github.io/esptool-js/): підключіть пристрій, натисніть «Erase Flash» (Стерти флеш-пам'ять), виберіть файл .img і встановіть адресу 0x0, а потім натисніть «Program» (Програмувати).

## Керування
| Lilka             | Retro-Go      |
| ----------------- | ------------- |
| LILKA_GPIO_UP     | UP            |
| LILKA_GPIO_DOWN   | DOWN          |
| LILKA_GPIO_LEFT   | LEFT          |
| LILKA_GPIO_RIGHT  | RIGHT         |
| LILKA_GPIO_START  | START         |
| LILKA_GPIO_C      | OPTION        |
| LILKA_GPIO_D      | MENU          |
| LILKA_GPIO_A      | KEY_A         |
| LILKA_GPIO_B      | KEY_B         |
| LILKA_GPIO_SELECT | KEY_SELECT    |

*Деякі емулятори потребують більше кнопок ніж має Лілка, в таких випадках можна використовувати комбінації, retro-go дає можливіть обрати кілька варіантів комбінацій, їх можна знайти в `Options -> Emulator options -> Controls`*

## Додавання ігор
Всі ігри потрібно поміщати у відповідну підтеку директорії `rooms/` в кореневому каталозі microSD.
| Назва системи                                | Тека             | Підтримувані формати файлів | 
| -------------------------------------------- | ---------------- | --------------------------- |
| Nintendo Entertainment System                | nes              | nes fc fds nsf zip          |
| Super Nintendo Entertainment System          | snes             | smc sfc zip                 |
| Gameboy                                      | gb               | gb gbc zip                  |
| Gameboy Color                                | gbc              | gbc gb zip                  |
| Game & Watch                                 | gw               | gw                          |
| Sega Master System                           | sms              | sms sg zip                  |
| Sega Game Gear                               | gg               | gg zip                      |
| Sega Mega Drive \ Genesis                    | md               | md gen bin zip              |
| ColecoVision                                 | col              | col rom zip                 |
| NEC PC Engin                                 | pce              | pce zip                     |
| Atari Lynx                                   | lnx              | lnx zip                     |
| MSX                                          | msx              | rom mx1 mx2 dsk             |

## Додаткові файли

Пак обкладинок ігор та файли BIOS, які потребують деякі емулятори, можна завантажити за [посиланням](https://github.com/ab4o1on/retro-go/releases/download/1.4x-dev-lilka/sd-retro-go.zip).