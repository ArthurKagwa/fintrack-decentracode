import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  imports: [ReactiveFormsModule]
})

export class TransactionFormComponent {
  transactionForm = new FormGroup({
    amount: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl('')
  });
  transactions:any[] = [];
  onSubmit() {
    //handle submit
    // Load stored transactions from local storage if they exist
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
    const newTransaction = this.transactionForm.value;
      this.transactions.push(newTransaction);

      // Save the updated transactions array to local storage
      localStorage.setItem('transactions', JSON.stringify(this.transactions));

      // Reset the form for the next transaction
      this.transactionForm.reset();
      console.log('Transaction added successfully:', newTransaction);

      console.log('All transactions:', this.transactions);

  }
}

