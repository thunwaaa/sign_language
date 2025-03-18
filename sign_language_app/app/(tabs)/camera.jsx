import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Camera Page</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        paddingTop: 80,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
