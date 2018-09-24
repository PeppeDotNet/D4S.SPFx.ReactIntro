import * as React from 'react';
import styles from './ShoppingCart.module.scss';
import Button from './Button';
import ShoppingCartList from './ShoppingCartList';
import * as Model from '../model/Model';

export interface IShoppingCartProps {
  pageSize: number;
}

export interface IShoppingCartState {
  Items: Model.IShoppingItem[];
}

export default class ShoppingCart extends React.Component<IShoppingCartProps, IShoppingCartState> {
  constructor(props: IShoppingCartProps, state: IShoppingCartState) {
    //it's required to call the base constructor with props and state
    super(props, state);    

    //settings initial state (here you cannot call this.setState)
    this.state = { Items: [] };

    //get back the context of this to handleQuantityChanged event
    this.handleQuantityChanged = this.handleQuantityChanged.bind(this);
  }

  public componentDidMount() : void {
    //mock data...
    this.setState({
      Items : [
        { ProductId: "1", ProductName: "Product 1", ProductCost: 2.5, Quantity: 4 },
        { ProductId: "2", ProductName: "Product 2", ProductCost: 4.0, Quantity: 2 },
        { ProductId: "3", ProductName: "Product 3", ProductCost: 5.5, Quantity: 7 }
      ]
    });    
  }  

  private handleQuantityChanged(quantityChanged: number, index: number): void {
    //get quantity changed and update items in state
    //note: only one component should be the state's master!
    let items = this.state.Items;
    items[index].Quantity = quantityChanged;
    this.setState({ Items: items });
  }
  
  public render(): React.ReactElement<IShoppingCartProps> {
    return (
      <div className={ styles.shoppingCart }>
        <div className={ styles.container }>          
          <div className={ styles.row }>
            <span className={ styles.title }>Shopping cart</span>
            <p className={ styles.subTitle }>Items in your cart:</p>
            <ShoppingCartList Items={ this.state.Items } OnQuantityChanged={ this.handleQuantityChanged } />
          </div>   
          <h1>Subtotal: € { this.calculateSubtotal(this.state.Items) }</h1>
          <hr />
          <div className="ms-Grid-row">
            <div className="ms-Grid-col">
              <Button text="Empty cart" />
            </div>          
            <div className="ms-Grid-col">
              <Button text="Checkout" /> 
            </div>
          </div>          
        </div>
      </div>
    );
  }

  private calculateSubtotal(items: Model.IShoppingItem[]) {    
    return (items != null && items.length != 0) ? items.map(i => i.Quantity * i.ProductCost).reduce((sum, current) => sum + current) : 0;
  }
}
