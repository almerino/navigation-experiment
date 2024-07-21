"use client"

import { useQuery } from "react-query"
import { Skeleton, Tag } from "antd"
import Link from "next/link"

import { useDebouncedValue } from "@/hooks/useDebouncedValue"

// Just for the example never do that!
const search = (query: string) => {
  return fetch("https://api.mintlifytrieve.com/api/chunk/autocomplete", {
    headers: {
      accept: "*/*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      authorization: "tr-Ef0O1GG473PDFHfclCabtti5n0mHNolw",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "tr-dataset": "7d2bdb48-94a9-468f-81b4-836f14ab8572",
    },
    referrer: "https://docs.private.joinformal.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
      query,
      search_type: "fulltext",
      extend_results: true,
      highlight_delimiters: ["?", ",", ".", "!", " ", "\\n"],
      score_threshold: 0.2,
      filters: { must_not: [{ field: "tag_set", match: ["code"] }] },
      highlight_window: 10,
      highlight_max_num: 1,
      page_size: 20,
    }),
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
}

type SearchResult = {
  id: string
  description: { __html: string | TrustedHTML }
  href: string
  tag: string
  title: string
}

type Chunk = {
  metadata: {
    id: string
    chunk_html: string
    link: string
    metadata: {
      openapi: string
      title: string
    }
  }[]
}

const SearchContent = ({ query }: { query: string }) => {
  const queryText = useDebouncedValue(query, 500)

  const { isLoading, isError, data } = useQuery(
    ["search", queryText],
    async () => {
      const response = await search(query)

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const res = await response.json()
      return res.score_chunks.map((chunk: Chunk) => ({
        id: chunk.metadata[0].id,
        description: { __html: chunk.metadata[0].chunk_html },
        href: `https://docs.private.joinformal.com/${chunk.metadata[0].link}`,
        tag: chunk.metadata[0].metadata.openapi?.split(" ")[0],
        title: chunk.metadata[0].metadata.title,
      }))
    }
  )

  return (
    <div className="p-2 overflow-scroll max-h-[calc(100%-130px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {isLoading && <Skeleton />}
      {isError && <div>Sorry, we failed to search</div>}
      {data && (
        <div className="flex flex-col w-full p-2 py-2">
          {data.map((row: SearchResult) => (
            <Link
              key={row.id}
              href={row.href}
              target="_blank"
              className="rounded-md transition ease-out p-2 py-2 hover:bg-[#e1e6ed]"
            >
              <div className="text-md">
                {row.tag && (
                  <Tag color="#108ee9" className="uppercase">
                    {row.tag}
                  </Tag>
                )}
                {row.title}
              </div>
              {/* don't do that, here for example */}
              <div
                dangerouslySetInnerHTML={row.description}
                className="text-sm"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchContent
