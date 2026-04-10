async function seed() {
  console.log('Seeding Users...');
  const users = [
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
    { name: 'Charlie Dave', email: 'charlie@example.com' }
  ];

  const userIds = [];
  for (const user of users) {
    const res = await fetch('http://localhost:4001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    userIds.push(data.id);
  }
  console.log(`Created ${userIds.length} users.`);

  console.log('Seeding Products...');
  const products = [
    { name: 'Laptop Pro', price: 1299.99 },
    { name: 'Wireless Mouse', price: 49.50 },
    { name: 'Mechanical Keyboard', price: 110.00 },
    { name: 'HD Monitor', price: 299.99 }
  ];

  const productIds = [];
  for (const prod of products) {
    const res = await fetch('http://localhost:4002/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prod)
    });
    const data = await res.json();
    productIds.push(data.id);
  }
  console.log(`Created ${productIds.length} products.`);

  console.log('Seeding Orders...');
  const orders = [
    { userId: userIds[0], productId: productIds[0], quantity: 1 },
    { userId: userIds[0], productId: productIds[1], quantity: 2 },
    { userId: userIds[1], productId: productIds[2], quantity: 1 },
    { userId: userIds[2], productId: productIds[3], quantity: 2 }
  ];

  for (const ord of orders) {
    await fetch('http://localhost:4003/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ord)
    });
  }
  console.log(`Created ${orders.length} orders.`);
  
  console.log('Databases successfully seeded! 🎉');
}

seed().catch(err => console.error('Seeding failed:', err));
