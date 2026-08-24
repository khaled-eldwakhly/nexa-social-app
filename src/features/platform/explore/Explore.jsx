import FollowSuggestionsSection from "../follow-suggestions/components/FollowSuggestionsSection";
import ExploreSection from "./components/ExploreSection";

export default function Explore() {
  return (
    <>
      <main className="main-padding space-y-4 bg-white min-h-screen">
        <ExploreSection />
        <FollowSuggestionsSection />
      </main>
    </>
  );
}
