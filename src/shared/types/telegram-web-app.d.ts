interface Window {
  Telegram?: TelegramNamespace
}

type TelegramNamespace = {
  WebApp?: TelegramWebApp
}

type ThemeParams = {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
  header_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
  bottom_bar_bg_color?: string
  section_separator_color?: string
}

type WebAppUser = {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  added_to_attachment_menu?: boolean
  allows_write_to_pm?: boolean
  photo_url?: string
}

type WebAppChat = {
  id: number
  type: 'group' | 'supergroup' | 'channel'
  title: string
  username?: string
  photo_url?: string
}

type WebAppInitData = {
  query_id?: string
  user?: WebAppUser
  receiver?: WebAppUser
  chat?: WebAppChat
  chat_type?: string
  chat_instance?: string
  start_param?: string
  can_send_after?: number
  auth_date?: number
  hash?: string
  signature?: string
}

type WebAppInsets = {
  top: number
  bottom: number
  left: number
  right: number
}

type PopupButtonType = 'default' | 'ok' | 'close' | 'cancel' | 'destructive'

type PopupButton = {
  id?: string
  type?: PopupButtonType
  text?: string
}

type PopupParams = {
  title?: string
  message: string
  buttons?: PopupButton[]
}

type ScanQrPopupParams = {
  text?: string
}

type OpenLinkOptions = {
  try_instant_view?: boolean
  try_browser?: string
}

type OpenInvoiceStatus = 'paid' | 'cancelled' | 'failed' | 'pending'

type HomeScreenStatus = 'unsupported' | 'unknown' | 'added' | 'missed'

type InlineQueryChatType =
  | 'users'
  | 'bots'
  | 'groups'
  | 'channels'
  | 'broadcast'

type ShareMessageStatus = 'sent' | 'cancelled'
type EmojiStatusAccessStatus = 'allowed' | 'cancelled'

type BottomButton = {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isActive: boolean
  isProgressVisible: boolean
  hasShineEffect?: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  iconCustomEmojiId?: string
  setText: (text: string) => BottomButton
  onClick: (callback: () => void) => BottomButton
  offClick: (callback: () => void) => BottomButton
  show: () => BottomButton
  hide: () => BottomButton
  enable: () => BottomButton
  disable: () => BottomButton
  showProgress: (leaveActive?: boolean) => BottomButton
  hideProgress: () => BottomButton
  setParams: (params: Partial<BottomButton>) => BottomButton
}

type BackButton = {
  isVisible: boolean
  onClick: (callback: () => void) => BackButton
  offClick: (callback: () => void) => BackButton
  show: () => BackButton
  hide: () => BackButton
}

type SettingsButton = {
  isVisible: boolean
  show: () => SettingsButton
  hide: () => SettingsButton
  onClick: (callback: () => void) => SettingsButton
  offClick: (callback: () => void) => SettingsButton
}

type HapticFeedback = {
  impactOccurred: (
    style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft',
  ) => void
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void
  selectionChanged: () => void
}

type CloudStorage = {
  setItem: (
    key: string,
    value: string,
    callback?: (error: unknown, success: boolean) => void,
  ) => void
  getItem: (
    key: string,
    callback?: (error: unknown, value: string | null) => void,
  ) => void
  getItems: (
    keys: string[],
    callback?: (error: unknown, values: Record<string, string>) => void,
  ) => void
  removeItem: (
    key: string,
    callback?: (error: unknown, success: boolean) => void,
  ) => void
  removeItems: (
    keys: string[],
    callback?: (error: unknown, success: boolean) => void,
  ) => void
  getKeys: (callback?: (error: unknown, keys: string[]) => void) => void
}

type BiometricManager = {
  isInited: boolean
  isBiometricAvailable: boolean
  biometricType?: string
  isAccessRequested: boolean
  isAccessGranted: boolean
  isBiometricTokenSaved: boolean
  deviceId?: string
  init: (callback?: () => void) => void
  requestAccess: (
    params?: { reason?: string },
    callback?: (granted: boolean) => void,
  ) => void
  authenticate: (
    params?: { reason?: string },
    callback?: (success: boolean, token?: string) => void,
  ) => void
  updateBiometricToken: (
    token: string,
    callback?: (success: boolean) => void,
  ) => void
  openSettings: () => void
}

