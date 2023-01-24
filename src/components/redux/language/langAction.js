import { SET_LANG } from "./langType";


export const setLangRedux = (lang) => {
	return {
		type: SET_LANG,
		payload: lang,
	};
};
