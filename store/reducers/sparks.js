import * as types from '../types/sparks';

const initialState = {
    search: "", 
    items: []   
};

export const sparksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SPARK_ADD: return { ...state, items: [ action.text, ...state.items] };
        case types.SPARK_FILTER: return { ...state, search: action.text };
        default: 
            return state;
    }
};