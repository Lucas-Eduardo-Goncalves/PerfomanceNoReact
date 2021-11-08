import React, { memo } from 'react';

type ProductsProps = {
  product: {
    id: number,
    price: number,
    name: string,
  },
  onAddToWishList: (id: number) => void;
}

const ProductItemComponente: React.FC<ProductsProps> = ({ product, onAddToWishList }) => {
  return (
    <div>
      {product.name} - <strong>{product.price}</strong> 

      <button 
        onClick={() => onAddToWishList(product.id)}
      >
        Add to wish list
      </button>
    </div>
  );
};

export const ProductItem = memo(ProductItemComponente, (prevProps, nextProps) => { 
  // a função é opcional, sem ele ele fara uma comparação rasa apenas
  return Object.is(prevProps.product, nextProps.product); 
});

// ? Object.is faz uma comparação profunda de todos os itens das propriedades.
// ! Caso as propriedades sejam muito complexas, isto não é recomendado.