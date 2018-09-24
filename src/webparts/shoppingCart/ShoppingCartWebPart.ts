import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ShoppingCartWebPartStrings';
import ShoppingCart from './components/ShoppingCart';
import { IShoppingCartProps } from './components/ShoppingCart';

export interface IShoppingCartWebPartProps {
  description: string;
}

export default class ShoppingCartWebPart extends BaseClientSideWebPart<IShoppingCartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IShoppingCartProps> = React.createElement(
      ShoppingCart, { pageSize: 5 }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
