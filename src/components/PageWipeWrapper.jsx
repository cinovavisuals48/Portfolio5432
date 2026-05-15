'use client'

import PageWipe from './PageWipe'

export default function PageWipeWrapper({ children }) {
  return (
    <>
      <PageWipe />
      {children}
    </>
  )
}
