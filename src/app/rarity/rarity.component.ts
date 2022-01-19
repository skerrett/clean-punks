import { Component, OnInit } from '@angular/core';
import { TezosToolkit } from '@taquito/taquito';
import geckoJson from "../../assets/geckos.json"
import geckoUpdatedJson from "../../assets/geckosUpdated.json"
import geckoUpdatedJson2 from "../../assets/geckos3.json"
import images from "../../assets/images.json"
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs';

interface IGridData {
  dna: string;
  name: string;
  description: string;
  image: string;
  edition: number;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}[]

interface IGridDataExtended extends IGridData {
  background?: string;
  body?: string;
  clothes?: string;
  headware?: string;
  eyeware?: string;
  mouthpiece?: string;
  hash?: string;
}
@Component({
  selector: 'app-rarity',
  templateUrl: './rarity.component.html',
  styleUrls: ['./rarity.component.css']
})
export class RarityComponent implements OnInit {
  public gridData: IGridDataExtended[] = geckoJson as unknown as IGridData[];
  public gridData2: IGridDataExtended[] = geckoUpdatedJson as unknown as IGridDataExtended[];
  public gridData3 = geckoUpdatedJson2;
  public tezos = new TezosToolkit("https://mainnet.api.tez.ie")
  public image = "https://ipfs.fleek.co/ipfs/QmR58QAi2v8exEWyfduyoF2D4AaAENiAQMKtxDL3YwYoWw"
  public i:number = 200;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.moveTraits();
    // this.getMetaData();
    // this.myLoop();
  }

  public saveText(text: string, filename: string) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }

  public moveTraits() {
    this.gridData.forEach((item) => {
      item.attributes.forEach((attribute) => {
        switch (attribute.trait_type) {
          case "Background":
            item.background = attribute.value;
            break;
          case "Body":
            item.body = attribute.value;
            break;
          case "Clolthes":
            item.clothes = attribute.value;
            break;
          case "Headware":
            item.headware = attribute.value;
            break;
          case "Eyeware":
            item.eyeware = attribute.value
            break;
          case "Mouthpiece":
            item.mouthpiece = attribute.value;
            break;
          default:
            break;
        }
      })
    });
    if (this.gridData) {
      // this.saveText(JSON.stringify(this.gridData),"TESTING")
    }
  }

  public async getMetaData() {
    const x = images;
    this.gridData2.forEach(element => {
      const y = x.find((item) => item.token_id === element.edition);
      if (y) {
        const hash = y.display_uri.split("ipfs://")[1];
        element.hash = hash
      }
    });
  }

  // public createMetaData(index:number) {
  //     let obj = {
  //       name: (index) + "#",
  //       description: "this images is hidden",
  //       images: "ipfs://Qmb4cEDBtyEipnvsJnMedShaC5Nj7dz9UDQdQEzKanhVMS/hidden.png"
  //     }
  //     this.saveText(JSON.stringify(obj), index.toString() + ".json")
  // }

  // public myLoop(){
  //   setTimeout(() => {
  //     this.i ++
  //     if(this.i < 10000){
  //       this.createMetaData(this.i);
  //       this.myLoop()
  //     }
  //   }, 1000);
  // }

  public returnImageUrl(hash: any) {
    if (hash.data.hash) {
      return "https://ipfs.fleek.co/ipfs/" + hash.data.hash
    } else {
      return this.image;
    }
  }

}

