import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import * as moment from 'moment';


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {


  public msg1 = {
    msgId: 1,
    msgName: "msg1",
    arrText: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    templateSrc: "/templates/templateA",
    changeMsgTime: 5,
    frames: [
      {
        fromDate: '01/04/2017',
        toDate: '18/06/2020',
        arrOfDays: [0,1 ,2,3,4, 5, 6],
        fromTime: '00:01',
        toTime: '23:59'
      }
    ]
  };

  public msg2 = {
    msgId: 2,
    msgName: "msg2",
    arrText: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    templateSrc: "/templates/templateB",
    changeMsgTime: 5,
    frames: [
      {
        fromDate: '01/04/2017',
        toDate: '18/06/2020',
        arrOfDays: [0, 1, 2, 3, 4, 5, 6],
        fromTime: '00:01',
        toTime: '23:59'
      }
    ]
  };

  public jQuery: JQueryStatic;
  public $: JQueryStatic;
  public msgArray = [];
  public currMsgIndex = 0;

  constructor() { }

  ngOnInit() {
    this.msgArray.push(this.msg1);
    this.msgArray.push(this.msg2);
    this.checkAvailableMsg();
  }


  // this function check the current msg to show
  checkAvailableMsg() : void {
    
    let currDate = moment(new Date(), "DD/MM/YYYY  HH:mm");
    let msgFromDate, msgToDate;
    let currTimeFrame;
    let isMsgFound = false;
    
    for (var nMsgIndex = this.currMsgIndex; nMsgIndex < this.msgArray.length && !isMsgFound; nMsgIndex++) {
      for (var nFameIndex = 0; nFameIndex < this.msgArray[nMsgIndex].frames.length && !isMsgFound; nFameIndex++) {
        currTimeFrame = this.msgArray[nMsgIndex].frames[nFameIndex];
        msgFromDate = moment(currTimeFrame.fromDate + " " + currTimeFrame.fromTime, "DD/MM/YYYY  HH:mm");
        msgToDate = moment(currTimeFrame.toDate + " " + currTimeFrame.toTime, "DD/MM/YYYY  HH:mm");

        if (currDate.isSameOrAfter(msgFromDate) &&
          currDate.isSameOrBefore(msgToDate)) {
          if (currTimeFrame.arrOfDays.includes(currDate.day())) {
            this.currMsgIndex = (nMsgIndex + 1) % this.msgArray.length;
            this.showMsg(this.msgArray[nMsgIndex]);
            isMsgFound = true;
            setTimeout(function () {
              //this.hideMsg(this.checkAvailableMsg());
            }, this.msgArray[nMsgIndex].changeMsgTime * 1000);
          }
        }
      }
    }

    if (!isMsgFound) {
      this.currMsgIndex = 0;

      /*
      setTimeout(function () {
        this.checkAvailableMsg();
      }, 1000);*/
    }
  }


  showMsg(p_msg) {
    // set the msg name
    $("#msgName").text(p_msg.msgName);

    // set the msg texts
    for (var i = 0; i < p_msg.arrText.length; i++) {
      $("#msgText").append("<p>" + p_msg.arrText[i] + "</p>");
    }

    if (p_msg.arrImages) {
      for (var i = 0; i < p_msg.arrImages.length; i++) {
        $("#msgPictures").append("<img src='.img\\" + p_msg.arrImages[i] + ".jpg' width=\"100\" />");
      }
    }
    $("#msgTemplate").load("http://localhost:8080" + p_msg.templateSrc, $("#msgContainer").slideDown());
  }

  hideMsg(callback) {
    // set the msg name
    $("#msgId").slideUp(function () {
      $("#msgName").text("");
      $("#msgText").text("");
      $("#msgPrice").text("");
      $("#msgPictures").text("");
      $("#msgTemplate").text("");
      callback();
    });
  }


}
