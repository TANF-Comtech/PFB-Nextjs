import React from 'react'
import MainContent from '../global/main-content'
import ActionItem from '../slices/action-item'

/**
 * <ActionItemGroup>
 * 
 * This creates the container for an Action Item group
 * It also houses the logic to load in defaults if we don't have enough Action Items
 * 
 * @param { array } payload - array of the action items
 */
const ActionItemGroup = ({
  payload
}) => {
  
  return (
    <MainContent>
      { payload.map( (item, i) => {
        return (
          <ActionItem 
            icon={ item.icon }
            key={ i }
            path={ item.link }
            title={ item.title[0].text }
            text={ item.text }
          />
        )
      })}
    </MainContent>
  )
}

export default ActionItemGroup