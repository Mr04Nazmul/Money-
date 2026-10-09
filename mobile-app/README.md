# Money Wallet — Mobile App

A separate Expo / React Native project for Android and iOS. The existing GitHub Pages website and Supabase project are intentionally untouched.

## Current status
- Native wallet UI preview only.
- No real wallet keys, recovery phrases, balances, deposits, or blockchain transactions are implemented.
- No Supabase credentials are included.
- Never store private keys or recovery phrases in Supabase, app logs, source control, or plain AsyncStorage.

## Prerequisites
Install Node.js LTS and npm on a computer, then from this folder:

```bash
npm install
npx expo start
```

Use Expo Go for a UI preview where supported, or configure a development build for native modules.

## Build for stores
After testing and security review, configure Expo Application Services (EAS), signing credentials, store listing details, privacy policy, and developer accounts. See https://docs.expo.dev/build/setup/ and https://docs.expo.dev/submit/ .

Store acceptance is not guaranteed. Cryptocurrency wallet distribution may require an eligible organization account and compliance with store policies.

## Planned phases
1. Native UI and navigation preview.
2. Security design and threat model.
3. Carefully reviewed client-side key management and recovery.
4. Read-only multi-chain network adapters and testnet QA.
5. Independent security review and store-readiness checks.
