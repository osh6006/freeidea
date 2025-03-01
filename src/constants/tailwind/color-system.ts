const defaultColor = {
  sidebar: {
    DEFAULT: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))',
  },
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
  'main-gray-50': 'hsl(var(--main-gray-50))',
  'main-gray-100': 'hsl(var(--main-gray-100))',
  'main-gray-200': 'hsl(var(--main-gray-200))',
  'main-gray-300': 'hsl(var(--main-gray-300))',
  'main-gray-400': 'hsl(var(--main-gray-400))',
  'main-gray-500': 'hsl(var(--main-gray-500))',
  'main-gray-700': 'hsl(var(--main-gray-700))',
  'main-gray-750': 'hsl(var(--main-gray-750))',
  'main-gray-800': 'hsl(var(--main-gray-800))',
  'main-gray-900': 'hsl(var(--main-gray-900))',

  error: '#FF4040',
  success: 'hsl(var(--success))',
  state: 'hsl(var(--state))',
};

const keyColors = {
  slate: {
    DEFAULT: '#717680',
    50: '#F8F9FB',
    100: '#E2E5E9',
    200: '#DBDEE3',
    300: '#BCC0C6',
    400: '#9FA3AB',
    500: '#717680',
    600: '#4B515B',
    700: '#24282F',
    800: '#1D2027',
    900: '#15181E',
    'tint-5': 'rgba(113, 118, 128, 0.05)',
    'tint-10': 'rgba(113, 118, 128, 0.1)',
    'tint-15': 'rgba(113, 118, 128, 0.15)',
    'tint-20': 'rgba(113, 118, 128, 0.2)',
    'tint-40': 'rgba(113, 118, 128, 0.4)',
  },

  pink: {
    DEFAULT: '#FF96B5',
    50: '#FFF5F8',
    100: '#FFDEE8',
    200: '#FFCFDD',
    300: '#FFB9CD',
    400: '#FFABC4',
    500: '#FF96B5',
    600: '#E889A5',
    700: '#B56B81',
    800: '#8C5364',
    900: '#6B3F4C',
    'tint-5': 'rgba(255, 101, 138, 0.05)',
    'tint-10': 'rgba(255, 101, 138, 0.1)',
    'tint-15': 'rgba(255, 101, 138, 0.15)',
    'tint-20': 'rgba(255, 101, 138, 0.2)',
  },
};

