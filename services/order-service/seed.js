const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding Orders...');

    await prisma.order.createMany({
        data: [
            {
                userId: 1,
                productId: 1,
                quantity: 2,
            },
            {
                userId: 2,
                productId: 2,
                quantity: 1,
            },
        ],
    });

    console.log('Orders seeded successfully.');
}

seed()
    .catch((e) => {
        console.error('Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });