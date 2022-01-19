import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() public syncButtonClickedEvent = new EventEmitter<void>();
  @Output() public discountButtonClickedEvent = new EventEmitter<void>();
  @Input() public walletAddress: string | undefined
  constructor() { }

  ngOnInit(): void {
  }

  public syncButtonClicked() {
    this.syncButtonClickedEvent.emit();
  }

  public discountButtonClicked(){
    this.discountButtonClickedEvent.emit();
  }

  public splitWalletAddress(walletAddress: string | undefined) {
    if (walletAddress) {
      const first = walletAddress.substring(0, 5)
      const last = walletAddress.substring(walletAddress.length - 5)
      return first + "..." + last
    }
    return
  }

}
