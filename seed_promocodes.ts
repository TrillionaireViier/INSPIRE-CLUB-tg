import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const codes = [
  "INSP-78X9-K2Q1",
  "KURAJ-99LM-54ZT",
  "TRIL-33AB-88YV",
  "BOTF-45GH-10PR",
  "VECT-77UI-33WE",
  "CODE-12ZX-90MN",
  "CYBER-55OP-22AS",
  "NEON-64DF-81JK",
  "NODE-88VC-47BN",
  "SOLO-31QE-55RT",
  "PIXEL-20PO-99UI",
  "SYNC-44LK-12JH",
  "AUTO-83ZX-77CV",
  "FAST-19AS-34DF",
  "LITE-90GH-66JK"
];

async function main() {
  console.log("Starting to insert promocodes...");
  for (const code of codes) {
    try {
      await prisma.promocode.upsert({
        where: { code },
        update: {}, // do nothing if it exists
        create: {
          code,
          discount: 100, // I will set 100% as default for invite codes
          isActive: true
        }
      });
      console.log(`✅ Added ${code}`);
    } catch (e: any) {
      console.error(`❌ Failed to add ${code}: ${e.message}`);
    }
  }
  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