type DeviceStorage = {
  isSupported?: boolean
  setItem: (
    key: string,
    value: string,
    callback?: (ok: boolean, error?: string) => void,
  ) => void
  getItem: (
    key: string,
    callback?: (value: string | null, error?: string) => void,
  ) => void
  removeItem: (
    key: string,
    callback?: (ok: boolean, error?: string) => void,
  ) => void
  clear: (callback?: (ok: boolean, error?: string) => void) => void
}

type SecureStorage = {
  isSupported?: boolean
  setItem: (
    key: string,
    value: string,
    params?: { require_biometric?: boolean },
    callback?: (ok: boolean, error?: string) => void,
  ) => void
  getItem: (
    key: string,
    params?: { require_biometric?: boolean },
    callback?: (value: string | null, error?: string) => void,
  ) => void
  removeItem: (
    key: string,
    callback?: (ok: boolean, error?: string) => void,
  ) => void
  clear: (callback?: (ok: boolean, error?: string) => void) => void
}

type LocationData = {
  latitude: number
  longitude: number
  altitude?: number
  course?: number
  speed?: number
  horizontal_accuracy?: number
  vertical_accuracy?: number
}

type LocationManager = {
  isInited: boolean
  isLocationAvailable: boolean
  isAccessRequested: boolean
  isAccessGranted: boolean
  init: (callback?: () => void) => void
  getLocation: (callback?: (location: LocationData | null) => void) => void
  openSettings: () => void
}

type Accelerometer = {
  isStarted: boolean
  x?: number
  y?: number
  z?: number
  start: (
    params?: { refresh_rate?: number },
    callback?: (started: boolean) => void,
  ) => void
  stop: (callback?: (stopped: boolean) => void) => void
}

type DeviceOrientation = {
  isStarted: boolean
  absolute?: boolean
  alpha?: number
  beta?: number
  gamma?: number
  start: (
    params?: { refresh_rate?: number; need_absolute?: boolean },
    callback?: (started: boolean) => void,
  ) => void
  stop: (callback?: (stopped: boolean) => void) => void
}

type Gyroscope = {
  isStarted: boolean
  x?: number
  y?: number
  z?: number
  start: (
    params?: { refresh_rate?: number },
    callback?: (started: boolean) => void,
  ) => void
  stop: (callback?: (stopped: boolean) => void) => void
}

type TelegramWebAppEventMap = {
  activated: void
  deactivated: void
  themeChanged: void
  viewportChanged: { isStateStable: boolean }
  safeAreaChanged: WebAppInsets
  contentSafeAreaChanged: WebAppInsets
  mainButtonClicked: void
  secondaryButtonClicked: void
  backButtonClicked: void
  settingsButtonClicked: void
  invoiceClosed: { url: string; status: OpenInvoiceStatus }
  popupClosed: { button_id?: string }
  qrTextReceived: { data: string }
  clipboardTextReceived: { data: string | null }
  writeAccessRequested: { status: 'allowed' | 'cancelled' }
  contactRequested: { status: 'sent' | 'cancelled' }
  scanQrPopupClosed: void
  fullscreenChanged: { isFullscreen: boolean }
  fullscreenFailed: { error: string }
  homeScreenChecked: { status: HomeScreenStatus }
  homeScreenAdded: void
  emojiStatusSet: void
  emojiStatusFailed: { error: string }
  emojiStatusAccessRequested: { status: EmojiStatusAccessStatus }
  shareMessageSent: { status: ShareMessageStatus }
  shareMessageFailed: { error: string }
  fileDownloadRequested: { status: 'sent' | 'cancelled' }
  locationManagerUpdated: void
  locationRequested: { status: 'sent' | 'cancelled' }
  accelerometerStarted: void
  accelerometerStopped: void
  accelerometerChanged: { x: number; y: number; z: number }
  accelerometerFailed: { error: string }
  deviceOrientationStarted: void
  deviceOrientationStopped: void
  deviceOrientationChanged: {
    absolute: boolean
    alpha: number
    beta: number
    gamma: number
  }
  deviceOrientationFailed: { error: string }
  gyroscopeStarted: void
  gyroscopeStopped: void
  gyroscopeChanged: { x: number; y: number; z: number }
  gyroscopeFailed: { error: string }
}

