import { useRouter } from 'next/router'
import React from 'react'

export default function DetailPage() {
    const router = useRouter();

    const newsId = router.query.newsId;

    // send a request to the backend API
    // to fetch the news item with newsId
  return (
    <div>The Detail Page</div>
  )
}
