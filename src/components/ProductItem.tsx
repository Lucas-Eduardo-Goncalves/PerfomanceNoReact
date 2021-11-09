import React, { memo, useState } from 'react';

import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic'; // ! dentro do react se deve importar a função "lazy"

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

type ProductsProps = {
  product: {
    id: number,
    price: number,
    name: string,
    priceFormatted: string;
  },
  onAddToWishList: (id: number) => void;
}

const ProductItemComponente: React.FC<ProductsProps> = ({ product, onAddToWishList }) => {

  const [isAddToWishList, setIsAddToWishList] = useState(false);

  return (
    <div>
      {product.name} - <strong>{product.priceFormatted}</strong> 
      <button onClick={() => setIsAddToWishList(true)}>Adicionar aos favoritos</button>

      {isAddToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddToWishList(false)}
        />
      )}
    </div>
  );
};

export const ProductItem = memo(ProductItemComponente, (prevProps, nextProps) => { 
  // a função é opcional, sem ele ele fara uma comparação rasa apenas
  return Object.is(prevProps.product, nextProps.product); 
});

// ? Object.is faz uma comparação profunda de todos os itens das propriedades.
// ! Caso as propriedades sejam muito complexas, isto não é recomendado.