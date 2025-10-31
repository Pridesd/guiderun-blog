"use client"

import { HiddenText, Icon } from "@/components/shared"
import axios from "axios"
import { useEffect, useState } from "react"

interface LikeButtonProps {
  id: string
}

const LIKE_LOCALSTORAGE_KEY = "LIKE_POST_LIST"

export const LikeButton = ({ id }: LikeButtonProps) => {
  const [like, setLike] = useState(0)
  const [isLike, setIsLike] = useState(false)

  const likeEndPoint = `/api/posts/${id}/like`

  useEffect(() => {
    const getLikeCount = async () => {
      const data = await axios.get<{ blogId: string; likes: number }>(
        likeEndPoint
      )

      if (data.data?.likes) {
        setLike(data.data?.likes)
      }
    }

    getLikeCount()
  }, [id, likeEndPoint])

  useEffect(() => {
    const checkIsLike = () => {
      const likePostsString = localStorage.getItem(LIKE_LOCALSTORAGE_KEY)
      if (likePostsString) {
        const likePosts = JSON.parse(likePostsString)
        if (Array.isArray(likePosts) && likePosts.includes(id)) {
          setIsLike(true)
        }
      }
    }

    checkIsLike()
  }, [id])

  const handleLike = async () => {
    const likePostsString = localStorage.getItem(LIKE_LOCALSTORAGE_KEY)
    const likePosts = likePostsString ? JSON.parse(likePostsString) : []

    try {
      setIsLike(true)
      setLike((prev) => prev + 1)
      if (!likePosts.includes(id)) {
        likePosts.push(id)
        localStorage.setItem(LIKE_LOCALSTORAGE_KEY, JSON.stringify(likePosts))
      } else {
        localStorage.setItem(LIKE_LOCALSTORAGE_KEY, JSON.stringify([id]))
      }

      await axios.post<{ blogId: string; likes: number }>(likeEndPoint)
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.")
      console.error(error)
      setIsLike(false)
      setLike((prev) => prev - 1)
      localStorage.setItem(LIKE_LOCALSTORAGE_KEY, JSON.stringify(likePosts))
    }
  }

  const handleCancelLike = async () => {
    const likePostsString = localStorage.getItem(LIKE_LOCALSTORAGE_KEY)
    const likePosts: string[] = likePostsString
      ? JSON.parse(likePostsString)
      : []

    try {
      setIsLike(false)
      setLike((prev) => prev - 1)
      if (likePosts.includes(id)) {
        const filteredLikePosts = likePosts.filter((postId) => postId !== id)
        localStorage.setItem(
          LIKE_LOCALSTORAGE_KEY,
          JSON.stringify(filteredLikePosts)
        )
      } else {
        localStorage.setItem(LIKE_LOCALSTORAGE_KEY, JSON.stringify([]))
      }

      await axios.delete<{ blogId: string; likes: number }>(likeEndPoint)
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.")
      console.error(error)

      setIsLike(true)
      setLike((prev) => prev + 1)
      localStorage.setItem(LIKE_LOCALSTORAGE_KEY, JSON.stringify(likePosts))
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        className="cursor-pointer"
        aria-pressed={isLike}
        onClick={isLike ? handleCancelLike : handleLike}>
        <Icon icon={isLike ? "HeartFill" : "Heart"} alt="좋아요" />
      </button>
      <span role="text">
        <HiddenText>좋아요</HiddenText>
        {like}
        <HiddenText>개</HiddenText>
      </span>
    </div>
  )
}
