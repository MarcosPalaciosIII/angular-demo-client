import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { OnChange } from 'property-watch-decorator';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from './form-component';

@Directive({
    selector: '[demoFormDataComponent]'
})

export abstract class FormComponentWithData<TData> extends FormComponent {
    dataReady$: Subject<void> = new Subject<void>();
    formReady$: Subject<void> = new Subject<void>();
    formDataSet$: Subject<void> = new Subject<void>();
    destroyed$: Subject<void> = new Subject<void>();

    formFieldExceptions: string[] = [];

    @OnChange<TData>(value => {
        if(value) {
            this.dataReady$.next();
        }
    })
    @Input()
    data: TData;
    @Input() readonly: boolean;

    @Output() valueChange: EventEmitter<TData> = new EventEmitter<TData>();

    defaultValues() {
        combineLatest([this.dataReady$, this.formReady$]).pipe(takeUntil(this.destroyed$)).subscribe(() => this.setFormData(this.data));
    }

    setFormData(data: TData) {
        const formValue = Object.keys(this.form.control).filter(controlName => !this.formFieldExceptions.includes(controlName)).map(controlName =>{ 
            return {
                [controlName]: typeof data[controlName] !== 'undefined' ? data[controlName] : null
            }
        }).reduce((acc, current) => {
            const key = Object.keys(current)[0];
            return { ...acc, [key]: current[key]}
        }, {});

        this.form.patchValue(formValue);
        this.formDataSet$.next();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}