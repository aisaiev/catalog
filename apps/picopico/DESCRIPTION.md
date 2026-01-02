# PicoPico для Лілки

Це - порт проєкту PicoPico для Лілки на ESP32-S3. PicoPico - це плеєр для ігор у форматі Pico-8.

> **Pico-8** є власністю **Lexaloffle Games**. Цей проєкт є неофіційним плеєром і не пов'язаний з Lexaloffle.

## Особливості

- Відтворення ігор у форматі Pico-8 (.p8)
- Підтримка графіки, звуку та керування
- Оптимізовано для ESP32-S3 з PSRAM
- Підтримка SFX через I2S

## Керування

- D-Pad: Рух (вліво, вправо, вгору, вниз)
- Кнопка A: PICO-8 O/Z
- Кнопка B: PICO-8 X
- Start: Меню
- Select: Пауза

## Збірка

Для збірки потрібен PlatformIO CLI або VS Code з розширенням PlatformIO.

```bash
cd lilka
pio run
pio run --target upload
```

## Автори

- [@black-ghost-off](https://github.com/black-ghost-off)
- Оригінальний проєкт: [@DavidVentura](https://github.com/DavidVentura)
