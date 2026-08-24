import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faRegistered,
  faRetweet,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { markNotificationAsReadAPI } from "../services/notificationsAPIs";

export default function NotificationCard({ notification }) {
  const { actor, type, entityType, entityId, isRead, createdAt, entity, _id } =
    notification;

  const preview = entityType === "post" ? entity.body : entity.content;

  const typesStyle = {
    like_post: {
      message: "liked your post",
      icon: faHeart,
      bg: "bg-red-500",
    },
    share_post: {
      message: "shared your post",
      icon: faRetweet,
      bg: "bg-yellow-500",
    },
    comment_post: {
      message: "commented on your post",
      icon: faComment,
      bg: "bg-green-500",
    },
    follow_user: {
      message: "followed you",
      icon: faUserCheck,
      bg: "bg-sky-500",
    },
  };
  const { message, icon, bg } = typesStyle[type];

  const queryClient = useQueryClient();

  const mark_notification_as_read_mutation = useMutation({
    mutationFn: () => markNotificationAsReadAPI(_id),
    onMutate: () => {
      const previousNotifications = queryClient.getQueryData(["notifications"]);
      const previousUnreadCount = queryClient.getQueryData(["unreadCount"]);

      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            notifications: oldData.data.notifications.map((notification) =>
              notification._id === _id
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification,
            ),
          },
        };
      });

      queryClient.setQueryData(["unreadCount"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            unreadCount: oldData.data.unreadCount - 1,
          },
        };
      });

      return {
        previousNotifications,
        previousUnreadCount,
      };
    },
    onSuccess: () => {
      queryClient.refetchQueries(["notifications"]);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["notifications"],
        context.previousNotifications,
      );
      queryClient.setQueryData(["unreadCount"], context.previousUnreadCount);
    },
  });

  return (
    <>
      <div
        className={`px-3 py-4 rounded-lg relative ${!isRead ? "bg-sky-100 shadow-sky-200 border-l-4 border-tertiary" : "bg-white shadow-gray-200"} shadow flex gap-3 items-center`}
      >
        <img
          src={actor.photo}
          alt={actor.name}
          className="size-13 rounded-full object-cover shadow shadow-primary"
        />

        <div>
          <p className="space-x-1 text-sm">
            <span className="font-semibold text-secondary">{actor.name}</span>
            <span>{message}</span>
            <span className="text-teal-800 font-medium">
              {preview ? (
                preview
              ) : (
                <>
                  <span className="text-red-600">(unavailable)</span>
                </>
              )}
            </span>
          </p>
          <span className="text-xs font-semibold">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        {!isRead && (
          <button
            className="text-secondary text-2xl absolute right-3 bottom-3"
            onClick={() => mark_notification_as_read_mutation.mutate()}
          >
            <FontAwesomeIcon icon={faRegistered} />
          </button>
        )}

        {/* <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="relative size-10 shrink-0">
              <img
                src={actorPhoto}
                alt={actorName}
                className="size-full rounded-full object-cover"
              />
              <div
                className={`${bg} size-5 text-white text-xs rounded-full flex justify-center items-center absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3`}
              >
                <FontAwesomeIcon icon={icon} />
              </div>
            </div>
            <div>
              <h3>
                <span className="font-semibold">{actorName}</span> {message}
              </h3>
              <p className="line-clamp-1">"{preview}"</p>
            </div>
          </div>
          {!isRead && (
            <button
              className="ml-auto text-secondary text-2xl"
              onClick={() => mark_notification_as_read_mutation.mutate()}
            >
              <FontAwesomeIcon icon={faRegistered} />
            </button>
          )}
        </div>
        {!isRead && (
          <FontAwesomeIcon
            icon={faCircle}
            className="absolute left-0 top-0 translate-3/5 text-[8px] text-blue-600"
          />
        )}
        <span className="text-xs">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </span> */}
      </div>
    </>
  );
}
