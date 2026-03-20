import type { BlogComment } from "./comment-types"

interface CommentItemProps {
  comment: BlogComment
  isOwned: boolean
  isActionDisabled: boolean
  isDeleting: boolean
  onEdit: (comment: BlogComment) => void
  onDelete: (commentId: string) => void
}

function formatCommentDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export const CommentItem = ({
  comment,
  isOwned,
  isActionDisabled,
  isDeleting,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const formattedDate = formatCommentDate(comment.createdAt)

  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-[0.95rem] text-gray-900">
              {comment.author}
            </strong>
            {formattedDate && (
              <span className="text-sm text-gray-400">{formattedDate}</span>
            )}
            {comment.updatedAt && (
              <span className="text-sm text-gray-400">수정됨</span>
            )}
          </div>
        </div>
        {isOwned && (
          <div className="flex shrink-0 items-center gap-3 text-sm">
            <button
              type="button"
              className="text-gray-500 transition-colors hover:text-gray-800 disabled:cursor-not-allowed disabled:text-gray-300"
              onClick={() => onEdit(comment)}
              disabled={isActionDisabled}>
              수정
            </button>
            <button
              type="button"
              className="text-gray-500 transition-colors hover:text-gray-800 disabled:cursor-not-allowed disabled:text-gray-300"
              onClick={() => onDelete(comment.id)}
              disabled={isActionDisabled}>
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-[0.95rem] leading-7 whitespace-pre-line text-gray-700">
        {comment.content}
      </p>
    </li>
  )
}
