"use client";

import { useState } from "react";
import { Video, FileText, Edit2, X } from "lucide-react";
import { DeleteContentButton } from "./DeleteContentButton";
import { updateContentItem } from "./actions";

type ContentItem = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string | null;
  isActive: boolean;
};

export function ContentCard({ item }: { item: ContentItem }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 relative shadow-md ring-2 ring-indigo-500 ring-opacity-20">
        <button 
          onClick={() => setIsEditing(false)} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>
        <h3 className="font-bold text-slate-900 text-lg mb-4">Edit Content</h3>
        <form 
          action={async (formData) => {
            await updateContentItem(item.id, formData);
            setIsEditing(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={item.title}
              required 
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Content Type</label>
            <select 
              name="type" 
              defaultValue={item.type}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            >
              <option value="VIDEO_RECORDING">Video Recording</option>
              <option value="PDF_MATERIAL">PDF Material</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
            <textarea 
              name="description" 
              defaultValue={item.description || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Material URL (YouTube / Google Drive)</label>
            <input 
              type="url" 
              name="url" 
              defaultValue={item.url || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              name="isActive" 
              id={`isActive-${item.id}`}
              defaultChecked={item.isActive}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <label htmlFor={`isActive-${item.id}`} className="text-sm font-medium text-slate-700">
              Active (Visible in Library)
            </label>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow group relative">
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit Content"
        >
          <Edit2 size={16} />
        </button>
        <DeleteContentButton id={item.id} />
      </div>

      <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
        {item.type === "VIDEO_RECORDING" ? (
          <Video className="text-indigo-600" />
        ) : (
          <FileText className="text-rose-600" />
        )}
      </div>
      <div className="flex-1 pr-16">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900">{item.title}</h3>
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {item.isActive ? "Active" : "Hidden"}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2 whitespace-pre-wrap">{item.description}</p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noreferrer" className="text-sm bg-indigo-50 text-indigo-700 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 mt-4 inline-block transition-colors">
            View Resource &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
