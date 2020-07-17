import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor() {}

  validateRegister(user) {
    if (user.role == "Dean") {
      if (
        !user.name ||
        !user.email ||
        !user.phoneno ||
        !user.school ||
        !user.password
      ) {
        return false;
      } else {
        return true;
      }
    } else if (
      !user.name ||
      !user.email ||
      !user.phoneno ||
      !user.dept ||
      !user.password ||
      !user.role
    ) {
      return false;
    } else {
      if (user.role == "Student" && (!user.rollno || !user.batch)) {
        return false;
      } else {
        return true;
      }
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    if (!password) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user) {
    if (!user.email || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  validateModifyUser(user) {
    if (!user.name || !user.email || !user.phoneno || !user.school) {
      return false;
    } else {
      if (user.role == "Student" && (!user.rollno || !user.batch)) {
        return false;
      } else {
        return true;
      }
    }
  }

  validateModifyPassword(user) {
    if (!user.oldPassword || !user.newPassword) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterComplaint(complaint) {
    if (!complaint.title || !complaint.category || !complaint.msg) {
      return false;
    } else {
      return true;
    }
  }

  validateForwardComplaint(complaint) {
    if (!complaint.worker_id || !complaint.deanMsg) {
      return false;
    } else {
      return true;
    }
  }

  validateResponseComplaint(complaint) {
    if (!complaint.workerMsg) {
      return false;
    } else {
      return true;
    }
  }
}
