import { Background } from "./Background";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Background,
	args: {
		children: "Content",
	},
} satisfies Meta<typeof Background>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
