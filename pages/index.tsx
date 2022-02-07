import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Categories, PostCard, PostWidget } from '../components'
import { getPosts } from '../services'

export default function Home(props: any) {
  console.log(props)

  const posts = props.posts
  console.log(posts)

  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Itodo's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post: any) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  console.log(posts)
  console.log('here')

  return {
    props: { posts },
  }
}