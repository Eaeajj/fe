const label = document.createElement("label");
label.htmlFor = "theme";
label.innerText = "theme";

const themeCheckbox = document.createElement("input");
themeCheckbox.type = "checkbox";
themeCheckbox.id = "theme";
label.appendChild(themeCheckbox);

const DATA_THEME_ATTRIBUTE_NAME = "data-theme";
const THEMES = {
  light: "light",
  dark: "dark",
};

themeCheckbox.addEventListener("change", () => {
  if (themeCheckbox.checked) {
    document.documentElement.setAttribute(
      DATA_THEME_ATTRIBUTE_NAME,
      THEMES.dark
    );
  } else {
    document.documentElement.setAttribute(
      DATA_THEME_ATTRIBUTE_NAME,
      THEMES.light
    );
  }
});

export { label as themeCheckbox };
