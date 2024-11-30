import { useSearchParams } from "@remix-run/react"

export default function Search() {
  const [searchParams] = useSearchParams()
  return `Search: ${searchParams.get('q')}`
}