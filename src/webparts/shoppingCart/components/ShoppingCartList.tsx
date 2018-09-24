import * as React from 'react';
import ShoppingCartItem from './ShoppingCartItem';
import * as Model from '../model/Model';

export interface IShoppingCartListProps {
    Items: Model.IShoppingItem[];
    OnQuantityChanged : (quantityChanged: number, index: number) => void;
}

export default class ShoppingCartList extends React.Component<IShoppingCartListProps, any> {
    public render(): React.ReactElement<IShoppingCartListProps> { 

        //this renders multiple components bases on array items
        var itemsLists = this.props.Items.map((item, index) => 
            <ShoppingCartItem Item={ item }
                              ItemIndex={ index } //passing item index
                              OnQuantityChanged={ this.props.OnQuantityChanged }
                              key={ item.ProductId } />
        );
        return <div>{itemsLists}</div>;
    }
}