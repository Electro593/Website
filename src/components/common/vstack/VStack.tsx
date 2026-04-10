import styles from "./VStack.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface VStackProps {
	align?: "center" | "left" | "right";
	gap?: number;
	className?: string;
	children?: ReactNode;
}

export function VStack({ align, gap = 0, className, children }: VStackProps) {
	const alignItems =
		align === "left" ? "start" : align === "right" ? "end" : "center";

	return (
		<div
			style={{
				gap: `calc(0.5em * ${gap.toString()})`,
				alignItems,
			}}
			className={cx(styles.container, className)}
		>
			{children}
		</div>
	);
}
