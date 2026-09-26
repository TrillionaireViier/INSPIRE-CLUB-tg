import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { subscription: true }
  });

  let count = 0;
  for (const user of users) {
    if (!user.subscription) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          status: "ACTIVE"
        }
      });
      count++;
    }
  }

  console.log(`Created ${count} missing subscriptions.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
