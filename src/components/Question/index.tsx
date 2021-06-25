import { ReactNode } from 'react'
import cx from 'classnames'

import './style.scss'

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswerd?: boolean;
  isHighlighted?: boolean;
}


export function Questions({
  author,
  content,
  children,
  isAnswerd = false,
  isHighlighted = false,
}: QuestionsProps) {
  return (
    <div
      className={cx('question',
        { answered: isAnswerd },
        { highlighted: isHighlighted && !isAnswerd}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="userInfo">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}