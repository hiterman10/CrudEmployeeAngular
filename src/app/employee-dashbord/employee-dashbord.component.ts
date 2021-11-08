import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css'],
})
export class EmployeeDashbordComponent implements OnInit {
  formValue!: FormGroup;
  EmployeeModelObj: EmployeeModel = new EmployeeModel();
  EmployeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nom: [''],
      prenom: [''],
      username: [''],
      tel: [''],
      salaire: [''],
    });

    this.getAllEmployee();
  }

  clickAddEmployee(): void {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(): void {
    this.EmployeeModelObj.nom = this.formValue.value.nom;
    this.EmployeeModelObj.prenom = this.formValue.value.prenom;
    this.EmployeeModelObj.username = this.formValue.value.username;
    this.EmployeeModelObj.tel = this.formValue.value.tel;
    this.EmployeeModelObj.salaire = this.formValue.value.salaire;

    this.api.postEmployee(this.EmployeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Success');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err) => {
        alert('echec');
      }
    );
  }

  getAllEmployee(): void {
    this.api.getEmployee().subscribe((res) => {
      this.EmployeeData = res;
    });
  }

  deleteanEmployee(row: any): void {
    console.log(row);
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('delete success');
      this.getAllEmployee();
    });
  }

  onEdit(row: any): void {

    this.showAdd = false;
    this.showUpdate = true;
    this.EmployeeModelObj.id = row.id;
    this.formValue.controls.nom.setValue(row.nom);
    this.formValue.controls.prenom.setValue(row.prenom);
    this.formValue.controls.username.setValue(row.username);
    this.formValue.controls.tel.setValue(row.tel);
    this.formValue.controls.salaire.setValue(row.salaire);
  }
  updateEmployeeDetails(): void {
    this.EmployeeModelObj.nom = this.formValue.value.nom;
    this.EmployeeModelObj.prenom = this.formValue.value.prenom;
    this.EmployeeModelObj.username = this.formValue.value.username;
    this.EmployeeModelObj.tel = this.formValue.value.tel;
    this.EmployeeModelObj.salaire = this.formValue.value.salaire;

    this.api
      .updateEmployee(this.EmployeeModelObj, this.EmployeeModelObj.id)
      .subscribe(
        (res) => {
          console.log(res);
          alert('updated Success');
          const ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        (err) => {
          alert('echec');
        }
      );
  }
}
