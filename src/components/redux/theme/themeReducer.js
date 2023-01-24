
import { THEME } from './themeType';

const initialState = {
  theme: 'light',
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case THEME:
            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
            default:
              return state;
	}
};
  