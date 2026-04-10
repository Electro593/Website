import styles from "./HStack.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface HStackProps {
	align?: "center" | "top" | "bottom";
	gap?: number;
	className?: string;
	children?: ReactNode;
}

export function HStack({ align, gap, className, children }: HStackProps) {
	const computedGap =
		gap == null ? undefined : `calc(0.5em * ${gap.toString()})`;
	const alignItems =
		align === "top" ? "start" : align === "bottom" ? "end" : "center";

	return (
		<div
			style={{
				gap: computedGap,
				alignItems,
			}}
			className={cx(styles.container, className)}
		>
			{children}
		</div>
	);
}
