import styles from "./Spacer.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface SpacerProps {
	className?: string;
	children?: ReactNode;
}

export function Spacer({ className, children }: SpacerProps) {
	return <div className={cx(styles.spacer, className)}>{children}</div>;
}
