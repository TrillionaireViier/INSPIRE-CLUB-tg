"use client";

import { useRef } from "react";
import { createLiveSession } from "./actions";

export function AddScheduleForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createLiveSession(formData);
        formRef.current?.reset();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Session Title</label>
        <input 
          type="text" 
          name="title" 
          required 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g. Q&A with John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
        <input 
          type="datetime-local" 
          name="scheduledFor" 
          required 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea 
          name="description" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
          placeholder="Brief description of the session..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Stream / Zoom Link</label>
        <input 
          type="url" 
          name="url" 
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="https://zoom.us/..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium p-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        Schedule Session
      </button>
    </form>
  );
}
