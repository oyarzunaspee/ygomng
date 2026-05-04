let listeners: ((v: boolean) => void)[] = []
let isLoading = false

export function setLoading(v: boolean) {
  isLoading = v
  listeners.forEach((l) => l(v))
}

export function subscribe(cb: (v: boolean) => void) {
  listeners.push(cb)
  return () => {
    listeners = listeners.filter((l) => l !== cb)
  }
}

export function getLoading() {
  return isLoading
}