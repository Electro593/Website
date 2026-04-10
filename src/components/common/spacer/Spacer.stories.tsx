import { HStack } from "../hstack/HStack";
import { Spacer, type SpacerProps } from "./Spacer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Spacer,
	render: (args: SpacerProps) => {
		return (
			<div
				style={{
					width: "64em",
					height: "4em",
					backgroundColor: "gray",
				}}
			>
				<HStack>
					<div style={{ width: "8em", height: "4em", backgroundColor: "red" }}>
						Div 1
					</div>
					<Spacer {...args} />
					<div
						style={{ width: "12em", height: "3em", backgroundColor: "green" }}
					>
						Div 3
					</div>
				</HStack>
			</div>
		);
	},
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const WithContent: Story = {
	args: {
		children: (
			<div style={{ height: "2em", backgroundColor: "blue" }}>Content</div>
		),
	},
};
