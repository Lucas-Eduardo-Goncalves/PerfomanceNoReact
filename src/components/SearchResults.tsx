import React, { useMemo } from 'react';
import { ProductItem } from './ProductItem';

type ProductsProps = {
  id: number,
  price: number,
  name: string,
}

type ContainerProps = {
  products: ProductsProps[];
  onAddToWishList: (id: number) => void;
}

export const SearchResults: React.FC<ContainerProps> = ({ products, onAddToWishList }) => {

  const totalPrice = useMemo(() => {
    return products.reduce((acc, produ) => {
      return acc + produ.price;
    }, 0)
  }, [products]) // ? sempre que o total de produtos mudar, o calculo será refeito.

  return (
    <div>
      <h2>Valor total de todos os produtos: {totalPrice}</h2>

      {products.map(product => (
        <ProductItem 
          key={product.id} // ! nunca se esqueça de colocar a key (ele a utiliza para saber qual produto é qual no meio dos 1000)
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
};