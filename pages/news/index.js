import React, { Fragment } from 'react'
import Link from 'next/link'


export default function NewsPage() {
  return (
    <Fragment>
      <h1>The News pAGE</h1>
      <ul>
        <li>
          <Link href='/news/nextjs-is-a-great-framework'>NextJS Is A Great Framework</Link>
        </li>
        <li>
          <h4>Something Else</h4>  
        </li>
      </ul>
    </Fragment>
  )
}