type TelegramWebApp = {
  initData: string
  initDataUnsafe: WebAppInitData
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: ThemeParams
  isVersionAtLeast: (version: string) => boolean
  isExpanded: boolean
  isClosingConfirmationEnabled?: boolean
  isVerticalSwipesEnabled?: boolean
  isActive?: boolean
  isFullscreen?: boolean
  isOrientationLocked?: boolean
  viewportHeight: number
  viewportStableHeight: number
  safeAreaInset?: WebAppInsets
  contentSafeAreaInset?: WebAppInsets
  bottomBarColor?: string
  headerColor: string
  backgroundColor: string
  bottom?: number
  left?: number
  right?: number
  BackButton: BackButton
  MainButton: BottomButton
  SecondaryButton: BottomButton
  SettingsButton: SettingsButton
  HapticFeedback: HapticFeedback
  CloudStorage?: CloudStorage
  BiometricManager?: BiometricManager
  LocationManager?: LocationManager
  Accelerometer?: Accelerometer
  DeviceOrientation?: DeviceOrientation
  Gyroscope?: Gyroscope
  DeviceStorage?: DeviceStorage
  SecureStorage?: SecureStorage
  ready: () => void
  expand: () => void
  requestFullscreen?: () => void
  exitFullscreen?: () => void
  lockOrientation?: () => void
  unlockOrientation?: () => void
  enableClosingConfirmation?: () => void
  disableClosingConfirmation?: () => void
  enableVerticalSwipes?: () => void
  disableVerticalSwipes?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  setBottomBarColor?: (color: string) => void
  addToHomeScreen?: () => void
  checkHomeScreenStatus?: (
    callback?: (status: HomeScreenStatus) => void,
  ) => void
  requestWriteAccess?: (callback?: (allowed: boolean) => void) => void
  requestContact?: (callback?: (sent: boolean) => void) => void
  hideKeyboard?: () => void
  openLink?: (url: string, options?: OpenLinkOptions) => void
  openTelegramLink?: (url: string) => void
  openInvoice?: (
    url: string,
    callback?: (status: OpenInvoiceStatus) => void,
  ) => void
  showPopup?: (
    params: PopupParams,
    callback?: (buttonId: string | null) => void,
  ) => void
  showAlert?: (message: string, callback?: () => void) => void
  showConfirm?: (
    message: string,
    callback?: (confirmed: boolean) => void,
  ) => void
  showScanQrPopup?: (
    params: ScanQrPopupParams,
    callback?: (text: string) => boolean | void,
  ) => void
  closeScanQrPopup?: () => void
  readTextFromClipboard?: (callback?: (data: string | null) => void) => void
  switchInlineQuery?: (
    query: string,
    choose_chat_types?: InlineQueryChatType[],
  ) => void
  shareToStory?: (mediaUrl: string, params?: Record<string, unknown>) => void
  shareMessage?: (
    messageId: string,
    callback?: (status: ShareMessageStatus) => void,
  ) => void
  downloadFile?: (
    params: { url: string; file_name: string },
    callback?: (accepted: boolean) => void,
  ) => void
  setEmojiStatus?: (
    customEmojiId: string,
    params?: { duration?: number },
    callback?: (ok: boolean) => void,
  ) => void
  requestEmojiStatusAccess?: (
    callback?: (status: EmojiStatusAccessStatus) => void,
  ) => void
  close: () => void
  sendData: (data: string) => void
  onEvent: <K extends keyof TelegramWebAppEventMap>(
    eventType: K,
    eventHandler: (payload: TelegramWebAppEventMap[K]) => void,
  ) => void
  onEvent: (
    eventType: string,
    eventHandler: (...args: unknown[]) => void,
  ) => void
  offEvent: <K extends keyof TelegramWebAppEventMap>(
    eventType: K,
    eventHandler: (payload: TelegramWebAppEventMap[K]) => void,
  ) => void
  offEvent: (
    eventType: string,
    eventHandler: (...args: unknown[]) => void,
  ) => void
}
