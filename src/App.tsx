import React, { useRef } from "react";
import * as GC from "@grapecity/spread-sheets";
import { SpreadSheets } from "@grapecity/spread-sheets-react";
import "../node_modules/@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import "./App.css";
class Product {
  id: number;
  line: string;
  color: string;
  name: string;
  price: number;
  cost: number;
  weight: number;
  discontinued: boolean;
  rating: string;
  constructor(
    id: number,
    line: string,
    color: string,
    name: string,
    price: number,
    cost: number,
    weight: number,
    discontinued: boolean,
    rating: string
  ) {
    this.id = id;
    this.line = line;
    this.color = color;
    this.name = name;
    this.price = price;
    this.cost = cost;
    this.weight = weight;
    this.discontinued = discontinued;
    this.rating = rating;
  }
}

function App() {
  const refSpread = useRef<GC.Spread.Sheets.Workbook>();
  const getProducts = (count: number) => {
    const _lines = ["Computers", "Washers", "Stoves"];
    const _colors = ["Red", "Green", "Blue", "White"];
    const _ratings = ["Terrible", "Bad", "Average", "Good", "Great", "Epic"];
    const dataList = [];
    for (let i = 1; i <= count; i++) {
      let line = _lines[Math.floor(Math.random() * 3)];
      dataList[i - 1] = new Product(
        i,
        line,
        _colors[Math.floor(Math.random() * 4)],
        line + " " + line.charAt(0) + i,
        Math.floor(Math.random() * 5001) / 10.0 + 500,
        Math.floor(Math.random() * 6001) / 10.0,
        Math.floor(Math.random() * 10001) / 100.0,
        !!(Math.random() > 0.5),
        _ratings[Math.floor(Math.random() * 6)]
      );
    }
    return dataList;
  };
  const initSpread = (spread: GC.Spread.Sheets.Workbook) => {
    refSpread.current = spread;
    spread.suspendPaint();
    // spread.options.tabStripRatio = 0.8;
    const products = getProducts(20);
    console.log(products);
    let sheet = spread.getSheet(0);
    sheet.setDataSource(products);

    spread.resumePaint();
  };
  return (
    <div className="App">
      <div className="w-80 h-80 mx-auto">
        <SpreadSheets
          hostStyle={undefined}
          workbookInitialized={(spread) => initSpread(spread)}
        ></SpreadSheets>
      </div>
    </div>
  );
}

export default App;
