import {
  cameraOutline,
  folderOutline,
  hardwareChipOutline,
  locationOutline,
  notificationsOutline,
  phonePortraitOutline,
  speedometerOutline,
  megaphoneOutline,
} from "ionicons/icons";

export interface SensorItem {
  label: string;
  path: string;
  icon: string;
}

export const SENSORS: SensorItem[] = [
  { label: "Geolocation", path: "/sensors/geolocation", icon: locationOutline },
  { label: "Camera", path: "/sensors/camera", icon: cameraOutline },
  { label: "Motion", path: "/sensors/motion", icon: speedometerOutline },
  { label: "Device", path: "/sensors/device", icon: hardwareChipOutline },
  { label: "Haptics", path: "/sensors/haptics", icon: phonePortraitOutline },
  { label: "Filesystem", path: "/sensors/filesystem", icon: folderOutline },
  {
    label: "Local Notifications",
    path: "/sensors/local-notifications",
    icon: notificationsOutline,
  },
  {
    label: "Push Notifications",
    path: "/sensors/push-notifications",
    icon: megaphoneOutline,
  },
];
