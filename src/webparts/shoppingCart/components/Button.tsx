import * as React from 'react';
import styles from './ShoppingCart.module.scss';

export interface IButtonProps {
    text: string;
}

export default class Button extends React.Component<IButtonProps, any> {
    public render(): React.ReactElement<IButtonProps> { 
        return <button className={ styles.button }>
                    <span className={ styles.label }>{this.props.text}</span>
               </button>;
    }
}