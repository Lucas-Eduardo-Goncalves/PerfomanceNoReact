import { FormEvent, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { SearchResults } from '../components/SearchResults';

type GetProduProps = {
  id: number,
  price: number,
  name: string,
}

type ProductsProps = {
  id: number,
  price: number,
  name: string,
  priceFormatted: string;
}

type resultsProps = {
  results: ProductsProps[];
  totalPrice: number;
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<resultsProps>({
    totalPrice: 0,
    results: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: GetProduProps[] = await response.json();

    const formatter = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })

    const results = data.map(product => {
      return {
        id: product.id,
        price: product.price,
        name: product.name,
        priceFormatted: formatter.format(product.price)
      }
    })
    
    const totalPrice = data.reduce((acc, produ) => {
      return acc + produ.price;
    }, 0)

    setResults({
      results,
      totalPrice
    });
  };

  const addToWishList = useCallback((id: number) => {
    console.log(id)
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type="submit">
          Buscar
        </button>
      </form>

      <SearchResults 
        products={results.results}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}  
      />
    </div>
  )
}

export default Home;