const SIMPLEX_F3 = 1 / 3;
const SIMPLEX_G3 = 1 / 6;

const SIMPLEX_GRADIENTS = [
	[1, 1, 0, 0],
	[-1, 1, 0, 0],
	[1, -1, 0, 0],
	[-1, -1, 0, 0],
	[1, 0, 1, 0],
	[-1, 0, 1, 0],
	[1, 0, -1, 0],
	[-1, 0 - 1, 0],
	[0, 1, 1, 0],
	[0, -1, 1, 0],
	[0, 1, -1, 0],
	[0, -1, -1, 0],
].flat();

const BASE_SIMPLEX_PERMUTATIONS = [
	151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
	36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
	75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
	149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
	27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
	92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
	209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
	164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
	147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
	28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
	155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
	178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
	191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
	181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
	138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
	61, 156, 180,
];

const SIMPLEX_P = Array.from(
	{ length: BASE_SIMPLEX_PERMUTATIONS.length * 2 },
	(_, i) => BASE_SIMPLEX_PERMUTATIONS[i & 255],
);

const SIMPLEX_PG = Array.from(
	{ length: SIMPLEX_P.length },
	(_, i) => (SIMPLEX_P[i] % 12) * 4,
);

const SIMPLEX_V = [
	[0, 0, 1, 0, 1, 1, 0, 0], // x < y, y < z, x < z
	[0, 0, 0, 0, 0, 0, 0, 0], // undefined
	[0, 1, 0, 0, 1, 1, 0, 0], // x < y, y > z, x < z
	[0, 1, 0, 1, 1, 0, 0, 0], // x < y, y > z, x > z
	[0, 0, 1, 1, 0, 1, 0, 0], // x > y, y < z, x < z
	[1, 0, 0, 1, 0, 1, 0, 0], // x > y, y < z, x > z
	[0, 0, 0, 0, 0, 0, 0, 0], // undefined
	[1, 0, 0, 1, 1, 0, 0, 0], // x > y, y > z, x > z
].flat();

export function simplex3(x: number, y: number, z: number): number {
	const s = (x + y + z) * SIMPLEX_F3;

	const i = (x + s) | 0;
	const j = (y + s) | 0;
	const k = (z + s) | 0;

	const mi = i & 255;
	const mj = j & 255;
	const mk = k & 255;

	const t = (i + j + k) * SIMPLEX_G3;

	const x0 = x - (i - t);
	const y0 = y - (j - t);
	const z0 = z - (k - t);

	const vi = (+(x0 > y0) << 5) | (+(y0 > z0) << 4) | (+(x0 > z0) << 3);

	const i1 = SIMPLEX_V[vi];
	const j1 = SIMPLEX_V[vi + 1];
	const k1 = SIMPLEX_V[vi + 2];
	const i2 = SIMPLEX_V[vi + 3];
	const j2 = SIMPLEX_V[vi + 4];
	const k2 = SIMPLEX_V[vi + 5];

	const x1 = x0 - i1 + SIMPLEX_G3;
	const y1 = y0 - j1 + SIMPLEX_G3;
	const z1 = z0 - k1 + SIMPLEX_G3;
	const x2 = x0 - i2 + 2 * SIMPLEX_G3;
	const y2 = y0 - j2 + 2 * SIMPLEX_G3;
	const z2 = z0 - k2 + 2 * SIMPLEX_G3;
	const x3 = x0 - 1 + 3 * SIMPLEX_G3;
	const y3 = y0 - 1 + 3 * SIMPLEX_G3;
	const z3 = z0 - 1 + 3 * SIMPLEX_G3;

	const t0 = 0.5 - x0 * x0 - y0 * y0 - z0 * z0;
	const t1 = 0.5 - x1 * x1 - y1 * y1 - z1 * z1;
	const t2 = 0.5 - x2 * x2 - y2 * y2 - z2 * z2;
	const t3 = 0.5 - x3 * x3 - y3 * y3 - z3 * z3;

	const tt0 = t0 * t0;
	const tt1 = t1 * t1;
	const tt2 = t2 * t2;
	const tt3 = t3 * t3;

	const w0 = t0 < 0 ? 0 : tt0 * tt0;
	const w1 = t1 < 0 ? 0 : tt1 * tt1;
	const w2 = t2 < 0 ? 0 : tt2 * tt2;
	const w3 = t3 < 0 ? 0 : tt3 * tt3;

	const h0 = SIMPLEX_PG[mi + SIMPLEX_P[mj + SIMPLEX_P[mk]]];
	const h1 = SIMPLEX_PG[mi + i1 + SIMPLEX_P[mj + j1 + SIMPLEX_P[mk + k1]]];
	const h2 = SIMPLEX_PG[mi + i2 + SIMPLEX_P[mj + j2 + SIMPLEX_P[mk + k2]]];
	const h3 = SIMPLEX_PG[mi + 1 + SIMPLEX_P[mj + 1 + SIMPLEX_P[mk + 1]]];

	const gx0 = SIMPLEX_GRADIENTS[h0];
	const gy0 = SIMPLEX_GRADIENTS[h0 + 1];
	const gz0 = SIMPLEX_GRADIENTS[h0 + 2];
	const gx1 = SIMPLEX_GRADIENTS[h1];
	const gy1 = SIMPLEX_GRADIENTS[h1 + 1];
	const gz1 = SIMPLEX_GRADIENTS[h1 + 2];
	const gx2 = SIMPLEX_GRADIENTS[h2];
	const gy2 = SIMPLEX_GRADIENTS[h2 + 1];
	const gz2 = SIMPLEX_GRADIENTS[h2 + 2];
	const gx3 = SIMPLEX_GRADIENTS[h3];
	const gy3 = SIMPLEX_GRADIENTS[h3 + 1];
	const gz3 = SIMPLEX_GRADIENTS[h3 + 2];

	const c0 = w0 * (gx0 * x0 + gy0 * y0 + gz0 * z0);
	const c1 = w1 * (gx1 * x1 + gy1 * y1 + gz1 * z1);
	const c2 = w2 * (gx2 * x2 + gy2 * y2 + gz2 * z2);
	const c3 = w3 * (gx3 * x3 + gy3 * y3 + gz3 * z3);

	return 32 * (c0 + c1 + c2 + c3);
}

// x, y, and time must be non-negative!
export function curlVector(x: number, y: number, time: number, out: number[]) {
	const e = 0.0001;

	const nl = simplex3(x - e, y, time);
	const nr = simplex3(x + e, y, time);
	const nd = simplex3(x, y - e, time);
	const nu = simplex3(x, y + e, time);

	const sx = (nr - nl) / (2 * e);
	const sy = (nu - nd) / (2 * e);

	out[0] = -sy;
	out[1] = sx;
}
