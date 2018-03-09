export class Store {
  Subchainid: string;
  Storeid: string;
  Bikoretno: string;
  Storetype: string;
  Chainname: string;
  Subchainname: string;
  Storename: string;
  Address: string;
  City: string;
  Zipcode: string;

  
  public static toStore(data: any) {
    // let jsonData = JSON.parse(data); We don't need to parse this

    let stores: Array<Store> = new Array<Store>();

    data.forEach(element => {
      let store: Store;
      store = new Store();
      store.Subchainid = element.Subchainid;
      store.Storeid = element.Storeid;
      store.Bikoretno = element.Bikoretno;
      store.Storetype = element.Storetype;
      store.Chainname = element.Chainname;
      store.Subchainname = element.Subchainname;
      store.Storename = element.Storename;
      store.Address = element.Address;
      store.City = element.City;
      store.Zipcode = element.Zipcode;
      stores.push(store);
    });

    return stores;
  }
}

