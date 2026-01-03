# Lilka BLE Controller

Multi-mode Bluetooth HID Controller for Lilka v2.

**Modes: Gamepad • Mouse • Keyboard**

## 🇺🇦 Українська

### Можливості

- **Режим геймпаду**: D-pad + 6 кнопок, працює з іграми та емуляторами
- **Режим миші**: D-pad рухає курсор, A/B для кліків, C/D для прокрутки, Start для середнього кліку
- **Режим клавіатури**: Екранна клавіатура з 5 рядками та спеціальними клавішами
- **Перемикання мови**: Натисніть SELECT в режимі клавіатури (WIN+SPACE)
- **Рівень батареї**: Відображається на екрані та передається через BLE

### Керування

| Кнопка | Геймпад | Миша | Клавіатура |
|--------|---------|------|------------|
| D-pad | Осі | Рух курсора | Навігація |
| A | Кнопка 1 | Лівий клік | Ввести символ |
| B | Кнопка 2 | Правий клік | Backspace |
| C | Кнопка 3 | Прокрутка вгору | Змінити шар (abc/ABC/!@#) |
| D | Кнопка 4 | Прокрутка вниз | Пробіл |
| Start | Кнопка 5 | Середній клік | Enter |
| Select | Кнопка 6 | - | Змінити мову (WIN+Space) |

**Утримуйте START + SELECT 3 секунди для зміни режиму**

## 🇬🇧 English

### Features

- **Gamepad Mode**: D-pad + 6 buttons, works with games and emulators
- **Mouse Mode**: D-pad moves cursor, A/B for clicks, C/D for scroll, Start for middle click
- **Keyboard Mode**: On-screen keyboard with 5 rows including special keys
- **Language Switch**: Press SELECT in keyboard mode to switch language (WIN+SPACE)
- **Battery Level**: Displayed on screen and reported via BLE

### Controls

| Button | Gamepad | Mouse | Keyboard |
|--------|---------|-------|----------|
| D-pad | Axes | Move cursor | Navigate keys |
| A | Button 1 | Left click | Type character |
| B | Button 2 | Right click | Backspace |
| C | Button 3 | Scroll up | Toggle layer (abc/ABC/!@#) |
| D | Button 4 | Scroll down | Space |
| Start | Button 5 | Middle click | Enter |
| Select | Button 6 | - | Switch language (WIN+Space) |

**Hold START + SELECT for 3 seconds to switch mode**

## Як прошити / How to Flash

### Варіант 1: Прошити з релізу / Option 1: Flash from release

1. Завантажте прошивку з [Releases](https://github.com/lilka-dev/BLE_Controller/releases)
2. Відкрийте [ESPTool Web Flasher](https://espressif.github.io/esptool-js/) (тільки Chrome/Chromium)
3. Підключіть Лілку через USB
4. Натисніть "Erase Flash", потім "Program"
5. Виберіть файл та адресу `0x0`

### Варіант 2: Зібрати з вихідного коду / Option 2: Build from source

```bash
git clone https://github.com/lilka-dev/BLE_Controller.git
cd BLE_Controller
pio run -e uk -t upload  # Українська версія
# або / or
pio run -e en -t upload  # English version
```

## Автори

- [@black-ghost-off](https://github.com/black-ghost-off)


## License

MIT License
