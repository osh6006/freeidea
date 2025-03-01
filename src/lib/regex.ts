export const koreanRegex = /^[가-힣]*$/;

export const englishAndNumberRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

export const koreanOrNumberWithSpacesRegex = /^[가-힣0-9\s]+$/;

export const withoutSpecialCharacterRegex = /^[^!@#$%^&*(),.?":{}|<>]+$/;

export const hiddenRoutePatterns = [/^\/home\/request\/[^\/]+$/];
