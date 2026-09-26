import prisma from "@/lib/prisma";
import PromocodeList from "./PromocodeList";

export const dynamic = "force-dynamic";

export default async function PromocodesPage() {
  const promos = await prisma.promocode.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Промокоди</h1>
        <p className="text-slate-500 mt-1">
          Створюйте та керуйте промокодами для знижок на підписку.
        </p>
      </div>

      <PromocodeList initialPromos={promos} />
    </div>
  );
}
