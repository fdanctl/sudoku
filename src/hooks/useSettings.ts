import { defaultConfigs } from "@/config/theme";
import { ISettings, IToggles } from "@/models/models";
import { useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<ISettings>(defaultConfigs);

  const handleToggle = (toggle: keyof IToggles) => {
    setSettings((ps) => ({
      ...ps,
      togles: { ...ps.togles, [toggle]: !ps.togles[toggle] },
    }));
  };

  const handleCharChange = (value: ISettings["chars"]) => {
    setSettings((ps) => ({
      ...ps,
      chars: value,
    }));
  };

  return { settings, handleToggle, handleCharChange };
}
