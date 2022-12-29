import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TASK_CATEGORIES } from '@shared/models/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent implements OnInit, OnDestroy {
  categoriesList = Object.values(TASK_CATEGORIES);

  category: FormControl<TASK_CATEGORIES[] | null> = new FormControl(null);

  private unsubscribe$ = new Subject<void>();

  constructor(
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.category.valueChanges
      .pipe(
        switchMap((values) => {
          const query = values?.map(value => `category=${value}`)?.join('&');

          return this.tasksService.getTasks(query ? `?${query}` : '');
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
