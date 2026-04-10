import { Text } from "./Text";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Text,
	args: {
		children: "Text",
	},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Heading1: Story = {
	args: {
		variant: "heading-1",
	},
};

export const Heading2: Story = {
	args: {
		variant: "heading-2",
	},
};

export const Heading3: Story = {
	args: {
		variant: "heading-3",
	},
};

export const Heading4: Story = {
	args: {
		variant: "heading-4",
	},
};

export const Heading5: Story = {
	args: {
		variant: "heading-5",
	},
};

export const Heading6: Story = {
	args: {
		variant: "heading-6",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		color: "link",
	},
};
