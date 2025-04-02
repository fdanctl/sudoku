import { ISettings } from "@/models/models";
import { useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<ISettings>({
    highlightConflicts: true,
    highlightRow: true,
    highlightCol: true,
    highlightBox: true,
    highlightIdenticalNums: true,
    showTimer: true,
    showErrorCounter: true,
  });

  const handleChangeSetting = (setting: keyof ISettings) => {
    setSettings((ps) => ({ ...ps, [setting]: !ps[setting] }));
  };

  return { settings, handleChangeSetting };
}
