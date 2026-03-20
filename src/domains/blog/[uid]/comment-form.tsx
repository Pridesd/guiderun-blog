import type { FormEvent } from "react"

import {
  COMMENT_AUTHOR_MAX_LENGTH,
  COMMENT_CONTENT_MAX_LENGTH,
} from "./comment-types"

interface CommentFormProps {
  author: string
  content: string
  errorMessage: string | null
  isEditing: boolean
  isSubmitDisabled: boolean
  isSubmitting: boolean
  onAuthorChange: (value: string) => void
  onContentChange: (value: string) => void
  onCancelEdit: VoidFunction
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const CommentForm = ({
  author,
  content,
  errorMessage,
  isEditing,
  isSubmitDisabled,
  isSubmitting,
  onAuthorChange,
  onContentChange,
  onCancelEdit,
  onSubmit,
}: CommentFormProps) => {
  const contentLength = content.length

  return (
    <form
      className="rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5 md:px-6"
      onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">작성자</span>
          <input
            value={author}
            maxLength={COMMENT_AUTHOR_MAX_LENGTH}
            onChange={(event) => onAuthorChange(event.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[0.95rem] text-gray-900 transition-colors outline-none focus:border-gray-400"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">댓글</span>
          <textarea
            value={content}
            maxLength={COMMENT_CONTENT_MAX_LENGTH}
            onChange={(event) => onContentChange(event.target.value)}
            rows={5}
            className="min-h-[144px] resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[0.95rem] leading-7 text-gray-900 transition-colors outline-none focus:border-gray-400"
            placeholder="서로를 존중하는 댓글을 남겨주세요."
          />
        </label>
      </div>
      {errorMessage && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <p
          className={`text-sm ${contentLength > COMMENT_CONTENT_MAX_LENGTH ? "text-red-500" : "text-gray-400"}`}>
          {contentLength} / {COMMENT_CONTENT_MAX_LENGTH}
        </p>
        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onCancelEdit}
              disabled={isSubmitting}>
              취소
            </button>
          )}
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isSubmitDisabled}>
            {isEditing ? "수정하기" : "댓글 남기기"}
          </button>
        </div>
      </div>
    </form>
  )
}
