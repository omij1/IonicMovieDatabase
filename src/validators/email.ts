import {FormControl} from '@angular/forms';

export class ValidadorEmail {
	
	static esValido(control: FormControl){
		const er = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
		.test(control.value);

		if (er) {
			return null;
		}

		return{"invalidEmail":true};
	}
}