import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from "rxjs/operators";
import { Task } from '@shared/models/task';
import { ConfirmDialogComponent } from '@shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent, TaskDialogData } from '../task-dialog/task-dialog.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
  ) {}

  changeStatus(event: MouseEvent): void {
    event.preventDefault();
    this.tasksService
      .changeStatus(this.task.id, this.task.done ? false : new Date().toDateString()).subscribe();
  }

  onEdit(): void {
    const data: TaskDialogData = { mode: 'edit', task: this.task };

    this.dialog.open(TaskDialogComponent, {
      data,
      maxWidth: 480,
      maxHeight: 480,
      width: '100%',
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { reason: 'Remove this task?' },
      maxWidth: 400,
      maxHeight: 400,
      width: '100%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((value) => value),
      )
      .subscribe((res) => {
        this.tasksService.removeTask(this.task.id).subscribe();
      });
  }
}
