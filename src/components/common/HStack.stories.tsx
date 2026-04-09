import { HStack, type HStackProps } from "./HStack";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: HStack,
	render: (args: HStackProps) => {
		return (
			<div
				style={{
					width: "64em",
					height: "4em",
					backgroundColor: "gray",
					display: "flex",
				}}
			>
				<HStack {...args}>
					<div style={{ width: "8em", height: "4em", backgroundColor: "red" }}>
						Div 1
					</div>
					<div
						style={{ width: "10em", height: "2em", backgroundColor: "blue" }}
					>
						Div 2
					</div>
					<div
						style={{ width: "12em", height: "3em", backgroundColor: "green" }}
					>
						Div 3
					</div>
				</HStack>
			</div>
		);
	},
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Top: Story = {
	args: {
		align: "top",
	},
};

export const Bottom: Story = {
	args: {
		align: "bottom",
	},
};

export const MediumGap: Story = {
	args: {
		gap: 2,
	},
};

export const LargeGap: Story = {
	args: {
		gap: 8,
	},
};
