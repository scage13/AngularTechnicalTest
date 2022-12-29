import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Task, TASK_CATEGORIES } from '@shared/models/task';
import { TasksService } from '../../services/tasks.service';

export type TaskDialogData = {
  mode: 'create' | 'edit';
  task?: Task;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  form: FormGroup = this.fb.group({
    description: [
      this.data?.task?.description || null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    category: [
      this.data?.task?.category || null,
      [Validators.required],
    ],
  });

  categoriesList = Object.values(TASK_CATEGORIES);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private tasksService: TasksService,
  ) {}

  submit(): void {
    const { description, category } = this.form.value;
    const payload: Task = {
      id: this.data.task?.id || Date.now(),
      description,
      category,
      done: this.data.task?.done || false,
    }

    switch (this.data.mode) {
      case 'create':
        this.tasksService.createTask(payload).subscribe(() => this.dialogRef.close());
        break;
      case 'edit':
        this.tasksService.updateTask(payload).subscribe(() => this.dialogRef.close());
        break;
    }
  }
}
