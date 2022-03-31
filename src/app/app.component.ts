import { Component } from '@angular/core';
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  DAppClientOptions, BeaconEvent,
  defaultEventCallbacks
} from '@airgap/beacon-sdk';

export enum NetworkType {
  MAINNET = "mainnet",
  DELPHINET = "delphinet",
  EDONET = "edonet",
  FLORENCENET = "florencenet",
  GRANADANET = "granadanet",
  HANGZHOUNET = "hangzhounet",
  IDIAZABALNET = "idiazabalnet",
  CUSTOM = "custom"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'web-application';
  public bool = true;
  public userAddress: string | undefined;
  public walletConfig: DAppClientOptions = {
    name: 'MyAwesomeDapp',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
    preferredNetwork: NetworkType.HANGZHOUNET,
    disableDefaultEvents: false,
    eventHandlers: {
      // To keep the pairing alert, we have to add the following default event handlers back
      [BeaconEvent.PAIR_INIT]: {
        handler: defaultEventCallbacks.PAIR_INIT
      },
      [BeaconEvent.PAIR_SUCCESS]: {
        handler: data => console.log('permission data:', data)
      }
    }
  };
  public wallet: BeaconWallet | undefined = new BeaconWallet(this.walletConfig);
  // public wallet = new BeaconWallet(this.walletConfig);
  public Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

  public async onSyncClicked() {
    if (this.wallet) {
      await this.wallet.disconnect();
      await this.wallet.requestPermissions({
        network: {
          type: NetworkType.HANGZHOUNET,
          rpcUrl: "https://hangzhounet.api.tez.ie",
          name: 'MyAwesomeDapp',        },
      });
      const activeAccount = await this.wallet.client.getActiveAccount();
      if(activeAccount){
        this.userAddress = await this.wallet.getPKH();
        const balance = await this.Tezos.tz.getBalance(this.userAddress);
        if(balance){

        }
      }
      this.Tezos.setProvider({wallet:this.wallet});
      this.Tezos.contract
      .at('KT1R5XmpQYtCwHS9VaRNzFnmwfLNKy71Ahhv')
      .then(async (contract:any) => {
        // return contract.methods['add_presale_addresses']([{
        //   0:"tz1euTUPRdMQs88gCPYhpVJKjQvbYXJXSf3d",
        //   1:0
        // }]).send();
        const x = await contract.methods.mint().send()
        return x.confirmation();
      })
      .then((op:any) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);
      })
      .then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
      .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    }
  }

  public async onDisconnect() {
    this.userAddress = undefined;
    if (this.wallet) {
      await this.wallet.client.removeAllAccounts();
      await this.wallet.client.removeAllPeers();
      await this.wallet.client.destroy();
      this.wallet = new BeaconWallet(this.walletConfig);
    }
  }
}
