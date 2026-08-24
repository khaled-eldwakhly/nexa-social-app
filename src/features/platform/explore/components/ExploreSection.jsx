export default function ExploreSection() {
  return (
    <>
      <section className="space-y-7 section-padding">
        <h1 className="font-semibold">Today's News</h1>
        <section className="space-y-5 *:border-l-4 *:p-3 *:rounded-xl *:border-secondary">
          <div className="space-y-2">
            <p className="font-semibold">
              Fabinho Joins Trabzonspor to Reunite with Salah from Liverpool
              Days
            </p>
            <p className="text-sm text-muted">1 day ago • Sports • 30K posts</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">
              Espí's 90th-Minute Goal Gives Mourinho's Real Madrid 2-1 La Liga
              Opener Win
            </p>
            <p className="text-sm text-muted">
              2 day ago • Sports • 304K posts
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">
              Salah Scores Brace on Turkish League Debut as Trabzonspor Wins 2-1
            </p>
            <p className="text-sm text-muted">
              17 hours ago • Other • 49K posts
            </p>
          </div>
        </section>
        <div className="h-px bg-neutral-200"></div>
        <div className="text-sm">
          <p className="font-semibold text-gray-400">Sports • Trending</p>
          <p className="font-bold">ريال مدريد</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-400">Trending in Egypt</p>
          <p className="font-bold">الهوية المالية الرقمية</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-400">Trending in Egypt</p>
          <p className="font-bold">جروب قاع الهامور</p>
        </div>
      </section>
    </>
  );
}
