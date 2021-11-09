## Pai Para Filho
`Sempre que o componente pai tiver uma atualização, o componente filho será renderizado novamente.`
```tsx
  <Pai>
    <Filho />
  </Pai>
```

## Propriedade
`Sempre que mudar a propriedade de um componente mudar, ele será renderizado novamente.`
```tsx
  var title = 'hey, sou um title'
    
  <Filho title={title} />
```

## Hooks (useState, useContext)
`Sempre que um hook mudar no react, todo os componentes que utilizam o hook, serão renderizados novamente.`
```tsx
  function Container() {
    const [state, setState] = useState();

    return (
      <div>
        {state}
      </div>
    )
  }
```


## Fluxo de Renderização

1. Gerar uma nova versão do componente que precisa ser renderizado;
2. Comparar a nova versão com a versão do componente já salvo na página;
3. Se houverem alterações, o React "renderiza" essa nova versão em tela;



## Hooks Para Melhorar o fluxo de renderização.

- MEMO (importado do react)
```jsx
  1. Pure Functional Components
    Funções puras, que sempre retornam o mesmo resultado;
  
  2. Renders too oftem
    Componentes que estão sendo renderizados muitas vezes;

  3. Re-Renders with same props
    Componentes que estão sendo renderizados com as mesmas propriedades;

  4. Medium to big size
    Componentes muito pequenos, o memo não trará muitos ganhos, pois o custo da comparação é o semelhante ao do react;
```

- useMemo (importado do react) `memorizar um valor`
```jsx
  1. Cálculos pesados
  
  2. Igualdade referencial
    Quando repassamos a informação do calculo para um componente filho
```

- useCallback (importado do react) `memorizar uma função`
```jsx
  1. Utilizado em caso de igualdade referencial
```

- dynamic / lazy (importado do next/dynamic ou importado do react) `carregamento preguiçoso`
```jsx
  1. Utilizado quando o componente só deve ser carregado com uma ação do usuario e não na build;
    Exemplo: (next)

    const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
      return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
    }, {
      loading: () => <span>Carregando...</span>
    })


  2. Também é possivel utilizalo para que ele importe uma lib apenas no uso da função.
    Exemplo:

    async function showFomattedDate() {
      const { format } = await import('date-fns');

      format();
    }
```

- virtualização `carregar uma lista muito grande que requer muito scroll aos poucos, conforme o usuário de scroll`
```jsx
  1. Utilizando a lib `react-virtualize`
  

```