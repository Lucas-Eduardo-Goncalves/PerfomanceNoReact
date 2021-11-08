module.exports = () => {
  const data = {
    products: []
  }

  for (let i = 0; i < 1000; i++) {
    data.products.push({
      id: `produto1${i}`,
      name: `produto ${i + 1}`,
      price: 80,
    });
  }

  return data;
} 