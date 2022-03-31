import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import { NetworkType } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() public syncButtonClickedEvent = new EventEmitter<void>();
  @Output() public discountButtonClickedEvent = new EventEmitter<void>();
  @Input() public walletAddress: string | undefined;
  public tezos = new TezosToolkit('https://hangzhounet.api.tez.ie')
  public wallet = new BeaconWallet({
    name: 'MyAwesomeDapp',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
  })

  constructor() { }

  ngOnInit(): void {
    this.tezos.setPackerProvider(new MichelCodecPacker())
    this.tezos.setWalletProvider(this.wallet);


  }

  public async syncButtonClicked() {
    let activeAccount = await this.wallet.client.getActiveAccount()
    console.log(activeAccount)
    try {
      if (!activeAccount) {
        await this.discountButtonClicked()
        await this.wallet.requestPermissions({
          network: {
            type: NetworkType.HANGZHOUNET
          }
        })
        activeAccount = await this.wallet.client.getActiveAccount()
        if (!activeAccount) {
          throw new Error('Wallet not connected')
        }
      }
      const address = await this.wallet.getPKH()
      this.walletAddress = address;
    } catch (e) {
      console.log(e)
      await this.discountButtonClicked();
    }
    return
  }

  public async buyToken() {
    try {
      await this.syncButtonClicked()
      const contract: any = await this.tezos.wallet.at("KT1R5XmpQYtCwHS9VaRNzFnmwfLNKy71Ahhv")
      const op = await contract.methods.add_presale_addresses([{
        0: "tz1euTUPRdMQs88gCPYhpVJKjQvbYXJXSf3d",
        1: 0
      }]).send();
      // const op = await contract.methods.mint().send({ mutez: true })
      const result = await op.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Mint transaction failed')
    } catch (e: any) {
      if (e.title === 'Aborted') return false
      else throw e
    }
  }

  public async discountButtonClicked() {
    await this.wallet.clearActiveAccount()
    this.walletAddress = undefined;
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
