import { ISettings, IToggles } from "@/models/models";
import { useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<ISettings>({
    togles: {
      highlightConflicts: true,
      highlightRow: true,
      highlightCol: true,
      highlightBox: true,
      highlightIdenticalNums: true,
      showTimer: true,
      showErrorCounter: true,
      autoCandidate: false,
    },
    chars: "digits",
  });

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
