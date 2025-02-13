import { get, patch, post, destroy } from './httpClient'

export const searchProduct = (param) => post(`/Products/Search`, param)