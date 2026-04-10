import styles from "./Link.module.css";
import cx from "classnames";
import type { ReactNode } from "react";

export interface LinkProps {
	href?: string;
	target?: "_self" | "_blank";
	className?: string;
	children: ReactNode;
	onClick?: () => void;
}

export function Link({
	href,
	target,
	className,
	children,
	onClick,
}: LinkProps) {
	return (
		<a
			href={href}
			target={target}
			className={cx(styles.link, className)}
			onClick={onClick}
		>
			{children}
		</a>
	);
}
