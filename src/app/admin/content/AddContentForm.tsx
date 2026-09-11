"use client";

import { useRef } from "react";
import { createContent } from "./actions";

export function AddContentForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createContent(formData);
        formRef.current?.reset();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input 
          type="text" 
          name="title" 
          required 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g. Masterclass: Color Theory"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <select 
          name="type" 
          required
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="VIDEO_RECORDING">Video Recording</option>
          <option value="PDF_MATERIAL">PDF Material</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea 
          name="description" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
          placeholder="Brief description of the content..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL (Link to Video/PDF)</label>
        <input 
          type="url" 
          name="url" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="https://..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        Save Content
      </button>
    </form>
  );
}
