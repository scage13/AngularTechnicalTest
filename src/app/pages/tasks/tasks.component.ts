import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TasksService } from './services/tasks.service';
import { TaskDialogComponent, TaskDialogData } from './components/task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$ = this.tasksService.tasks$;

  loading$ = this.tasksService.isLoading$;

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
  ) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe();
  }

  addTask(): void {
    const data: TaskDialogData = { mode: 'create' };

    this.dialog.open(TaskDialogComponent, {
      data,
      maxWidth: 480,
      maxHeight: 480,
      width: '100%',
    })
  }
}
