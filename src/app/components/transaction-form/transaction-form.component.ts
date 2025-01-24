import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  transactions: any[] = [];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      // Define form controls and validators
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
  }

onSubmit(): void {
  console.log('Form submitted');
  if (this.transactionForm.valid) {
    console.log('Form is valid');
    const newTransaction = this.transactionForm.value; // Get form data

    // Add new transaction to the local array
    this.transactions.push(newTransaction);

    // Ensure localStorage is available before saving
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
  } else {
    console.log('Form is invalid', this.transactionForm.errors);
    Object.keys(this.transactionForm.controls).forEach(key => {
      const controlErrors = this.transactionForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Key: ${key}, Errors: `, controlErrors);
      }
    });
  }
}
}