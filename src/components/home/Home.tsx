import { Background, Link, VStack } from "../common";
import styles from "./Home.module.css";

export function Home() {
	return (
		<Background className={styles.background}>
			<div className={styles.card}>
				<VStack align="left">
					<Link href="/singleplayer">Singleplayer</Link>
					<Link href="/multiplayer">Multiplayer</Link>
					<Link href="/options">Options</Link>
					<Link href="/credits">Credits</Link>
					<Link href="/changelog">Changelog</Link>
				</VStack>
			</div>
		</Background>
	);
}
