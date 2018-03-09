import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../../shared/entities/Product';


import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
//import { STATISTICS } from './data'


@Component({
  selector: 'app-bar-chart-prouct-price',
  templateUrl: './bar-chart-prouct-price.component.html',
  styleUrls: ['./bar-chart-prouct-price.component.css']
})
export class BarChartProuctPriceComponent implements OnInit {

  title = 'D3.js with Angular 2!';
  subtitle = 'Bar Chart';
  products: Product[];
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private data = [];
  private maxPrice: number;
  private minPrice: number;

  private x: any;
  private y: any;
  private svg: any;
  private g: any;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): any {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = Product.toProduct(data);
        console.log(this.products);

        this.minPrice = this.products[0].price;
        this.maxPrice = this.products[0].price;


        for (var i = 0; i < this.products.length; i++) {
          this.data.push({ "name": this.products[i].name + " - " + i, "price": this.products[i].price })

          if (this.maxPrice < this.products[i].price) { this.maxPrice = this.products[i].price }
          if (this.minPrice > this.products[i].price) { this.minPrice = this.products[i].price }
        }


        for (var i = 0; i < this.data.length; i++) {

          let firstParams = (this.data[i].price - this.minPrice) / (this.maxPrice - this.minPrice)
          let secondParams = (100 - 0) + 0;
          this.data[i]["normalizePrice"] = (firstParams * secondParams) * 0.01;
        }

        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
      }
    );
  }

  private initSvg() {
    this.svg = d3.select(".bar-chart-product-price");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d) => d.name));
    this.y.domain([0, d3Array.max(this.data, (d) => d.normalizePrice)]);
  }

  private drawAxis() {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y).ticks(10, "%"))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("price");
  }

  private drawBars() {
    this.g.selectAll(".bar")
      .data(this.data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.name))
      .attr("y", (d) => this.y(d.normalizePrice))
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.normalizePrice));
  }
}
