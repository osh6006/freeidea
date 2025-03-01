declare global {
  interface Window {
    ChannelIO?: IChannelIO;
    ChannelIOInitialized?: boolean;
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (settings: {
          redirectUri?: string;
          state?: string;
          scope?: string;
          prompt?: string;
          loginHint?: string;
          nonce?: string;
          throughTalk?: boolean;
        }) => void;
        login: (options?: {
          success?: (response: KakaoAuthResponse) => void;
          fail?: (error: KakaoAuthError) => void;
          always?: () => void;
          throughTalk?: boolean;
          scope?: string;
        }) => void;
        logout: () => void;
        getAccessToken: () => string | null;
        setAccessToken: (accessToken: string) => void;
      };
      API: {
        request: <T>(options: {
          url: string;
          method?: 'GET' | 'POST' | 'DELETE';
          data?: Record<string, unknown>;
          headers?: Record<string, string>;
        }) => Promise<T>;
      };
    };
  }

  interface KakaoAuthResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
  }

  interface KakaoAuthError {
    error: string;
    error_description: string;
    error_code: string;
  }

  // Channel Talk

  /* eslint-disable @typescript-eslint/no-explicit-any */
  interface IChannelIO {
    c?: (...args: any) => void;
    q?: [methodName: string, ...args: any[]][];
    (...args: any): void;
  }

  interface BootOption {
    appearance?: string;
    customLauncherSelector?: string;
    hideChannelButtonOnBoot?: boolean;
    hidePopup?: boolean;
    language?: string;
    memberHash?: string;
    memberId?: string;
    pluginKey: string;
    profile?: Profile;
    trackDefaultEvent?: boolean;
    trackUtmSource?: boolean;
    unsubscribe?: boolean;
    unsubscribeEmail?: boolean;
    unsubscribeTexting?: boolean;
    zIndex?: number;
  }

  interface Callback {
    (error: Error | null, user: CallbackUser | null): void;
  }

  interface CallbackUser {
    alert: number;
    avatarUrl: string;
    id: string;
    language: string;
    memberId: string;
    name?: string;
    profile?: Profile | null;
    tags?: string[] | null;
    unsubscribeEmail: boolean;
    unsubscribeTexting: boolean;
  }

  interface UpdateUserInfo {
    language?: string;
    profile?: Profile | null;
    profileOnce?: Profile;
    tags?: string[] | null;
    unsubscribeEmail?: boolean;
    unsubscribeTexting?: boolean;
  }

  interface Profile {
    [key: string]: string | number | boolean | null | undefined;
  }

  interface FollowUpProfile {
    name?: string | null;
    mobileNumber?: string | null;
    email?: string | null;
  }

  interface EventProperty {
    [key: string]: string | number | boolean | null | undefined;
  }

  type Appearance = 'light' | 'dark' | 'system' | null;
}

export {};
