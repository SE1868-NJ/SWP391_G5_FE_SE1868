import { get, patch, post, destroy } from './httpClient'

export const searchProduct = (param) => post(`/Products/Search`, param)

export const setProductFavorite = (param) => post(`/Products/Favorite`, param)

export const getProductFavorite = (param) => post(`/Products/Favorite/getAll`, param)

