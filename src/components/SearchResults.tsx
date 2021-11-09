import React from 'react';
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';

import { ProductItem } from './ProductItem';

type ProductsProps = {
  id: number,
  price: number,
  name: string,
  priceFormatted: string;
}

type ContainerProps = {
  products: ProductsProps[];
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export const SearchResults: React.FC<ContainerProps> = ({ products, totalPrice, onAddToWishList }) => {

  // const totalPrice = useMemo(() => {
  //   return products.reduce((acc, produ) => {
  //     return acc + produ.price;
  //   }, 0)
  // }, [products]) // ? sempre que o total de produtos mudar, o calculo será refeito.

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}> 
        {/* 
          // ? sempre é necessario ter uma div por volta 
          // ? style controla se o elemento é visivel em tela ou não
          // ! nunca se esqueça de colocar a key (ele a utiliza para saber qual produto é qual no meio dos 1000)
        */}
        <ProductItem 
          product={products[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  } 

  return (
    <div>
      <h2>Valor total de todos os produtos: {totalPrice}</h2>

      <List 
        height={300} // ? ou um numero qualquer
        rowHeight={30}
        width={900}
        overscanRowCount={5} // ? quantos itens o lib vai deixar pré carregados
        rowCount={products.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};