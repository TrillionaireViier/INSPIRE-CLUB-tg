"use client";

import { useState } from "react";
import { Calendar, Clock, Edit2, X } from "lucide-react";
import { format } from "date-fns";
import { DeleteScheduleButton } from "./DeleteScheduleButton";
import { updateLiveSession } from "./actions";

type Session = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  scheduledFor: Date | null;
};

export function ScheduleCard({ session }: { session: Session }) {
  const [isEditing, setIsEditing] = useState(false);

  // Format the date for the datetime-local input
  // e.g. "2026-10-06T18:00"
  const defaultDateTime = session.scheduledFor 
    ? format(new Date(session.scheduledFor), "yyyy-MM-dd'T'HH:mm") 
    : "";

  if (isEditing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 relative shadow-md ring-2 ring-indigo-500 ring-opacity-20">
        <button 
          onClick={() => setIsEditing(false)} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>
        <h3 className="font-bold text-slate-900 text-lg mb-4">Edit Session</h3>
        <form 
          action={async (formData) => {
            await updateLiveSession(session.id, formData);
            setIsEditing(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Session Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={session.title}
              required 
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date & Time</label>
            <input 
              type="datetime-local" 
              name="scheduledFor" 
              defaultValue={defaultDateTime}
              required 
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
            <textarea 
              name="description" 
              defaultValue={session.description || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Stream / Zoom Link</label>
            <input 
              type="url" 
              name="url" 
              defaultValue={session.url || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
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
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-sm transition-shadow group relative">
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit Session"
        >
          <Edit2 size={16} />
        </button>
        <DeleteScheduleButton id={session.id} />
      </div>

      <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
        <Calendar className="text-rose-600" />
      </div>
      <div className="flex-1 pr-16">
        <h3 className="font-bold text-slate-900 text-lg leading-tight">{session.title}</h3>
        <p className="text-sm text-slate-500 mt-2 whitespace-pre-wrap">{session.description}</p>
        
        <div className="flex items-center gap-4 mt-4 text-sm font-medium text-slate-700">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <Clock size={14} className="text-slate-400" />
            {session.scheduledFor ? format(new Date(session.scheduledFor), "MMM d, yyyy h:mm a") : "TBA"}
          </div>
        </div>
        
        {session.url && (
          <a href={session.url} target="_blank" rel="noreferrer" className="text-sm bg-indigo-50 text-indigo-700 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 mt-4 inline-block transition-colors">
            Join Stream URL &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
