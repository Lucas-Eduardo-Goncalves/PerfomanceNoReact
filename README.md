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
```
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
```
  1. Cálculos pesados
  
  2. Igualdade referencial
    Quando repassamos a informação do calculo para um componente filho
```

- useCallback (importado do react) `memorizar uma função`
```
  1. Utilizado em caso de igualdade referencial
```