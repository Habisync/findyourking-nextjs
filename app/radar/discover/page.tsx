import ProfileCard from "@/components/ProfileCard";
import { supabase, type Profile } from "@/lib/supabase";

export default async function RadarDiscoverPage() {
  // Fetch new profiles (in a real app, this would filter by recent, online, etc.)
  const { data: newProfiles } = await supabase
    .from("profiles")
    .select("*")
    .limit(20);

  const profiles = (newProfiles || []) as Profile[];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-white">Radar</h1>
          <button className="text-zinc-400">Filters</button>
        </div>
        {/* Tabs */}
        <div className="flex overflow-x-auto">
          <TabButton label="DISCOVER" active />
          <TabButton label="NEARBY" />
          <TabButton label="ACTIVITY" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-8">
        {/* NEW Section */}
        <Section title="NEW" viewAllHref="/radar/new">
          <ProfileGrid profiles={profiles.slice(0, 6)} />
        </Section>

        {/* TRAVELERS ARRIVING Section */}
        <Section title="TRAVELERS ARRIVING" viewAllHref="/radar/travelers">
          <ProfileGrid profiles={profiles.slice(6, 10)} />
        </Section>

        {/* EYECANDY Section */}
        <Section title="EYECANDY" viewAllHref="/radar/eyecandy">
          <ProfileGrid profiles={profiles.slice(10, 16)} />
        </Section>

        {/* HUNQZ Section */}
        <Section title="HUNQZ" viewAllHref="/radar/hunqz">
          <ProfileGrid profiles={profiles.slice(16, 20)} />
        </Section>
      </div>
    </div>
  );
}

function TabButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-6 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
        active
          ? "text-royal-500 border-royal-500"
          : "text-zinc-400 border-transparent hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

function Section({
  title,
  viewAllHref,
  children,
}: {
  title: string;
  viewAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <a
          href={viewAllHref}
          className="text-sm text-royal-500 hover:text-royal-400"
        >
          View all →
        </a>
      </div>
      {children}
    </div>
  );
}

function ProfileGrid({ profiles }: { profiles: Profile[] }) {
  if (profiles.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-8">No profiles found</p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
