import { get, patch, post, destroy } from './httpClient'

export const searchProduct = (param) => post(`/Products/Search`, param)

export const setProductFavorite = (param) => post(`/Products/Favorite`, param)

export const getProductFavorite = (param) => post(`/Products/Favorite/getAll`, param)

export const deleteProductFavorite = (param) => post(`/Products/Favorite/delete`, param)

export const getProductsFavorite = (param) => post(`/Products/Favorite/getAll-product`, param)

export const getProductDetail = (param) => post(`/Products/detail`, param)
