import { Skeleton } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import NotificationCard from "./components/NotificationCard";
import {
  getNotificationsAPI,
  markAllAsReadAPI,
} from "./services/notificationsAPIs";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div className="-space-y-1 mb-5">
            <h1 className="text-secondary font-semibold text-xl">
              Notifications <FontAwesomeIcon icon={faBell} />
            </h1>
            <p>Stay updated with your creative community.</p>
          </div>
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
                <Skeleton className="h-18" />
                <Skeleton className="h-18" />
                <Skeleton className="h-18" />
                <Skeleton className="h-18" />
              </div>
            </>
          ) : (
            <div className="space-y-3 my-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
              {notifications.map((notification) => (
                <NotificationCard
                  notification={notification}
                  key={notification._id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
