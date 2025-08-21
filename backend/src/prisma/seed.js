"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const fruits = [
        { name: "Apple", priceCents: 100, stock: 30 },
        { name: "Orange", priceCents: 150, stock: 25 },
        { name: "Banana", priceCents: 200, stock: 40 },
    ];
    for (const fruit of fruits) {
        await prisma.fruit.upsert({
            where: { name: fruit.name },
            update: fruit,
            create: fruit,
        });
    }
}
main().finally(() => prisma.$disconnect());
