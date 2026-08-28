import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface props {
	children: ReactNode;
	scrollable?: boolean;
}

export default function Container({ children, scrollable = true }: props) {
	return (
		<SafeAreaView style={styles.container}>
			{scrollable ? (
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={true}
				>
					{children}
				</ScrollView>
			) : (
				<View style={styles.fixedContent}>{children}</View>
			)}
		</SafeAreaView>
	);
}
