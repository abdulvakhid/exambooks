import { SET_TOKEN } from "./tokenType";

export const setTokenRedux = (token) => {
	return {
		type: SET_TOKEN,
		payload: token,
	};
};
