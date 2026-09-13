# NexChain 🛡️⚡

> **Blockchain Intelligence for a Safer Tomorrow**  
> Next-generation forensic intelligence, transaction tracing, and criminal cluster analysis mobile application.

---

## ✨ Features & Highlights

- **12 High-Fidelity Mobile Screens**:
  1. **Splash / Welcome**: Full-screen ambient pinkish-cyan glow with floating minimalist 3D golden Bitcoin centerpiece.
  2. **Home Dashboard**: Live metrics, recent investigations list, and continuous curved squircle widgets.
  3. **Investigate Anything**: Multi-input wallet, TxID, IP address & QR scanner with laser feedback.
  4. **Forensics Pipeline**: 8-stage interactive evidence analysis pipeline.
  5. **Investigation Result**: Risk scoring gauge, flagged reasons, and interactive actions.
  6. **Risk Factor Analysis**: Detailed risk factor metrics & threat breakdown.
  7. **Transaction Details**: In-depth blockchain transaction telemetry.
  8. **Transaction Flow**: Visual hop-by-hop money flow diagram.
  9. **Address Details**: Comprehensive address dossier, balance, and volume.
  10. **Detected Patterns**: Peeling chains, wash-trading, and burst activity detection.
  11. **Network Graph**: Interactive visual node topology and cluster inspector.
  12. **AI Investigator**: Autonomous AI forensic copilot assistant with investigative chat.

- **Dual Mode Studio Workbench**:
  - Interactive **Single Device Simulator** with Dynamic Island.
  - **All 12 Screens Side-by-Side Gallery Showcase**.

- **Native Android Support**:
  - Full Capacitor v7 native Android wrapper.
  - Custom multi-density Adaptive App Icons (`mipmap-mdpi` through `mipmap-xxxhdpi`) matching the glowing golden Bitcoin aesthetic.
  - Pre-built, signed **Release APK** ready for instant installation.

---

## 📱 Download Android APK

The pre-compiled Android release package is included directly in this repository:

- 📦 **Download**: [`release/NexChain-release.apk`](./release/NexChain-release.apk) (5.9 MB)

---

## 🚀 Quick Start (Web Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🤖 Android Build

```bash
# Sync web build with native Android
npm run build
npx cap sync android

# Build Release APK via Gradle
cd android
./gradlew assembleRelease
```

---

## 🎨 Tech Stack

- **Frontend**: React, Lucide Icons, Vite
- **Styling**: Vanilla CSS (Custom design system, glassmorphism, dynamic glow effects)
- **Mobile Runtime**: Capacitor v7 Android Native Bridge
- **Java / Android**: Microsoft OpenJDK 17, Android SDK 34

