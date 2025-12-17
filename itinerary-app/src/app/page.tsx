import { getAllTrips } from '@/lib/itinerary';
import Link from 'next/link';

export default function Home() {
  const trips = getAllTrips();

  // Sort trips by descending date (assuming YYYY.MM.DD format)
  const sortedTrips = [...trips].sort((a, b) =>
    b.data.meta.dateRange.localeCompare(a.data.meta.dateRange)
  );

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat fixed-background"
        style={{ backgroundImage: "url('/img/bg_jp.jpeg')" }}
      />
      <div className="booklet-container min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-[#fffbf0]/85 backdrop-blur-sm border-4 border-red-100/50 rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-serif text-accent-red mb-10 text-center font-bold drop-shadow-sm tracking-wide">
            My Trips
          </h1>
          <div className="grid gap-6">
            {sortedTrips.length === 0 ? (
              <p className="text-center text-ink-medium text-lg">No trips found in itinerary folder.</p>
            ) : (
              sortedTrips.map(({ id, data }) => (
                <Link key={id} href={`/${id}`} className="block group">
                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-accent-red/30 transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-ink-dark mb-1 group-hover:text-accent-red transition-colors">{data.meta.title}</h4>
                        <p className="text-ink-medium">{data.meta.subtitle}</p>
                      </div>
                      <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">✈️</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-sm text-ink-light font-medium">
                      <span className="mr-2">📅</span>
                      <span className="tracking-wide">{data.meta.dateRange}</span>
                      {data.theme?.tabIcon && (
                        <img src={data.theme.tabIcon} alt="icon" className="w-5 h-5 ml-auto opacity-70" />
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
