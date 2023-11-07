// export const BASE_URL = `http://localhost:2023`;
export const BASE_URL = `http://13.50.228.33:2023`;
export const PRODUCT_PAGE_SIZE = 10;
export const ADMIN_ORDER_PAGE_SIZE = 10;
export const ADMIN_USER_PAGE_SIZE = 10;
// export const UserImageUrl = 

export const getProductImage = (productId) =>{
    return (`${BASE_URL}/products/image/${productId}` );
  }
  