import styles from "./HStack.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface HStackProps {
	align?: "center" | "top" | "bottom";
	gap?: number;
	className?: string;
	children?: ReactNode;
}

export function HStack({ align, gap = 0, className, children }: HStackProps) {
	const alignItems =
		align === "top" ? "start" : align === "bottom" ? "end" : "center";

	return (
		<div
			style={{
				gap: `calc(2em * ${gap.toString()})`,
				alignItems,
			}}
			className={cx(styles.container, className)}
		>
			{children}
		</div>
	);
}
