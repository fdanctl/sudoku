import { ISettings } from "@/models/models";

export const defaultTheme = "dark-green";

export const defaultConfigs: ISettings = {
  togles: {
    highlightConflicts: true,
    highlightRow: true,
    highlightCol: true,
    highlightBox: true,
    highlightIdenticalNumbers: true,
    showTimer: true,
    showErrorCounter: true,
    autoCandidate: false,
  },
  chars: "digits",
};
