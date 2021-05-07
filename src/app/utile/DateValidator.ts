import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {

  //verifie le format date
  static dateValidator(AC: AbstractControl) {
    //si la valeur du form group et le format sont respecter alors on retourne true
    if (!moment(AC.value, 'YYYY-MM-DD',true).isValid()) {
      //return true si la valeur passer correspond au format
      return {'dateVaLidator': true};
    }
    return null;
  }
}
