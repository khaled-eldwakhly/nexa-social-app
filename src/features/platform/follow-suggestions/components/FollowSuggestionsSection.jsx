import { useQuery } from "@tanstack/react-query";
import SuggestedUserCard from "../components/SuggestedUserCard";
import { getFollowSuggestionsAPI } from "../services/FollowSuggestionsAPIs";
import { Skeleton } from "@heroui/react";

export default function FollowSuggestionsSection() {
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["followSuggestions"],
    queryFn: getFollowSuggestionsAPI,
    select: (data) => data.data.suggestions,
  });

  return (
    <section className="space-y-3">
      <h3 className=" px-2 py-1 rounded-lg font-semibold">
        You may like to follow
      </h3>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-15" />
          <Skeleton className="h-15" />
          <Skeleton className="h-15" />
          <Skeleton className="h-15" />
          <Skeleton className="h-15" />
        </div>
      ) : (
        <>
          <div className="md:grid md:grid-cols-2 md:gap-3 xl:grid-cols-3">
            {suggestions.map((suggestion) => (
              <SuggestedUserCard user={suggestion} key={suggestion._id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
