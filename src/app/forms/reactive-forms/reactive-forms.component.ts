import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) { }

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  // address = {
  //   street: 'Wall',
  //   city: 'new york',
  //   zip: '550001'
  // };

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  onClick() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.patchValue();
  }

  setValue(value: any) {
    this.profileForm.setValue(value);
  }

  patchValue() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  ngOnInit() {
  }

}