const additionalColors = {
  neonGreen: {
    DEFAULT: '#00E600',
    50: '#E8FFE4',
    100: '#CBFFC5',
    200: '#9AFF92',
    300: '#5BFF53',
    400: '#24FB20',
    500: '#00E600',
    600: '#00B505',
    700: '#028907',
    800: '#086C0C',
    900: '#0C5B11',
    'tint-5': 'rgba(0, 230, 0, 0.05)',
    'tint-10': 'rgba(0, 230, 0, 0.1)',
    'tint-15': 'rgba(0, 230, 0, 0.15)',
    'tint-20': 'rgba(0, 230, 0, 0.2)',
  },

  coralRed: {
    DEFAULT: '#FF4040',
    50: '#FFEEEE',
    100: '#FFDFDF',
    200: '#FFC5C5',
    300: '#FF9D9D',
    400: '#FF6464',
    500: '#FF4040',
    600: '#ED1515',
    700: '#C80D0D',
    800: '#A50F0F',
    900: '#881414',
    'tint-5': 'rgb(255, 64, 64, 0.05)',
    'tint-10': 'rgb(255, 64, 64, 0.1)',
    'tint-15': 'rgb(255, 64, 64, 0.15)',
    'tint-20': 'rgb(255, 64, 64, 0.2)',
    'tint-85': 'rgb(255, 64, 64, 0.85)',
  },

  mustard: {
    DEFAULT: '#FFAA00',
    50: '#FFFBD8',
    100: '#FFF6C5',
    200: '#FFEE85',
    300: '#FFDE46',
    400: '#FFCC1B',
    500: '#FFAA00',
    600: '#E28100',
    700: '#BB5902',
    800: '#984508',
    900: '#7C380B',
    'tint-5': 'rgba(2255, 170, 0, 0.05)',
    'tint-10': 'rgba(255, 170, 0, 0.1)',
    'tint-15': 'rgba(255, 170, 0, 0.15)',
    'tint-20': 'rgba(255, 170, 0, 0.2)',
  },

  neonPurple: {
    DEFAULT: '#CD28FD',
    50: '#FDF3FF',
    100: '#F9E6FF',
    200: '#F2CCFF',
    300: '#ECA4FF',
    400: '#E26EFF',
    500: '#CD28FD',
    600: '#B818E1',
    700: '#9C10BB',
    800: '#810F99',
    900: '#6D127D',
    'tint-5': 'rgba(205, 40, 253, 0.05)',
    'tint-10': 'rgba(205, 40, 253, 0.1)',
    'tint-15': 'rgba(205, 40, 253, 0.15)',
    'tint-20': 'rgba(205, 40, 253, 0.2)',
  },

  blue: {
    DEFAULT: '#00B9FF',
    50: '#ECF9FF',
    100: '#DEF3FF',
    200: '#B6EAFF',
    300: '#75DBFF',
    400: '#2CCAFF',
    500: '#00B9FF',
    600: '#0090D4',
    700: '#0072AB',
    800: '#00608D',
    900: '#065074',
    'tint-5': 'rgba(0, 185, 255, 0.05)',
    'tint-10': 'rgba(0, 185, 255, 0.1)',
    'tint-15': 'rgba(0, 185, 255, 0.15)',
    'tint-20': 'rgba(0, 185, 255, 0.2)',
  },
};
const bgColors = {
  background: {
    DEFAULT: '#EDF0F4',
    surface: '#FFFFFF',
    'surface-sub': '#F8F9FB',
    'surface-inverse': '#15181E',

    'surface-slate-primary': '#15181E',
    'surface-slate-secondary': '#E2E5E9',

    'surface-critical-primary': '#FF4040',
    'surface-critical-secondary': '#FFEEEE',

    'surface-warning-primary': '#FFAA00',
    'surface-warning-secondary': '#FFFBD8',

    'surface-success-primary': '#00E600',
    'surface-success-secondary': '#E8FFE4',

    'surface-highlight-primary': '#FF658A',
    'surface-highlight-secondary': '#FFF0F3',

    'surface-avatar': '#BCC0C6',
    'surface-toast': '#000000',
    'surface-toast-critical': '#FF4040',

    field: '#FFFFFF',
    'field-sub': 'rgba(113, 118, 128, 0.1)',
    'field-disabled': '#E2E5E9',

    focus: '#15181E',
    'focus-accent': '#FF658A',

    'action-accent': '#FF658A',
    'action-accent-hover': '#E85C7E',
    'action-accent-pressed': '#B54862',
    'action-accent-disabled': 'rgba(255, 101, 138, 0.2)',

    'action-accentTonal': 'rgba(255, 101, 138, 0.1)',
    'action-accentTonal-hover': 'rgba(255, 101, 138, 0.15)',
    'action-accentTonal-pressed': 'rgba(255, 101, 138, 0.2)',
    'action-accentTonal-disabled': 'rgba(255, 101, 138, 0.05)',

    'action-primary': 'rgba(21, 24, 30, 1)',
    'action-primary-hover': 'rgba(36, 40, 47, 1)',
    'action-primary-pressed': 'rgba(75, 81, 91, 1)',
    'action-primary-disabled': 'rgba(113, 118, 128, 0.05)',

    'action-primaryTonal': 'rgba(113, 118, 128, 0.1)',
    'action-primaryTonal-hover': 'rgba(113, 118, 128, 0.15)',
    'action-primaryTonal-pressed': 'rgba(113, 118, 128, 0.2)',
    'action-primaryTonal-disabled': 'rgba(113, 118, 128, 0.05)',

    'action-secondary': '#DBDEE3',
    'action-secondary-hover': '#F8F9FB',
    'action-secondary-pressed': '#E2E5E9',
    'action-secondary-disabled': 'rgba(113, 118, 128, 0.05)',

    'action-critical': '#ED1515',
    'action-critical-hover': '#C80D0D',
    'action-critical-pressed': '#A50F0F',
    'action-critical-disabled': 'rgba(255, 64, 64, 0.1)',

    'action-criticalTonal': 'rgba(255, 64, 64, 0.1)',
    'action-criticalTonal-hover': 'rgba(255, 64, 64, 0.15)',
    'action-criticalTonal-pressed': 'rgba(255, 64, 64, 0.2)',
    'action-criticalTonal-disabled': 'rgba(255, 64, 64, 0.05)',

    'action-toggle': 'rgba(113, 118, 128, 0.15)',

    layer: '#FFFFFF',
    'layer-hover': 'rgba(113, 118, 128, 0.1)',
    'layer-sub': 'rgba(113, 118, 128, 0.05)',
    'layer-sub-hover': 'rgba(113, 118, 128, 0.1)',
    'layer-selected': 'rgba(255, 101, 138, 0.15)',
    'layer-selected-hover': 'rgba(255, 101, 138, 0.2)',

    overlay: 'rgba(0, 0, 0, 0.15)',
    'overlay-sub': 'rgba(0, 0, 0, 0.5)',
  },
};
const borderColors = {
  border: {
    DEFAULT: '#DBDEE3',
    hover: '#9FA3AB',
    sub: '#717680',
    minimal: '#BCC0C6',
    critical: '#FF4040',
    'critical-hover': '#ED1515',
    warning: '#FFAA00',
    success: '#00E600',
    highlight: '#FF658A',
    slate: '#15181E',
    divide: '#E2E5E9',
    'divide-sub': '#717680',
    'divide-minimal': '#F8F9FB',
  },
};
const textColors = {
  text: {
    DEFAULT: '#15181E',

    sub: '#717680',
    minimal: '#9FA3AB',

    disabled: '#BCC0C6',

    critical: '#ED1515',
    'critical-hover': '#C80D0D',

    warning: '#E28100',
    'warning-hover': '#BB5902',

    success: '#00B505',

    accent: '#E85C7E',
    'accent-hover': '#B54862',

    secondary: '#4B515B',
    'secondary-hover': '#24282F',

    on: 'rgba(0, 0, 0, 0.1)',
    'on-hover': 'rgba(226, 229, 233, 1)',

    inverse: 'rgba(0, 0, 0, 0.1)',
  },
};
const iconColors = {
  icon: {
    DEFAULT: '#15181E',
    sub: '#717680',
    minimal: '#717680',
    disabled: '#BCC0C6',

    critical: '#ED1515',
    'critical-hover': '#C80D0D',

    warning: '#E28100',
    'warning-hover': '#BB5902',

    success: '#00B505',

    accent: '#E85C7E',
    'accent-hover': '#B54862',

    secondary: '#4B515B',
    'secondary-hover': '#24282F',

    on: 'rgba(0, 0, 0, 0.1)',
    'on-hover': 'rgba(226, 229, 233, 1)',

    inverse: 'rgba(0, 0, 0, 0.1)',
  },
};

export const COLOR_SYSTEM = {
  ...defaultColor,
  ...keyColors,
  ...additionalColors,
  ...bgColors,
  ...borderColors,
  ...textColors,
  ...iconColors,
};
