import styles from "./Text.module.css";
import cx from "classnames";
import { useMemo } from "react";

export interface TextProps {
	variant?:
		| "body"
		| "link"
		| "heading-1"
		| "heading-2"
		| "heading-3"
		| "heading-4"
		| "heading-5"
		| "heading-6";
	color?: "neutral" | "link";
	className?: string;
	children?: string;
}

export function Text({
	variant = "body",
	color = "neutral",
	className,
	children,
}: TextProps) {
	const styleClass = useMemo(() => {
		switch (color) {
			case "link":
				return styles.linkColor;
			default:
				return styles.neutralColor;
		}
	}, [color]);

	const variantClass = useMemo(() => {
		switch (color) {
			case "link":
				return styles.linkVariant;
			default:
				return undefined;
		}
	}, [color]);

	const fullClassName = cx(styleClass, variantClass, className);

	switch (variant) {
		case "link":
			return <a className={fullClassName}>{children}</a>;
		case "heading-1":
			return <h1 className={fullClassName}>{children}</h1>;
		case "heading-2":
			return <h2 className={fullClassName}>{children}</h2>;
		case "heading-3":
			return <h3 className={fullClassName}>{children}</h3>;
		case "heading-4":
			return <h4 className={fullClassName}>{children}</h4>;
		case "heading-5":
			return <h5 className={fullClassName}>{children}</h5>;
		case "heading-6":
			return <h6 className={fullClassName}>{children}</h6>;
		default:
			return <span className={fullClassName}>{children}</span>;
	}
}
