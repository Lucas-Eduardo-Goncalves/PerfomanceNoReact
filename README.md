# Performace no React
<br/>

React é uma biblioteca JavaScript para construção de interfaces de usuário. 
O React provê uma API declarativa, assim, você não precisa se preocupar em saber exatamente o que mudou em cada atualização utilizando a tecnica denominada como `Reconciliation` Ele utiliza um algoritmo de diffing para que as atualizações nos componentes sejam previsíveis e rápidas o suficiente para aplicações de alta performance. Isso torna mais fácil a criação de aplicações. <br/>
Saiba tudo sobre React neste <a href="https://pt-br.reactjs.org/docs/getting-started.html">link</a>.

Quando o React percebe que será necessario uma nova renderização ele irá:
<!-- O React possui um fluxo de renderização que se baseia em: -->
  1. Gerar uma nova versão do componente que precisa ser renderizado (uma nova representação da DOM do componente).
  2. Comparar a nova versão com a versão anterior do componente já salvo na página.
  3. Se houverem alterações, o React "renderiza" essa nova versão em tela (ele percebe aonde teve uma alteração e altera somente o que é necessário).
<br/>

Existem 3 grandes coisas que tornam possiveis uma renderização de componentes no React que podem acabar causando uma lentidão no seu site, são elas:
<br/>

## Componente pai para um componente filho
Se por algum motivo a nossa componente `<Container>` tiver uma nova renderização, o nosso `<h1>` automaticamente também será recalculado, acabando em gerar uma renderização desnecessária. 

```tsx
import React from 'react';
import { Container } from './styles';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Hello World</h1>
    </Container>
  );
};
```
<br/>

## Propriedade
Quando o nosso componente `Title` tiver sua propriedade atualizada, o mesmo será renderizado novamente.
```tsx
import React from 'react';
import { Container, Heading } from './styles';

export const Dashboard: React.FC = (title: string) => {
  return (
    <Container>
      <Heading title={title}/>
      
      <p>
        Sou apenas um paragrafo
      </p>
    </Container>
  );
};
```
<br/>

## Hooks
Sempre que um hook mudar sua informação no React (hooks de informação, ex: useState/useContext/useReducer), todo os componentes que utilizam o hook, serão renderizados novamente.
```tsx
import React, { useState } from 'react';
import { Container } from './styles';

export const Dashboard: React.FC = () => {
  const [title, setTitle] = useState('Meu titulo');

  return (
    <Container>
      <h1>{title}</h1>
      
      <button onClick={() => setTitle('Troquei o titulo')}>
        Botão que troca o titulo
      </button>
    </Container>
  );
};
```
<br/>

# Hooks, Libs e boas praticas.
Existem alguns hooks algumas libs e Boas praticas que vão auxilia-lo a melhorar a performace do seu site.
<br/>
<br/>

## memo (importado do react)
É utilizado em tais ocasiões:
  
  1. Pure Functional Components <br/>
    Funções puras, que sempre retornam o mesmo resultado;
  2. Renders too oftem <br/>
    Componentes que estão sendo renderizados muitas vezes;
  3. Re-Renders with same props <br/>
    Componentes que estão sendo renderizados com as mesmas propriedades;
  4. Medium to big size <br/>
    Componentes muito pequenos, o memo não trará muitos ganhos, pois o custo da comparação é o semelhante ao do react;

```jsx
import React, { memo } from 'react';

import { AddProductToWishList } from './AddProductToWishList';

interface ProductsProps {
  product: {
    id: number,
    name: string,
    priceFormatted: string;
  },
}

const ProductItemComponente: React.FC<ProductsProps> = ({product}) => {
  return (
    <div>
      {product.name} - <strong>{product.priceFormatted}</strong> 

        <AddProductToWishList 
          onAddToWishList={id}
        />
    </div>
  );
};

export const ProductItem = memo(ProductItemComponente, (prevProps, nextProps) => { 
  return Object.is(prevProps.product, nextProps.product); 
});

```
<br/>

## useMemo (importado do react)
Ele memoriza o antigo valor de um componente evitando que seja necessário uma nova comparação (geralmente utilizado em funções no qual o valor não vai mudar facilmente).
É utilizado em tais ocasiões:

  1. Cálculos pesados
  2. Igualdade referencial <br/>
    Quando repassamos a informação do calculo para um componente filho
```jsx
import React from 'react';
import { ProductItem } from './ProductItem';

type ProductsProps = {
  id: number,
  name: string,
  priceFormatted: string;
}

type ContainerProps = {
  products: ProductsProps[];
}

export const Dashboard: React.FC<ContainerProps> = ({ products }) => {

  const totalPrice = useMemo(() => {
    return products.reduce((acc, produ) => {
      return acc + produ.price;
    }, 0)
  }, [products]) 

  return (
    <div>
      <h2>Valor total de todos os produtos: {totalPrice}</h2>

      {products.map(produto => (
        <div key={produto.id}>
          <h3>{produto.name}</h3>
          <p>Valor: {produto.priceFormatted}</p>
        </div>
      ))}
    </div>
  );
};
```
<br/>

## useCallback (importado do react) 
Ele memoriza uma função para que caso o componente em que ela está seja renderizado novamente, ela não será reconstruida juntamente do componente.
É utilizado em tais ocasiões:
  1. Utilizado em caso de igualdade referencial
```jsx
import React, { useCallback } from 'react';

export const Home: React.FC = () => {

  const addToWishList = useCallback(() => {
    console.log('hey')
  }, []);

  return (
    <div>
      <button onClick={addToWishList}>
        Clique em mim!
      </button>
    </div>
  )
}
```
<br/>

## dynamic / lazy (importado do 'next/dynamic' ou importado do 'react') 
O react carrega todos os componentes assim que entramos na aplicação, todos os `import` da aplicação, deixando-a mais lenta, utilizar alguma dessas opções acima deixará o `carregamento preguiçoso`, fazendo que ele só seja exibido caso o componente seja mostrado em tela.
É utilizado em tais ocasiões:
  1. Utilizado quando o componente só deve ser carregado com uma ação do usuario e não na build;
  2. Também é possivel utilizalo para que ele importe uma lib apenas no uso da função.

```jsx
    Exemplo em um componente: (next)
    const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
      return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
    }, {
      loading: () => <span>Carregando...</span>
    })


  
    Exemplo em uma função: (next)
    async function showFomattedDate() {
      const { format } = await import('date-fns');
      format();
    }
```
<br/>

## Virtualização 
Carregar uma lista muito grande que requer muito scroll (por exemplo gerar 1000 produtos de um vez), com a lib `react-virtualize` ele será gerado em partes, de acordo com o que o usuário está vendo no momento.

```jsx
import React from 'react';
import { List, ListRowRenderer } from 'react-virtualized';
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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}> 
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
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={products.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};
```
