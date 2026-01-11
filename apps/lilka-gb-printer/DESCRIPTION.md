# Lilka Game Boy Printer

Game Boy Printer emulator for Lilka. Captures images from Game Boy Camera or other Game Boy Printer compatible games, displays them on the Lilka screen, saves to SD card, and provides a web interface for wireless image viewing.

## Features

### Direct Mode
- Captures Game Boy Printer data via link cable
- Real-time image display on Lilka screen
- Saves images to SD card in PNG format

### Web Mode
- Captures Game Boy Printer data via link cable
- Images viewing through web interface
- Direct image download from browser

## Requirements

- **Lilka v2**
- **Game Boy** (DMG, Pocket, Color, or Advance)
- **Game Boy Link Cable** (standard 6-pin)
- **Level Shifter** 5V → 3.3V (4-channel) - Required!
- **Micro SD card** (optional, for saving images)

## Wiring

Connect Game Boy Link Cable to Lilka extension port via level shifter:

```
Game Boy Pin       Level Shifter    Lilka ESP32
Pin 1 (VCC 5V)  -> HV  -> LV    -> 3.3V (Extension Port)
Pin 2 (SIN)     -> HV1 -> LV1   -> GPIO 21 (Extension Port)
Pin 3 (SCK)     -> HV3 -> LV3   -> GPIO 48 (Extension Port)
Pin 4 (SOUT)    -> HV2 -> LV2   -> GPIO 47 (Extension Port)
Pin 6 (GND)     -> GND -> GND   -> GND (Extension Port)
```

**Important:** Level shifter is required! Direct connection will damage the ESP32.

## Compatible Games

- **Game Boy Camera** - Take photos and print
- **Super Mario Bros. Deluxe** - Print high scores
- **Pokémon Gold/Silver/Crystal** - Print Pokédex and more
- Many other games with Game Boy Printer support