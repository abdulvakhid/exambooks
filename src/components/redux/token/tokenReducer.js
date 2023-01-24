import { SET_TOKEN } from "./tokenType";

const initialState = {
	token: localStorage.getItem("token") || "",
};

export const tokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				...state,
				token: localStorage.setItem("token",action.payload),
			};
		default:
			return state;
	}
};
