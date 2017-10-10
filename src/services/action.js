export const SET_ROOT_NAVIGATOR = 'SET_ROOT_NAVIGATOR'

export function setRootNavigator(rootNavigator) {
	return {
		type: SET_ROOT_NAVIGATOR,
		rootNavigator
	}
}