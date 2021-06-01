import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StocksService } from '../../services/stocks/stocks.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  public selectStocks = [];
  enableBillPrice: boolean = false;
  priceErrorBanner: boolean = false; //Price Error Display Banner
  systemUnavailable: boolean = false; //Display Server error
  onSuccessBanner: boolean = false; //Display Success Banner on Submit
  buyForm: FormGroup;

  get getStocks() {
    return this.buyForm.get('stocks');
  }
  get getQuantity() {
    return this.buyForm.get('quantity');
  }
  get getOrderType() {
    return this.buyForm.get('orderType');
  }
  get getPrice() {
    return this.buyForm.get('price');
  }
  constructor(
    private fb: FormBuilder, 
    private stock: StocksService
  ) {}

  ngOnInit() {
    this.buyForm = this.fb.group({
      stocks: ['select-stock', Validators.required],
      quantity: ['', Validators.required],
      orderType: ['Select', Validators.required],
      price: [''],
    });
    this.stock.getStocks().subscribe((data) => (this.selectStocks = data));
  }

  onOrderTypeChange() {
    if (this.buyForm.get('orderType').value === 'limit') {
      this.enableBillPrice = true;
    } else {
      this.enableBillPrice = false;
    }
  }

  onPriceChange() {
    this.priceErrorBanner = false;
  }

  onSubmit() {
    if (
      this.buyForm.get('orderType').value === 'limit' &&
      this.buyForm.get('price').value === ''
    ) {
      this.priceErrorBanner = true;
      return null;
    }
    this.onSuccessBanner = true;
    let marketPrice = this.buyForm.get('stocks').value;
    let price = marketPrice.slice(marketPrice.length - 3);
    let orderDetail = {
      stockName: this.buyForm.get('stocks').value,
      quantity: this.buyForm.get('quantity').value,
      orderType: this.buyForm.get('orderType').value,
      priceLimit: this.buyForm.get('price').value,
      marketPrice: price
    };
    this.stock.buyStockOrder(orderDetail).subscribe(
      (res) => {
        this.buyForm.reset();
      },
      (err) => {
        this.systemUnavailable = true;
      }
    );
  }
}
