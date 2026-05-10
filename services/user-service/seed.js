const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding Users...');

    await prisma.user.createMany({
        data: [
            {
                name: 'John Doe',
                email: 'john@example.com',
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
            },
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
            },
        ],
    });

    console.log('Users seeded successfully.');
}

seed()
    .catch((e) => {
        console.error('Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });