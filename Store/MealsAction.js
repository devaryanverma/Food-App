export const TOOGLE_FAVOURITE = 'TOOGLE_FAVOURITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavourite = (id)=>{
    return{ type: TOOGLE_FAVOURITE, mealId: id};
};

export const setFilters = filterDetails =>{
    return { type: SET_FILTERS, filters : filterDetails};
};