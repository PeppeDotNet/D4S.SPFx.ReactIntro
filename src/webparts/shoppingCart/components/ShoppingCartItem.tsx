import * as React from 'react';
import * as Model from '../model/Model';

export interface IShoppingCartItemProps {
    Item: Model.IShoppingItem;
    ItemIndex: number;
    OnQuantityChanged : (quantityChanged: number, index: number) => void;
}

export default class ShoppingCartItem extends React.Component<IShoppingCartItemProps, any> {

    constructor(props: IShoppingCartItemProps, state: any) {
        //it's required to call the base constructor with props and state
        super(props, state);  

        //get back the context of this to onQuantityChanged event
        this.onQuantityChanged = this.onQuantityChanged.bind(this);

        //this.state = { TotalCost : props.Item.ProductCost * props.Item.Quantity };
    }
    
    private onQuantityChanged(event) : void {        
        //send data changed up to parent
        this.props.OnQuantityChanged(event.target.value, this.props.ItemIndex);
    }
    
    public render(): React.ReactElement<IShoppingCartItemProps> { 
        return <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg4">                        
                        <span>
                            <strong>{this.props.Item.ProductName}</strong> 
                            - € {this.props.Item.ProductCost}
                        </span>
                    </div>
                    <div className="ms-Grid-col ms-lg4">
                        <input type="text" value={this.props.Item.Quantity} onChange={this.onQuantityChanged} />
                    </div>
                    <div className="ms-Grid-col ms-lg4">
                        <span>TOTAL: € {this.props.Item.ProductCost * this.props.Item.Quantity}</span>
                    </div>
               </div>;
    }
}