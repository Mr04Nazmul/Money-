import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Asset = { symbol: string; name: string; amount: string; network: string; mark: string };

const assets: Asset[] = [
  { symbol: "ETH", name: "Ethereum", amount: "0.00 ETH", network: "Ethereum", mark: "◆" },
  { symbol: "MATIC", name: "Polygon", amount: "0.00 POL", network: "Polygon", mark: "⬡" },
  { symbol: "SOL", name: "Solana", amount: "0.00 SOL", network: "Solana", mark: "◎" },
  { symbol: "TRX", name: "TRON", amount: "0.00 TRX", network: "TRON", mark: "△" },
  { symbol: "BTC", name: "Bitcoin", amount: "0.00 BTC", network: "Bitcoin", mark: "₿" },
];

const networks = ["All", "Ethereum", "Polygon", "Solana", "TRON", "Bitcoin"];

export default function App() {
  const [tab, setTab] = useState("Wallet");
  const [network, setNetwork] = useState("All");
  const [notice, setNotice] = useState("");
  const visibleAssets = useMemo(
    () => network === "All" ? assets : assets.filter((asset) => asset.network === network),
    [network]
  );

  const action = (name: string) => {
    setNotice(name + " is a preview only. Real wallet addresses and blockchain transactions are not enabled yet.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#07110D" />
      <View style={styles.header}>
        <View style={styles.brandMark}><Text style={styles.brandMarkText}>M</Text></View>
        <View style={styles.brandTextWrap}>
          <Text style={styles.brand}>MONEY</Text>
          <Text style={styles.brandSub}>SELF-CUSTODY WALLET</Text>
        </View>
        <TouchableOpacity style={styles.profile} onPress={() => setTab("Security")} accessibilityLabel="Open security">
          <Text style={styles.profileText}>•••</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.eyebrowRow}>
          <Text style={styles.eyebrow}>TOTAL PORTFOLIO</Text>
          <View style={styles.previewPill}><Text style={styles.previewPillText}>PREVIEW</Text></View>
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>$0.00</Text>
          <Text style={styles.balanceCurrency}>USD</Text>
        </View>
        <Text style={styles.balanceCaption}>Your multi-chain overview</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryAction} onPress={() => action("Receive")}><Text style={styles.primaryActionIcon}>↓</Text><Text style={styles.primaryActionText}>Receive</Text></TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction} onPress={() => action("Send")}><Text style={styles.secondaryActionIcon}>↑</Text><Text style={styles.secondaryActionText}>Send</Text></TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction} onPress={() => action("Swap")}><Text style={styles.secondaryActionIcon}>⇄</Text><Text style={styles.secondaryActionText}>Swap</Text></TouchableOpacity>
        </View>

        {notice ? (
          <TouchableOpacity style={styles.notice} onPress={() => setNotice("")}>
            <Text style={styles.noticeTitle}>Preview mode</Text>
            <Text style={styles.noticeBody}>{notice}</Text>
            <Text style={styles.noticeDismiss}>Tap to dismiss</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your assets</Text>
          <Text style={styles.assetCount}>{visibleAssets.length} ASSETS</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.networks}>
          {networks.map((item) => (
            <TouchableOpacity key={item} onPress={() => setNetwork(item)} style={[styles.networkChip, network === item && styles.networkChipActive]}>
              <Text style={[styles.networkText, network === item && styles.networkTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.assetCard}>
          {visibleAssets.map((asset, index) => (
            <View key={asset.symbol} style={[styles.assetRow, index !== visibleAssets.length - 1 && styles.assetDivider]}>
              <View style={styles.coinIcon}><Text style={styles.coinMark}>{asset.mark}</Text></View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetSymbol}>{asset.symbol} · {asset.network}</Text>
              </View>
              <View style={styles.assetAmountWrap}>
                <Text style={styles.assetAmount}>{asset.amount}</Text>
                <Text style={styles.assetValue}>$0.00</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}><Text style={styles.securityIconText}>✓</Text></View>
          <View style={styles.securityCopy}>
            <Text style={styles.securityTitle}>Your keys, your control</Text>
            <Text style={styles.securityBody}>Security design comes first. This preview does not create or store private keys.</Text>
          </View>
        </View>
        <Text style={styles.disclaimer}>DEMO UI · NO REAL FUNDS · NO BLOCKCHAIN CONNECTION</Text>
      </ScrollView>

      <View style={styles.tabBar}>
        {[
          { label: "Wallet", icon: "◈" },
          { label: "Activity", icon: "↻" },
          { label: "Security", icon: "⌑" },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.tabItem} onPress={() => setTab(item.label)}>
            <Text style={[styles.tabIcon, tab === item.label && styles.tabActive]}>{item.icon}</Text>
            <Text style={[styles.tabLabel, tab === item.label && styles.tabActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {tab !== "Wallet" ? (
        <View style={styles.tabOverlay}>
          <Text style={styles.overlayTitle}>{tab}</Text>
          <Text style={styles.overlayBody}>{tab === "Activity" ? "Transaction history will appear here after blockchain read-only integration." : "Security settings will be added after the key-management design is reviewed."}</Text>
          <TouchableOpacity onPress={() => setTab("Wallet")} style={styles.overlayButton}><Text style={styles.overlayButtonText}>Back to wallet</Text></TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#07110D" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 22, paddingTop: 12, paddingBottom: 18 },
  brandMark: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#B9F66B", alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: "#10200F", fontWeight: "900", fontSize: 24 },
  brandTextWrap: { marginLeft: 12, flex: 1 },
  brand: { color: "#F2F7F1", fontWeight: "900", fontSize: 18, letterSpacing: 3 },
  brandSub: { color: "#819288", fontSize: 9, letterSpacing: 1.5, marginTop: 3 },
  profile: { width: 38, height: 38, borderRadius: 13, borderWidth: 1, borderColor: "#273B30", alignItems: "center", justifyContent: "center" },
  profileText: { color: "#C7D7CD", fontSize: 15, letterSpacing: 2 },
  content: { paddingHorizontal: 22, paddingBottom: 30 },
  eyebrowRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  eyebrow: { color: "#9AAC9F", fontSize: 10, letterSpacing: 2, fontWeight: "700" },
  previewPill: { marginLeft: 10, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 4, backgroundColor: "#1B3225" },
  previewPillText: { color: "#B9F66B", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  balanceRow: { flexDirection: "row", alignItems: "flex-end", marginTop: 10 },
  balance: { color: "#F5FAF5", fontSize: 43, fontWeight: "800", letterSpacing: -1.5 },
  balanceCurrency: { color: "#91A498", fontSize: 12, marginLeft: 9, marginBottom: 9, fontWeight: "700" },
  balanceCaption: { color: "#82958A", fontSize: 12, marginTop: 4 },
  actions: { flexDirection: "row", marginTop: 24, gap: 10 },
  primaryAction: { flex: 1, minHeight: 72, backgroundColor: "#B9F66B", borderRadius: 18, alignItems: "center", justifyContent: "center" },
  primaryActionIcon: { color: "#11200F", fontSize: 20, fontWeight: "800" },
  primaryActionText: { color: "#11200F", fontSize: 12, fontWeight: "800", marginTop: 5 },
  secondaryAction: { flex: 1, minHeight: 72, backgroundColor: "#132219", borderColor: "#253A2D", borderWidth: 1, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  secondaryActionIcon: { color: "#C6F3A0", fontSize: 20, fontWeight: "700" },
  secondaryActionText: { color: "#E5EEE7", fontSize: 12, fontWeight: "700", marginTop: 5 },
  notice: { marginTop: 16, backgroundColor: "#302718", borderColor: "#6E552C", borderWidth: 1, borderRadius: 15, padding: 14 },
  noticeTitle: { color: "#F5D58A", fontWeight: "800", fontSize: 13 },
  noticeBody: { color: "#E9D9B5", fontSize: 12, lineHeight: 18, marginTop: 5 },
  noticeDismiss: { color: "#B8A57D", fontSize: 10, marginTop: 8 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30, marginBottom: 14 },
  sectionTitle: { color: "#F1F7F1", fontSize: 19, fontWeight: "800" },
  assetCount: { color: "#8CA194", fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  networks: { gap: 8, paddingBottom: 15 },
  networkChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: "#26392E", backgroundColor: "#0D1A12" },
  networkChipActive: { backgroundColor: "#B9F66B", borderColor: "#B9F66B" },
  networkText: { color: "#9DB0A3", fontSize: 11, fontWeight: "700" },
  networkTextActive: { color: "#142310" },
  assetCard: { backgroundColor: "#0D1912", borderColor: "#1E3025", borderWidth: 1, borderRadius: 20, paddingHorizontal: 14 },
  assetRow: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  assetDivider: { borderBottomWidth: 1, borderBottomColor: "#1C2B21" },
  coinIcon: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#1A2B20", alignItems: "center", justifyContent: "center" },
  coinMark: { color: "#C7F69A", fontSize: 19, fontWeight: "800" },
  assetInfo: { flex: 1, marginLeft: 12 },
  assetName: { color: "#EDF5EE", fontSize: 13, fontWeight: "800" },
  assetSymbol: { color: "#81958A", fontSize: 10, marginTop: 5 },
  assetAmountWrap: { alignItems: "flex-end", marginLeft: 8 },
  assetAmount: { color: "#E7F0E8", fontSize: 11, fontWeight: "700" },
  assetValue: { color: "#83968A", fontSize: 10, marginTop: 5 },
  securityCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#0E1B13", borderWidth: 1, borderColor: "#253B2C", borderRadius: 18, padding: 15, marginTop: 18 },
  securityIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#1D3825", alignItems: "center", justifyContent: "center" },
  securityIconText: { color: "#B9F66B", fontWeight: "900", fontSize: 17 },
  securityCopy: { flex: 1, marginLeft: 12 },
  securityTitle: { color: "#EAF3EB", fontSize: 12, fontWeight: "800" },
  securityBody: { color: "#8EA194", fontSize: 10, lineHeight: 15, marginTop: 4 },
  disclaimer: { color: "#64796B", fontSize: 8, letterSpacing: 1, textAlign: "center", marginTop: 22, marginBottom: 8 },
  tabBar: { flexDirection: "row", backgroundColor: "#0B1710", borderTopColor: "#203227", borderTopWidth: 1, paddingTop: 11, paddingBottom: 17, paddingHorizontal: 22 },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  tabIcon: { color: "#7D9184", fontSize: 20 },
  tabLabel: { color: "#7D9184", fontSize: 10, fontWeight: "700" },
  tabActive: { color: "#B9F66B" },
  tabOverlay: { position: "absolute", left: 20, right: 20, top: "32%", backgroundColor: "#122018", borderColor: "#36513D", borderWidth: 1, borderRadius: 22, padding: 22, shadowColor: "#000", shadowOpacity: 0.4, shadowRadius: 20, elevation: 15 },
  overlayTitle: { color: "#F1F7F1", fontSize: 22, fontWeight: "800" },
  overlayBody: { color: "#9FB0A4", fontSize: 13, lineHeight: 20, marginTop: 10 },
  overlayButton: { backgroundColor: "#B9F66B", borderRadius: 12, padding: 13, alignItems: "center", marginTop: 20 },
  overlayButtonText: { color: "#142310", fontSize: 12, fontWeight: "900" }
});