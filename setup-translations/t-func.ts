import { ComputedRef, Ref, unref, UnwrapRef } from 'vue'

import { getValueByPath } from './helpers'
import { type LeafKeysPaths } from './types'

type TFunc<Dict extends Record<string, unknown>> = (path: LeafKeysPaths<Dict>) => string
// type TFuncFabric = <Dict extends Record<string, unknown>>(dict: Dict) => TFunc<Dict>

// export const createTFunc: TFuncFabric = (dict) => {
// 	const tFunc: TFunc<typeof dict> = (path) => {
// 		return getValueByPath(dict, path)
// 	}
// 	return tFunc
// }

type Shape = Record<string, unknown>
export const createTFunc = <
	Dict extends Shape | Ref<Shape | null> | ComputedRef<Shape | null>
>(dict: Dict) => {

	const tFunc = (path: LeafKeysPaths<UnwrapRef<	Dict>>) => {
		const dictValue: Shape | null = unref(dict)

		if (!dictValue) {
			console.warn('Oops! seems like dict is not defined')
		}
		return getValueByPath(dictValue!, path)
	}

	return tFunc
}
