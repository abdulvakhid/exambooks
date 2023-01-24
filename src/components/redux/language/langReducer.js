import { SET_LANG } from "./langType";


const initialState = {
	lang: localStorage.getItem("language") || "en",
};

export const langReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LANG:
			return {
				...state,
				lang: localStorage.setItem("token",action.payload),
			};
		default:
			return state;
	}
};
