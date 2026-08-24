import {
  faCalendar,
  faClock,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faInfo,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Separator, useOverlayState } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { FollowersFollowingList } from "./FollowersFollowingList";

export default function ProfileInfo({ profile, isMe }) {

  return (
    <>
      <div>
        <div className="flex items-center gap-4">
          <div className="text-blue-600 size-8 bg-blue-200 flex justify-center items-center rounded-full">
            <FontAwesomeIcon icon={faInfo} />
          </div>
          <div className="-space-y-1">
            <h4 className="font-semibold">Profile information</h4>
            {isMe && <span className="text-sm">Your personal profile</span>}
          </div>
        </div>
        <Separator className="my-3" />
        <ul className="space-y-3 *:bg-gray-100 *:p-2.5 *:rounded-lg">
          <li>
            <div className="flex items-center gap-4">
              <div className="text-blue-600 size-8 bg-blue-200 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="-space-y-1">
                <h4 className="font-light text-sm">FULL NAME</h4>
                <span className="font-semibold">{profile.name}</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <div className="text-green-600 size-8 bg-green-200 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="-space-y-1">
                <h4 className="font-light text-sm">EMAIL ADDRESS</h4>
                <span className="font-semibold">{profile.email}</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <div className="text-violet-600 size-8 bg-violet-200 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div className="-space-y-1">
                <h4 className="font-light text-sm">DATE OF BIRTH</h4>
                <span className="font-semibold">
                  {new Date(profile.dateOfBirth).toLocaleDateString()}
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <div className="text-sky-600 size-8 bg-sky-200 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="-space-y-1">
                <h4 className="font-light text-sm">ACCOUNT AGE</h4>
                <span className="font-semibold">
                  {formatDistanceToNow(new Date(profile.createdAt))}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
