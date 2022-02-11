import React, { useState, useEffect, useRef, Ref } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef<HTMLTextAreaElement>(null)
  const nameEl = useRef<HTMLInputElement>(null as unknown as HTMLInputElement)
  const emailEl = useRef<HTMLInputElement>(null as unknown as HTMLInputElement)
  const storeDataEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name') as string
    emailEl.current.value = window.localStorage.getItem('email') as string
  }, [])

  // const handleCommentSubmission = () => {
  //   setError(false)

  //   const { value: comment }: any = commentEl.current
  //   const { value: name }: any = nameEl.current
  //   const { value: email }: any = emailEl.current

  //   if (!comment || !name || !email) {
  //     setError(true)
  //     return
  //   }
  //   const commentObj = { name, email, comment, slug }

  //   if (storeData) {
  //     localStorage.setItem('name', name)
  //     localStorage.setItem('email', email)
  //   } else {
  //     localStorage.removeItem('name', name)
  //     localStorage.removeItem('name', name)
  //   }
  //   submitComment(commentObj).then(() => {
  //     setShowSuccessMessage(true);

  //     setTimeout(() => {
  //       setShowSuccessMessage(true)
  //     }, 3000)
  //   })
  // }

  function handleCommentSubmission() {
    setError(false)

    const { value: comment }: any = commentEl.current
    const { value: name }: any = nameEl.current
    const { value: email }: any = emailEl.current
    const { checked: storeData }: any = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }
    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }
    submitComment(commentObj).then(() => {
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(true)
      }, 3000)
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg ">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Leave a reply
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full rounded-lg bg-gray-100 py-4 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />

        <input
          type="text"
          ref={emailEl}
          className="w-full rounded-lg bg-gray-100 py-4 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8 ">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="ease inline-block cursor-pointer rounded-full bg-black px-8 py-3 text-lg text-white transition duration-500 hover:bg-green-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
