import { Skeleton } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import NotificationCard from "./components/NotificationCard";
import {
  getNotificationsAPI,
  markAllAsReadAPI,
} from "./services/notificationsAPIs";

export default function Notifications() {
  const queryClient = useQueryClient();
  const [allNotification, setAllNotification] = useState(true);
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", allNotification],
    queryFn: () =>
      allNotification ? getNotificationsAPI() : getNotificationsAPI(false),
    select: (data) => data.data.notifications,
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllAsReadAPI(),
    onSuccess: () => {
      queryClient.refetchQueries(["notifications", allNotification]);
      queryClient.refetchQueries(["unreadCount"]);
    },
  });
  return (
    <>
      <main className="main-padding">
        <section className="section-padding space-y-3">
          <div className="space-y-2">
            <button
              className="w-full bg-primary py-2 rounded-xl text-white font-semibold cursor-pointer"
              onClick={() => markAllAsReadMutation.mutate()}
            >
              mark all as read
            </button>
            <div className="flex gap-3">
              <button
                className="w-full bg-primary py-2 rounded-lg text-white font-semibold cursor-pointer"
                onClick={() => setAllNotification(true)}
              >
                All
              </button>
              <button
                className="w-full bg-white border-2 border-primary text-primary py-2 rounded-lg font-semibold cursor-pointer"
                onClick={() => setAllNotification(false)}
              >
                Unread
              </button>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className="space-y-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </>
          ) : (
            notifications.map((notification) => (
              <NotificationCard
                notification={notification}
                key={notification._id}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}
