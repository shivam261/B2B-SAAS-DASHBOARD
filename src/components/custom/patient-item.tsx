export function PatientItem({ name, id, status }: { name: string, id: string, status: string }) {
  const statusColors: any = {
    Stable: "bg-green-100 text-green-700",
    Critical: "bg-red-100 text-red-700",
    Observation: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="flex items-center justify-between group cursor-pointer w-full p-2 rounded-xl transition-all hover:bg-slate-50">
      <div className="flex items-center gap-3">
        {/* Avatar stays blue-100, which is fine for the icon circle */}
        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            {name}
          </p>
          <p className="text-xs text-slate-400 font-medium">{id}</p>
        </div>
      </div>
      
      {/* Status Badge */}
      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}