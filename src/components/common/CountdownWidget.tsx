import { useEffect, useMemo, useState } from "react";

const formatRemaining = (ms: number) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
};

const CountdownWidget = () => {
  const [target, setTarget] = useState<string>(() => localStorage.getItem("evnting_countdown") || "");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = useMemo(() => {
    if (!target) return null;
    const ts = new Date(target).getTime();
    return formatRemaining(ts - now);
  }, [target, now]);

  const onSave = () => {
    if (target) localStorage.setItem("evnting_countdown", target);
  };

  return (
    <aside className="container mt-8">
      <div className="rounded-xl border p-4 bg-card/60 shadow-elevated">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-display text-lg">Event Countdown</h3>
            <p className="text-sm text-muted-foreground">Set your event date to start the countdown.</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="datetime-local"
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <button onClick={onSave} className="btn-premium border-soft rounded-md px-3 py-2 text-sm">Save</button>
          </div>
        </div>
        {remaining && (
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {([['Days', remaining.days], ['Hours', remaining.hours], ['Minutes', remaining.minutes], ['Seconds', remaining.seconds]] as const).map(([label, val]) => (
              <div key={label} className="rounded-md border p-3">
                <div className="text-2xl font-semibold">{val}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CountdownWidget;
