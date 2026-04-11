import styles from "./Background.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface BackgroundProps {
	className?: string;
	children?: ReactNode;
}

export function Background({ className, children }: BackgroundProps) {
	return <div className={cx(className, styles.background)}>{children}</div>;
}
