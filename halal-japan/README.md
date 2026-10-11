# Japan Halal Money — separate Android app

Native Expo app copied from Mr04Nazmul/Halal-japan. The original repository is unchanged.

## Install

Open the Money Halal APK build and install test workflow in GitHub Actions. After success, download money-halal-checker-adfree-release-apk (or ads), extract the ZIP, and install app-release.apk. Do not install the ZIP itself.

The new package IDs are com.nazmul.money.halalchecker and com.nazmul.money.halalchecker.ads. These install alongside the original app and do not migrate its data. Separate package IDs avoid update signing/version conflicts with the original; they do not resolve every possible device installation failure.

The workflow verifies signatures and ARM/x86 native libraries, then installs, reinstalls and launches on API 24, 28, 35 and 36 x86_64 emulators. Real phone scanning and installation still require device testing. If installation fails, record the phone model, Android version and exact installer error (or adb install output).

Expo-generated default signing is retained for this test build; use a private stable production keystore before distribution. Ads use Google test IDs only. Ingredient flags are guidance, not halal certification.

## Develop

cd halal-japan/android-app
npm install
npx expo start

Increment android.versionCode for future updates. The existing product backend is reused; availability of upstream sources is unchanged.

## Android compatibility

Minimum Android 7.0 (API 24), enforced in native build configuration and checked in the APK manifest. The universal APK includes 32-bit ARM (armeabi-v7a), 64-bit ARM (arm64-v8a) and x86_64. Android 6 and older and x86-only devices are not supported. Tests cover Android 7, 9, 15 and 16 emulator installation and launch; physical ARM-device camera/OCR testing is still required. New Android versions are not automatically guaranteed.
