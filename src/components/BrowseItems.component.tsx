import React from 'react'
import { Item } from '../types'
import { ViewItem } from './ViewItem.component'

interface BrowseItemsProps {
  items: Item[]
}
export const BrowseItems: React.FC<BrowseItemsProps> = ({ items }) => {
  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <ViewItem {...item} />
          </div>
        ))}
      </div>
    </>
  )
}
