import * as types from '../types/sparks';

export function sparkAdd(text) {
    return {type: types.SPARK_ADD, text};
}

export function sparkSetFilter(text) {
    return {type: types.SPARK_FILTER, text};
}
