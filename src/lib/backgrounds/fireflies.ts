import { curlVector } from "#lib/noise.ts";
import type { Background } from ".";

export class Fireflies implements Background {
	static readonly curlDim = 250;

	static readonly forceOut = [0, 0];
	static readonly force = Fireflies.curlDim * 5;
	static readonly friction = 0.88;
	static readonly injectedForce = Fireflies.curlDim / 10;

	static readonly trailCount = 20;
	static readonly trailLength = 30 * 4;
	static readonly trails = Array.from(
		{
			length: Fireflies.trailCount * Fireflies.trailLength,
		},
		(_, i) =>
			i % Fireflies.trailLength <= 1 ? Math.random() * Fireflies.curlDim : 0,
	);

	static trailsReady = 4;
	static trailShift = 0;
	static offset = 0;

	simulate(s: number) {
		const shift = Fireflies.trailShift;
		Fireflies.trailShift = (shift + 4) % Fireflies.trailLength;

		if (Fireflies.trailsReady < Fireflies.trailCount)
			Fireflies.trailsReady += 4;

		for (
			let k = 0;
			k < Fireflies.trailCount * Fireflies.trailLength;
			k += Fireflies.trailLength
		) {
			const i = k + shift;
			const j = k + Fireflies.trailShift;

			const t = Fireflies.trails;
			const fo = Fireflies.forceOut;
			const f = Fireflies.force;
			const u = Fireflies.friction;
			const d = Fireflies.curlDim;

			curlVector(t[i], t[i + 1], s * 0.2, fo);

			t[j + 2] = (t[i + 2] + fo[0] * s * f) * u;
			t[j + 3] = (t[i + 3] + fo[1] * s * f) * u;
			t[j + 2] += (Math.random() - 0.5) * Fireflies.injectedForce * s;
			t[j + 3] += (Math.random() - 0.5) * Fireflies.injectedForce * s;
			t[j + 0] = (((t[i + 0] + t[j + 2] * s) % d) + d) % d;
			t[j + 1] = (((t[i + 1] + t[j + 3] * s) % d) + d) % d;
		}

		Fireflies.offset += s * 20;
	}

	draw2d(ctx: CanvasRenderingContext2D, width: number, height: number) {
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "#5f8f7d";
		ctx.fillRect(0, 0, width, height);

		const offset = Fireflies.offset % (height * 2);
		const gradient = ctx.createLinearGradient(0, offset - height, 10, offset);
		gradient.addColorStop(0.4, "rgb(0 0 0 / 50%)");
		gradient.addColorStop(0.5, "rgb(0 0 0 / 40%)");
		gradient.addColorStop(0.6, "rgb(0 0 0 / 50%)");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, height);

		ctx.globalCompositeOperation = "lighter";
		ctx.shadowBlur = 12;
		ctx.shadowColor = "#099673";
		ctx.lineWidth = 2.5;

		const shift = Fireflies.trailShift;
		const l = Fireflies.trailLength;
		const d = Fireflies.curlDim;

		for (let i = 0; i < Fireflies.trailCount * l; i += l) {
			let x0 = (Fireflies.trails[i + shift + 0] / d) * width;
			let y0 = (Fireflies.trails[i + shift + 1] / d) * height;

			for (let j = 4; j < Fireflies.trailsReady; j += 4) {
				const x1 =
					(Fireflies.trails[i + ((shift + l - j) % l) + 0] / d) * width;
				const y1 =
					(Fireflies.trails[i + ((shift + l - j) % l) + 1] / d) * height;

				const dx = Math.abs(x1 - x0);
				const dy = Math.abs(y1 - y0);

				if (dx < width * 0.5 && dy < height * 0.5) {
					const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
					gradient.addColorStop(0, "#3f3f8d");
					gradient.addColorStop(0.5, "#099673");
					gradient.addColorStop(1, "#3f3f8d");

					ctx.beginPath();
					ctx.moveTo(x0, y0);
					ctx.strokeStyle = gradient;
					ctx.lineTo(x1, y1);
					ctx.stroke();
				}

				x0 = x1;
				y0 = y1;
			}
		}
	}

	drawWebgl2(): void {}
}
