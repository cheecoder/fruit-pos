import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const fruits = [
    { name: "Apple", priceCents: 100, stock: 4 },
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
