# Lilka Desktop Monitor

Stream your computer screen to Lilka device over WiFi. This firmware enables real-time display streaming to Lilka's 1.69" TFT display and is designed to integrate seamlessly with KeiraOS.

## Prerequisites

- Lilka v2 with KeiraOS flashed
- WiFi configured in KeiraOS
- Both devices on the same WiFi network

### Step 1: Upload Firmware

**Run from KeiraOS**
1. Build the firmware using PlatformIO or download the prebuilt firmware from the releases.
1. Copy firmware file to SD card
2. In KeiraOS file manager, open the firmware .bin file
3. Device will reboot and load the firmware
4. It will automatically connect using Keira's saved WiFi credentials

### Step 2: Note the IP Address

After successful WiFi connection, the screen will show:
```
IP Address:
192.168.1.100
Waiting for connection...
```

Note this IP address for the next step.

### Step 3: Install Python Dependencies

Clone github repository, navigate to `transmitter` directory and run:

```bash
# Create virtual environment
python3 -m venv venv

# Install dependencies
venv/bin/pip install -r requirements.txt
```

**Note for macOS/Linux users with Homebrew Python**: If you get an "externally-managed-environment" error, use the virtual environment approach above.

### Step 4: Stream Your Screen!

```bash
# Basic usage
venv/bin/python transmitter.py --ip 192.168.1.100

# Or activate venv first
source venv/bin/activate
python transmitter.py --ip 192.168.1.100
```

Replace `192.168.1.100` with your device's IP address from Step 2.

That's it! Your screen should now be streaming to the Lilka display.