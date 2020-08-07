import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DocSearch } from '@docsearch/react'

function Hit({ hit, children }) {
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

export function Search() {
  const router = useRouter()

  return (
    <div className="relative">
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link rel="preconnect" href={`https://BH4D9OD16A-dsn.algolia.net`} crossOrigin="true" />
      </Head>

      <DocSearch
        indexName="tailwindcss"
        apiKey="3df93446658cd9c4e314d4c02a052188"
        appId="BH4D9OD16A"
        navigator={{
          navigate({ suggestionUrl }) {
            router.push(suggestionUrl)
          },
        }}
        hitComponent={Hit}
        transformItems={(items) => {
          return items.map((item) => {
            // We transform the absolute URL into a relative URL to
            // leverage Next's preloading.
            const a = document.createElement('a')
            a.href = item.url

            return {
              ...item,
              url: `${a.pathname}${a.hash}`,
            }
          })
        }}
      />
    </div>
  )
}
