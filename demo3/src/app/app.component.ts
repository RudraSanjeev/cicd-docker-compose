import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppserviceService, Employee } from './appservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  employees: Employee[];
  employee: Employee = {
    id: '',
    name: '',
    role: '',
  };

  constructor(private appService: AppserviceService) {}

  getEmployee() {
    this.appService.getEmployee().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        // console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  addEmployee() {
    this.appService.addEmployee(this.employee).subscribe({
      next: (res: Employee) => {
        this.employees.push(res);
        this.employee.id = '';
        this.employee.name = '';
        this.employee.role = '';
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    // console.log(this.employee);
  }

  deleteEmployee(id: string | number) {
    this.appService.deleteEmployee(id).subscribe({
      next: (res: string) => {
        console.log(res);
        this.employees = this.employees.filter((employee) => {
          return employee.id !== id;
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.getEmployee();
  }
}
