
import { EeUserType}from '../enums/eUserType';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: number;
  genderValue: string;
  userTypeValue: string;
  isManagerChecked: boolean;

  // define user type
  // 1 - for regular user
  // 2 - for manager user
  userType: number;

  public static toUser(data: any) {
    // let jsonData = JSON.parse(data); We don't need to parse this

    let users: Array<User> = new Array<User>();

    data.forEach(element => {
      let product: User;
      product = new User();
      product.userName = element.userName;
      product.gender = +element.gender;
      product.firstName = element.firstName;
      product.lastName = element.lastName;
      product.email = element.email;
      product.userType = element.userType;

      if (+element.userType === EeUserType.Regular) {
        product.userTypeValue = "משתמש רגיל";
      }
      if (+element.userType === EeUserType.Manager) {
        product.userTypeValue = "מנהל";
      }
      if (element.gender === 1) {
        product.genderValue = "זכר";
      }
      if (element.gender === 2) {
        product.genderValue = "נקבה";
      }

      users.push(product);
    });

    return users;
  }
}
