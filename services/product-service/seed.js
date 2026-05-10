const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding Products...');

    await prisma.product.createMany({
        data: [
            {
                name: 'Laptop',
                price: 1200,
            },
            {
                name: 'Phone',
                price: 800,
            },
            {
                name: 'Headphones',
                price: 150,
            },
        ],
    });

    console.log('Products seeded successfully.');
}

seed()
    .catch((e) => {
        console.error('Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });