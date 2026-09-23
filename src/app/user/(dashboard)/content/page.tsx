import prisma from "@/lib/prisma";
import { Video, FileText, Plus } from "lucide-react";
import { AddContentForm } from "./AddContentForm";
import { DeleteContentButton } from "./DeleteContentButton";

export const dynamic = "force-dynamic";

export default async function ContentLibraryPage() {
  const content = await prisma.content.findMany({
    where: {
      type: {
        in: ["VIDEO_RECORDING", "PDF_MATERIAL"]
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Бібліотека контенту</h1>
          <p className="text-slate-500 mt-1">Керуйте минулими майстер-класами, записами та PDF-матеріалами.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Library Items</h2>
          {content.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              No content found. Add your first masterclass or PDF!
            </div>
          ) : (
            content.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  {item.type === "VIDEO_RECORDING" ? (
                    <Video className="text-indigo-600" />
                  ) : (
                    <FileText className="text-rose-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline mt-2 inline-block">
                      View Resource &rarr;
                    </a>
                  )}
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                  <div className="mt-2 flex justify-end">
                    <DeleteContentButton id={item.id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Content</h2>
            <AddContentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
