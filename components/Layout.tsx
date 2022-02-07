import React, { Children } from 'react'
import { Categories, Header, PostCard, PostWidget } from '.'
import Home from '../pages'

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />

      {children}
    </>
  )
}

export default Layout
