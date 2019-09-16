import React from 'react'
import SHOP_DATA from './shop.data'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

class ShopPage extends React.Component{
    constructor(){
        super()

        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state

        return (
            <div className='shop-page'>
                {
                    // each time an element get redered into a loop, do I need to set a 'key' props for React best-practice?
                    collections.map(({ id, ...otherCollectionProps }) => (
                        <CollectionPreview key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )
    }



}

export default ShopPage