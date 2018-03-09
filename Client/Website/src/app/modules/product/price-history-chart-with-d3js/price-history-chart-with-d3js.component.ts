import { Component, OnInit } from '@angular/core';
//import * as d3scale from "d3-scale";
import * as d3 from 'd3-selection';

import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

declare var jQuery: any;
import { Product } from '../../../shared/entities/Product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Stocks} from './data';


@Component({
  selector: 'app-price-history-chart-with-d3js',
  templateUrl: './price-history-chart-with-d3js.component.html',
  styleUrls: ['./price-history-chart-with-d3js.component.css']
})
export class PriceHistoryChartWithD3jsComponent implements OnInit {


  public product: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[any, any]>;
  /*
  private data = [
    {
      name: 'מוצר ',
      data: []
    }];*/

  private data = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {

    this.route.params.subscribe(params => { 
      let id: number = +params['id'];
      if (id) {
        this.getProductDetails(id);
      }
    })
  }

  getProductDetails(productId: number): any {
    this.productService.getProductDetails(productId).subscribe(
      (data) => {
        if (data[0] != undefined) {
          this.product = data[0];
          this.setChartData();


          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawLine();
        }
        else {
          this.router.navigateByUrl('/page-404');
        }
      }
    );

    return this.product;
  }

  setChartData() {
    let pricesArray = this.product.oldPriceArray;
    let arrayPrices = [];

    let nIndex = 0;

    this.data.push({ "date": 0, "value": 0 });

    if (pricesArray) {
      // sort the data by the datetime
      for (var i = 0; i < pricesArray.length - 1; i++) {
        for (var x = 0; x < pricesArray.length - 1; x++) {
          if (pricesArray[x].createdTime > pricesArray[x + 1].createdTime) {
            var theGreater = pricesArray[x];
            pricesArray[x] = pricesArray[x + 1];
            pricesArray[x + 1] = theGreater;
          }
        }
      }
      debugger;
      // setting the data
      for (; nIndex < pricesArray.length; nIndex++) {
        this.data.push({ "date": nIndex + 1, "value": pricesArray[nIndex].curr })
      }
    }

    this.data.push({ "date": nIndex + 1, "value": this.product.price })
  }

  private initSvg() {
    this.svg = d3.select(".price-history-chart-with-d3js")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date));
    this.y.domain(d3Array.extent(this.data, (d) => d.value));
  }
  
  private drawAxis() {

    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", this.line);
  }
}
