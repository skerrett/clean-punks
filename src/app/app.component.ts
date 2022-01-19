import { Component } from '@angular/core';
import { TezosToolkit } from '@taquito/taquito';
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
    preferredNetwork: NetworkType.MAINNET,
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
  public Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');

  public async onSyncClicked() {
    if (this.wallet) {
      await this.wallet.disconnect();
      await this.wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
          rpcUrl: "https://mainnet.api.tez.ie"
        },
      });
      this.userAddress = await this.wallet.getPKH();
      this.Tezos.setProvider(this.wallet as any);
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
