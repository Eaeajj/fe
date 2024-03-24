export type LeafKeysPaths<T> = T extends Record<string, unknown>
	? { [K in keyof T]-?: Concat<K & string, LeafKeysPaths<T[K]>> }[keyof T]
	: ''

export type Concat<K extends string, P extends string> = `${K}${'' extends P
	? ''
	: '.'}${P}`

export type ArrayItemFormat<
	KeyName extends string,
	ValueName extends string,
	KeyValue extends string = string
> = {
	[K in KeyName]: KeyValue
} & {
	[K in ValueName]: string
}

export type MapKeyValueArraysToDicts<
	Shape extends Record<string, unknown>,
	KeyName extends string,
	ValueName extends string,
	ShapeKey extends keyof Shape = keyof Shape,
> = (object: Shape)
=> {
	[K in ShapeKey]: Shape[K] extends string
		? string
		: Shape[K] extends Record<string, unknown>
			? ReturnType< MapKeyValueArraysToDicts<Shape[K], KeyName, ValueName, keyof Shape[K]>>
			: Shape[K] extends ArrayItemFormat<KeyName, ValueName, infer U>[]
				? Record<U, string>
				: never
}

export type MapKeyValueArraysToDictsWithParser<
	Shape extends Record<string, unknown>,
	KeyName extends string,
	ValueName extends string,
	ShapeKey extends keyof Shape = keyof Shape,
> = (object: Shape)
=> {
	[K in ShapeKey]: Shape[K] extends string
		? string
		: Shape[K] extends Record<string, unknown>
			? ReturnType< MapKeyValueArraysToDicts<Shape[K], KeyName, ValueName, keyof Shape[K]>>
			: Shape[K] extends ArrayItemFormat<KeyName, ValueName, infer U>[]
				? Record<U, string>
				: never
}
