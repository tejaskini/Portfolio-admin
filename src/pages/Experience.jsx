const Experience = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-5xl font-black text-white">Experience</h1>
        <button className="bg-blue-600 px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-900/40 transition">
          + Add New Role
        </button>
      </div>

      {/* Table container spanning 100% width */}
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 border-b border-slate-800">
            <tr>
              <th className="p-8 text-slate-400 font-bold uppercase text-xs tracking-widest">Position & Company</th>
              <th className="p-8 text-slate-400 font-bold uppercase text-xs tracking-widest">Duration</th>
              <th className="p-8 text-slate-400 font-bold uppercase text-xs tracking-widest text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
             {/* Map your items here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Experience;