import { VStack, type VStackProps } from "./VStack";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: VStack,
	render: (args: VStackProps) => {
		return (
			<div
				style={{
					width: "12em",
					height: "24em",
					backgroundColor: "gray",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<VStack {...args}>
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
				</VStack>
			</div>
		);
	},
} satisfies Meta<typeof VStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Left: Story = {
	args: {
		align: "left",
	},
};

export const Right: Story = {
	args: {
		align: "right",
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
