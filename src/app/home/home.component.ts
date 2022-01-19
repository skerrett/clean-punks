import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.myFunction(1000)
    this.myFunction2(1000)
  }

  public myFunction(timer:number){
    const num = Math.floor(Math.random() * 6);
    const x = document.getElementById(num.toString()) as HTMLImageElement;
    if (x) {
      const num = Math.floor(Math.random() * 64);
      const number = num + 4
      const t ="../../assets/punk" + number + ".png"
      x.src = t;
    }
    setTimeout(() => {
      this.myFunction(timer);
    }, timer);
  }

  public myFunction2(timer:number){
    let num = Math.floor(Math.random() * 6);
    num = num + 6;
    const x = document.getElementById(num.toString()) as HTMLImageElement;
    if (x) {
      const num = Math.floor(Math.random() * 64);
      const number = num + 4
      const t ="../../assets/punk" + number + ".png"
      x.src = t;
    }
    setTimeout(() => {
      this.myFunction2(timer);
    }, timer);
  }

  public changeImage(id:string) {
    const num = Math.floor(Math.random() * 6);
    const x = document.getElementById(id) as HTMLImageElement;
    if (x) {
      const num = Math.floor(Math.random() * 64);
      const number = num + 4
      const t ="../../assets/punk" + number + ".png"
      x.src = t;
    }
  }

}
