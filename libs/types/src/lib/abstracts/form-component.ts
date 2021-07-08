import { Directive, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[demoFormComponent]',
})

export abstract class FormComponent implements OnInit {
    processing = false;
    form: FormBuilder;

    abstract formBuilder: FormBuilder;
    abstract initForm();
    abstract listenToFormChanges();
    abstract submit();

    ngOnInit() {
        this.initForm();
        this.listenToFormChanges();
    }

    getError(controlName: string) {
        const { errors } = this.form.control[controlName];
        return this.getControlError(errors);
    }

    getControlError(errors: ValidationErrors): string {
        if(errors) {
            const errorsKeys = Object.keys(errors).filter((key) => {
                return !!errors[key]
            })
            const errorKey = errorsKeys[0];

            switch(errorKey) {
                case 'required':
                    return 'This field is required';
                case 'invalidInput':
                    return 'This is an invalid input'
                default:
                    return errorKey
            }
        }

        return '';
    }

    markControlsAsTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(controlName => {
            formGroup.controls[controlName].markAsTouched();
        })
    }

    markControlsAsDirty(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(controlName => {
            formGroup.controls[controlName].markAsDirty();
        })
    }
}