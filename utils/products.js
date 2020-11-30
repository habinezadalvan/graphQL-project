export const fetchProduct = async () => {
      const product = await db.Product.findOne({
      where: {id: productId},
      raw: true
    });
    if(!product){
       return res.status(HTTP_NOT_FOUND).json({
         status: HTTP_NOT_FOUND,
         message: PRODUCT_NOT_FOUND,
       });
    };
    return product;
}