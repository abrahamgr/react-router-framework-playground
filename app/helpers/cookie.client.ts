interface CookieProps {
  name: string
  value: string
  expires: number
}

declare global {
  interface Window {
    cookieStore?: {
      set: (cookieptions: CookieProps) => Promise<void>
      get: (name: string) => Promise<CookieProps>
    }
  }
}

/**
 * get cookie
 */
export async function getCookie(name: string) {
  if (window?.cookieStore) return (await window.cookieStore.get(name)).value
  const searchParams = new URLSearchParams(
    document.cookie.replaceAll(' ', '').split(';').join('&')
  )
  return searchParams.get(name)
}

/**
 * set cookie using native cookieStore
 */
export async function setCookie({ name, value, expires }: CookieProps) {
  if (window?.cookieStore) {
    await window.cookieStore.set({
      name,
      value,
      expires,
    })
  } else {
    document.cookie = `${name}=${value}; path=/; expires=${new Date(expires).toUTCString()}`
  }
}
