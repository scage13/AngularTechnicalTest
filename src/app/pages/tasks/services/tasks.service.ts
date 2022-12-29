import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Task } from '@shared/models/task';

@Injectable()
export class TasksService {
  private tasks = new BehaviorSubject<Task[]>([]);

  tasks$ = this.tasks.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoading.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getTasks(query = ''): Observable<Task[]> {
    this.emitLoading(true);
    return this.http.get<Task[]>(`tasks${query}`)
      .pipe(
        tap(this.emitTasks),
        tap(() => this.emitLoading(false)),
      );
  }

  createTask(payload: Task): Observable<Task> {
    return this.http.post<Task>('tasks', payload)
      .pipe(
        tap((task) => this.emitTasks([...this.tasks.value, task])),
        tap(() => this.emitLoading(false)),
      );
  }

  removeTask(id: number): Observable<any> {
    return this.http.delete(`tasks/${id}`)
      .pipe(
        tap(() => this.emitTasks(this.tasks.value.filter(item => item.id !== id))),
      );
  }

  updateTask(payload: Task): Observable<Task> {
    return this.http.put<Task>(`tasks/${payload.id}`, payload)
      .pipe(
        tap((task) => this.emitTasks(this.tasks.value.map(item => item.id === task.id ? task : item))),
      );
  }

  changeStatus(id: number, done: boolean | string): Observable<Task> {
    return this.http.patch<Task>(`tasks/${id}`, { done })
      .pipe(
        tap((task) => this.emitTasks(this.tasks.value.map(item => item.id === task.id ? task : item))),
      );
  }

  private emitTasks = (response: Task[]): void => {
    this.tasks.next(response);
  }

  private emitLoading = (value: boolean): void => {
    this.isLoading.next(value);
  }
}
