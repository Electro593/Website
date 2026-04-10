import { Link } from "./Link";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta = {
	component: Link,
	args: {
		children: (
			<div style={{ width: "8em", backgroundColor: "green" }}>Link Content</div>
		),
	},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const WithHref: Story = {
	args: {
		href: "https://example.com",
		target: "_blank",
	},
};

export const WithClickHandler: Story = {
	args: {
		onClick: fn(),
	},
};
