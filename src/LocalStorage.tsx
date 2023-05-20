import { ShowState, ISelectorSettings } from "./Types";

export const loadSettings = (
  setShow: (show: ShowState) => void,
  setSelectorSettings: (selectorSettings: ISelectorSettings) => void
) => {
  localStorage.getItem("battlefield2042.se_showSettings") &&
    setShow(
      JSON.parse(
        localStorage.getItem("battlefield2042.se_showSettings") || "{}"
      )
    );
  localStorage.getItem("battlefield2042.se_selectorSettings") &&
    setSelectorSettings(
      JSON.parse(
        localStorage.getItem("battlefield2042.se_selectorSettings") || "{}"
      )
    );
};

export const saveSettings = (
  show: ShowState,
  selectorSettings: ISelectorSettings
) => {
  localStorage.setItem("battlefield2042.se_showSettings", JSON.stringify(show));

  localStorage.setItem(
    "battlefield2042.se_selectorSettings",
    JSON.stringify(selectorSettings)
  );
};
