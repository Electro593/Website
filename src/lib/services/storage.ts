interface GetOptions<T> {
	parser?: (value: string) => T;
	ssrValue?: T;
}

interface SetOptions<T> {
	serializer?: (value: T) => string | null;
}

function isSsr() {
	return typeof window === "undefined";
}

function getValue<T>(
	getter: (key: string) => string | null,
	key: string,
	fallback: T,
	options?: GetOptions<T>,
): T {
	try {
		if (options?.ssrValue !== undefined && isSsr()) return options.ssrValue;
		const value = getter(key);
		if (value == null) return fallback;
		return (options?.parser ?? JSON.parse)(value);
	} catch (e) {
		console.error(e);
		return fallback;
	}
}

function setValue<T>(
	setter: (key: string, value: string) => void,
	key: string,
	value: T,
	options?: SetOptions<T>,
): boolean {
	try {
		const str = (options?.serializer ?? JSON.stringify)(value);
		if (str == null) return false;
		setter(key, str);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function getSessionValue<T>(
	key: string,
	fallback: T,
	options?: GetOptions<T>,
): T {
	return getValue(
		sessionStorage.getItem.bind(sessionStorage),
		key,
		fallback,
		options,
	);
}

export function setSessionValue<T>(
	key: string,
	value: T,
	options?: SetOptions<T>,
): boolean {
	return setValue(
		sessionStorage.setItem.bind(sessionStorage),
		key,
		value,
		options,
	);
}

export function getLocalValue<T>(
	key: string,
	fallback: T,
	options?: GetOptions<T>,
): T {
	return getValue(
		localStorage.getItem.bind(localStorage),
		key,
		fallback,
		options,
	);
}

export function setLocalValue<T>(
	key: string,
	value: T,
	options?: SetOptions<T>,
): boolean {
	return setValue(localStorage.setItem.bind(localStorage), key, value, options);
}
